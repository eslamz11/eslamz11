# خطة تطوير صفحة المشروع وإضافة ميزة الفيديوهات

## المهام المطلوبة:

### 1. إضافة حقل الفيديوهات في Firestore
- إضافة حقل `videos` في مستند المشروع
- البنية: Array of Objects
  ```javascript
  videos: [
    {
      title: "Video title in English",
      title_ar: "عنوان الفيديو بالعربي",
      url: "https://www.youtube.com/watch?v=...",
      description: "Optional description",
      description_ar: "وصف اختياري"
    }
  ]
  ```

### 2. تحديث صفحة Projects في Admin Panel
- إضافة section لإدارة الفيديوهات
- إضافة حقول:
  - Video Title (EN)
  - Video Title (AR)
  - YouTube URL
  - Description (EN) - Optional
  - Description (AR) - Optional
- زر لإضافة فيديو جديد
- عرض قائمة الفيديوهات الحالية
- إمكانية التعديل والحذف

### 3. إعادة تصميم صفحة تفاصيل المشروع
- تصميم أكثر احترافية وتنظيماً
- إضافة قسم للفيديوهات
- عرض كل فيديو مع:
  - YouTube embed player
  - العنوان
  - الوصف (إن وجد)
- تحسين التخطيط العام

### 4. إنشاء YouTube Embed Component
- Component لعرض فيديوهات YouTube
- Input: YouTube URL
- Output: Embedded player

## الملفات المطلوب تعديلها:

1. `admin-panel/src/pages/Projects.jsx` - إضافة إدارة الفيديوهات
2. `app/projects/[id]/ProjectDetailContent.jsx` - إع ادة التصميم وإضافة الفيديوهات
3. `app/components/YouTubeEmbed.jsx` - Component جديد (إنشاء)

## ترتيب التنفيذ:

1. ✅ إنشاء خطة العمل
2. إنشاء YouTube Embed Component
3. تحديث Admin Panel (Projects.jsx)
4. إعادة تصميم صفحة تفاصيل المشروع
