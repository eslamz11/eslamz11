/**
 * خدمة رفع الصور على خوادم خارجية
 * تدعم Imgbb و Freeimage.host كنسخة احتياطية
 */

const IMGBB_API_KEY = '4928381d580067cef94fe8759d7cf536';
const FREEIMAGE_API_KEY = '6d207e02198a847aa98d0a2a901485a5';

/**
 * تحويل ملف إلى Base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // إزالة البادئة data:image/...;base64,
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * رفع صورة على Imgbb
 */
const uploadToImgbb = async (file) => {
  try {
    const base64Image = await fileToBase64(file);
    
    const formData = new FormData();
    formData.append('image', base64Image);
    formData.append('key', IMGBB_API_KEY);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Imgbb upload failed');
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        url: data.data.url,
        displayUrl: data.data.display_url,
        deleteUrl: data.data.delete_url,
        provider: 'imgbb'
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Imgbb upload error:', error);
    throw error;
  }
};

/**
 * رفع صورة على Freeimage.host
 */
const uploadToFreeimage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('key', FREEIMAGE_API_KEY);
    formData.append('source', file);
    formData.append('format', 'json');

    const response = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Freeimage upload failed');
    }

    const data = await response.json();
    
    if (data.status_code === 200) {
      return {
        success: true,
        url: data.image.url,
        displayUrl: data.image.display_url,
        deleteUrl: data.image.delete_url,
        provider: 'freeimage'
      };
    } else {
      throw new Error(data.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Freeimage upload error:', error);
    throw error;
  }
};

/**
 * رفع صورة مع نظام احتياطي تلقائي
 * يحاول Imgbb أولاً، وإذا فشل يجرب Freeimage.host
 */
export const uploadImage = async (file) => {
  // التحقق من نوع الملف
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('الملف المرفوع يجب أن يكون صورة');
  }

  // التحقق من حجم الملف (أقل من 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('حجم الصورة يجب أن يكون أقل من 10 ميجابايت');
  }

  try {
    // محاولة رفع على Imgbb أولاً
    console.log('محاولة رفع الصورة على Imgbb...');
    const result = await uploadToImgbb(file);
    console.log('تم رفع الصورة بنجاح على Imgbb');
    return result;
  } catch (imgbbError) {
    console.warn('فشل رفع الصورة على Imgbb، المحاولة على Freeimage.host...');
    
    try {
      // محاولة رفع على Freeimage.host كبديل
      const result = await uploadToFreeimage(file);
      console.log('تم رفع الصورة بنجاح على Freeimage.host');
      return result;
    } catch (freeimageError) {
      console.error('فشل رفع الصورة على كلا الخدمتين');
      throw new Error('فشل رفع الصورة. الرجاء المحاولة مرة أخرى.');
    }
  }
};

/**
 * رفع عدة صور
 */
export const uploadMultipleImages = async (files) => {
  const uploadPromises = Array.from(files).map(file => uploadImage(file));
  return Promise.all(uploadPromises);
};

/**
 * معاينة صورة قبل الرفع
 */
export const getImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      reject(new Error('الملف ليس صورة'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default {
  uploadImage,
  uploadMultipleImages,
  getImagePreview
};

