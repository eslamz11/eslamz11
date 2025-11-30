import { useState, useEffect } from 'react';
import { FiSave, FiUpload, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getPersonalData, updatePersonalData } from '../services/firestoreService';
import { uploadImage, getImagePreview } from '../services/imageUpload';

const PersonalData = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [data, setData] = useState({
    name: '',
    name_ar: '',
    profile: '',
    designation: '',
    designation_ar: '',
    description: '',
    description_ar: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    address_ar: '',
    github: '',
    linkedIn: '',
    twitter: '',
    facebook: '',
    stackOverflow: '',
    leetcode: '',
    devUsername: '',
    resume: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await getPersonalData();
      if (result.success && result.data) {
        setData(result.data);
        if (result.data.profile) {
          setImagePreview(result.data.profile);
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const preview = await getImagePreview(file);
      setImagePreview(preview);
    } catch (error) {
      toast.error('Failed to preview image');
    }

    setUploading(true);
    const loadingToast = toast.loading('Uploading image...');
    
    try {
      const result = await uploadImage(file);
      
      setData(prev => ({
        ...prev,
        profile: result.url
      }));
      
      toast.success(`Image uploaded successfully via ${result.provider === 'imgbb' ? 'Imgbb' : 'Freeimage.host'}`, {
        id: loadingToast
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to upload image', {
        id: loadingToast
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loadingToast = toast.loading('Saving data...');

    try {
      const result = await updatePersonalData(data);
      
      if (result.success) {
        toast.success('Personal data updated successfully!', { id: loadingToast });
      } else {
        toast.error(result.error || 'Something went wrong', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data', { id: loadingToast });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-violet-600"></div>
        <p className="mt-4 text-slate-600 font-medium">Loading personal data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Personal Information</h1>
        <p className="text-violet-100">Manage your profile and social media links</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">👤</span>
            Profile Picture
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-xl">
                {(imagePreview || data.profile) ? (
                  <img src={imagePreview || data.profile} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="text-5xl text-violet-400" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <FiUpload className="text-white text-sm" />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold cursor-pointer transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                <FiUpload />
                {uploading ? 'Uploading...' : 'Upload New Picture'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <p className="text-sm text-slate-500 mt-2">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Full Name (English)</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">الاسم الكامل (عربي)</label>
              <input
                type="text"
                name="name_ar"
                value={data.name_ar}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="أدخل اسمك الكامل"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">Job Title (English)</label>
              <input
                type="text"
                name="designation"
                value={data.designation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="e.g. Full Stack Developer"
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">المسمى الوظيفي (عربي)</label>
              <input
                type="text"
                name="designation_ar"
                value={data.designation_ar}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="مثال: مطور ويب متكامل"
                dir="rtl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-2">About You (English)</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                rows="4"
                placeholder="Write a brief description about yourself..."
                required
                dir="ltr"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-2">نبذة عنك (عربي)</label>
              <textarea
                name="description_ar"
                value={data.description_ar}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                rows="4"
                placeholder="اكتب نبذة مختصرة عن نفسك..."
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">📧</span>
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="example@email.com"
                required
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="+1 (555) 123-4567"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                WhatsApp Number
                <span className="text-xs text-slate-500 ml-2">(with country code, e.g., 01012345678)</span>
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={data.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="01012345678"
                dir="ltr"
              />
              <p className="text-xs text-slate-500 mt-1">
                💡 This will show a floating WhatsApp button on the website
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">Address (English)</label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="City, Country"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">العنوان (عربي)</label>
              <input
                type="text"
                name="address_ar"
                value={data.address_ar}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="المدينة، البلد"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">🔗</span>
            Social Media Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>💻</span> GitHub
              </label>
              <input
                type="url"
                name="github"
                value={data.github}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="https://github.com/username"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>💼</span> LinkedIn
              </label>
              <input
                type="url"
                name="linkedIn"
                value={data.linkedIn}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="https://linkedin.com/in/username"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>🐦</span> Twitter
              </label>
              <input
                type="url"
                name="twitter"
                value={data.twitter}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="https://twitter.com/username"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>📘</span> Facebook
              </label>
              <input
                type="url"
                name="facebook"
                value={data.facebook}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="https://facebook.com/username"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>📚</span> Stack Overflow
              </label>
              <input
                type="url"
                name="stackOverflow"
                value={data.stackOverflow}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="https://stackoverflow.com/users/..."
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>🎯</span> LeetCode
              </label>
              <input
                type="url"
                name="leetcode"
                value={data.leetcode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="https://leetcode.com/username"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>✍️</span> Dev.to Username
              </label>
              <input
                type="text"
                name="devUsername"
                value={data.devUsername}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="username"
                dir="ltr"
              />
              <p className="text-sm text-slate-500 mt-1">
                Used to fetch your articles from dev.to
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2 flex items-center gap-2">
                <span>📄</span> Resume Link
              </label>
              <input
                type="url"
                name="resume"
                value={data.resume}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="https://drive.google.com/..."
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={uploading}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalData;

