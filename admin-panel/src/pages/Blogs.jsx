import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiFileText, FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAllBlogs, addBlog, updateBlog, deleteBlog } from '../services/firestoreService';
import { uploadImage, getImagePreview } from '../services/imageUpload';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    description: '',
    description_ar: '',
    content: '',
    content_ar: '',
    cover_image: '',
    author_name: '',
    author_avatar: '',
    content_images: [],
    url: '',
    published_at: new Date().toISOString().split('T')[0],
    tags: '',
    reading_time_minutes: 5,
    order: 0,
    featured: true,
    type: 'regular' // 'regular' or 'premium'
  });
  const [uploadingContentImage, setUploadingContentImage] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const result = await getAllBlogs();
    if (result.success) {
      setBlogs(result.data);
    } else {
      toast.error('Failed to load blogs');
    }
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = await getImagePreview(file);
    setImagePreview(preview);

    setUploading(true);
    const loadingToast = toast.loading('Uploading image...');
    try {
      const result = await uploadImage(file);
      setFormData({ ...formData, cover_image: result.url });
      toast.success(`Image uploaded via ${result.provider === 'imgbb' ? 'Imgbb' : 'Freeimage.host'}`, { id: loadingToast });
    } catch (error) {
      toast.error('Failed to upload image', { id: loadingToast });
      console.error(error);
      setImagePreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleAuthorAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const loadingToast = toast.loading('Uploading avatar...');
    try {
      const result = await uploadImage(file);
      setFormData({ ...formData, author_avatar: result.url });
      toast.success('Author avatar uploaded successfully!', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to upload avatar', { id: loadingToast });
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleContentImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingContentImage(true);
    const loadingToast = toast.loading('Uploading image...');
    try {
      const result = await uploadImage(file);
      const newImages = [...(formData.content_images || []), result.url];
      setFormData({ ...formData, content_images: newImages });
      toast.success('Image uploaded! Copy the link to add it in content', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to upload image', { id: loadingToast });
      console.error(error);
    } finally {
      setUploadingContentImage(false);
    }
  };

  const removeContentImage = (index) => {
    const newImages = formData.content_images.filter((_, i) => i !== index);
    setFormData({ ...formData, content_images: newImages });
    toast.success('Image removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.content || !formData.cover_image) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Saving blog...');
    let result;

    const blogData = {
      ...formData,
      published_at: formData.published_at || new Date().toISOString(),
      order: parseInt(formData.order) || 0,
      featured: formData.featured === true || formData.featured === 'true',
      type: formData.type || 'regular'
    };

    if (editingBlog) {
      result = await updateBlog(editingBlog.docId, blogData);
    } else {
      result = await addBlog(blogData);
    }

    if (result.success) {
      toast.success(editingBlog ? 'Blog updated successfully!' : 'Blog added successfully!', { id: loadingToast });
      setShowModal(false);
      resetForm();
      loadBlogs();
    } else {
      toast.error(result.error || 'Something went wrong', { id: loadingToast });
    }
    setLoading(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      title_ar: blog.title_ar || '',
      description: blog.description || '',
      description_ar: blog.description_ar || '',
      content: blog.content || '',
      content_ar: blog.content_ar || '',
      cover_image: blog.cover_image || '',
      author_name: blog.author_name || '',
      author_avatar: blog.author_avatar || '',
      content_images: blog.content_images || [],
      url: blog.url || '',
      published_at: blog.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      tags: blog.tags || '',
      reading_time_minutes: blog.reading_time_minutes || 5,
      order: blog.order || 0,
      featured: blog.featured !== undefined ? blog.featured : true,
      type: blog.type || 'regular'
    });
    setImagePreview(blog.cover_image || '');
    setShowModal(true);
  };

  const handleDelete = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    const loadingToast = toast.loading('Deleting blog...');
    const result = await deleteBlog(docId);
    if (result.success) {
      toast.success('Blog deleted successfully!', { id: loadingToast });
      loadBlogs();
    } else {
      toast.error(result.error || 'Failed to delete', { id: loadingToast });
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      title_ar: '',
      description: '',
      description_ar: '',
      content: '',
      content_ar: '',
      cover_image: '',
      author_name: '',
      author_avatar: '',
      content_images: [],
      url: '',
      published_at: new Date().toISOString().split('T')[0],
      tags: '',
      reading_time_minutes: 5,
      order: 0,
      featured: true,
      type: 'regular'
    });
    setImagePreview('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-violet-600"></div>
        <p className="mt-4 text-slate-600 font-medium">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
            <p className="text-violet-100">Manage your articles and content</p>
          </div>
          <button
            onClick={() => { setShowModal(true); resetForm(); }}
            className="bg-white text-violet-600 hover:bg-violet-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiPlus size={20} />
            Add New Blog
          </button>
        </div>
      </div>

      {/* Blogs Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.docId}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-violet-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {blog.cover_image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {blog.author_name && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      {blog.author_avatar && (
                        <img src={blog.author_avatar} alt={blog.author_name} className="w-8 h-8 rounded-full border-2 border-white" />
                      )}
                      <span className="text-white text-sm font-medium">{blog.author_name}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{blog.description}</p>
                
                <div className="flex items-center gap-4 text-slate-500 text-xs mb-4">
                  {blog.published_at && (
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} /> {new Date(blog.published_at).toLocaleDateString()}
                    </span>
                  )}
                  {blog.reading_time_minutes && (
                    <span className="flex items-center gap-1">
                      <FiClock size={12} /> {blog.reading_time_minutes} min read
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 bg-violet-50 hover:bg-violet-100 text-violet-700 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <FiEdit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.docId)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-slate-200 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiFileText className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Blogs Yet</h3>
            <p className="text-slate-600 mb-6">Start sharing your thoughts and experiences</p>
            <button
              onClick={() => { setShowModal(true); resetForm(); }}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              Write Your First Blog
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Blog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl my-8 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {editingBlog ? 'Update your blog content' : 'Create a new blog post'}
                </p>
              </div>
              <button
                onClick={() => { setShowModal(false); resetForm(); }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Cover Image */}
              <div>
                <label className="block text-slate-700 font-semibold mb-3">Cover Image *</label>
                {imagePreview && (
                  <img src={imagePreview} alt="Cover Preview" className="w-full h-48 object-cover rounded-xl mb-3 border-2 border-slate-200" />
                )}
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-50 text-violet-700 rounded-xl font-medium hover:bg-violet-100 transition-colors cursor-pointer border border-violet-200">
                  <FiUpload />
                  {uploading ? 'Uploading...' : 'Upload Cover Image'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              </div>

              {/* Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Title (English) *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Complete Guide to Learning React.js"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    required
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">العنوان (عربي)</label>
                  <input
                    type="text"
                    name="title_ar"
                    value={formData.title_ar}
                    onChange={handleChange}
                    placeholder="مثال: دليل شامل لتعلم React.js"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Description (English) *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Brief description of the blog..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    required
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">الوصف (عربي)</label>
                  <textarea
                    name="description_ar"
                    value={formData.description_ar}
                    onChange={handleChange}
                    rows="3"
                    placeholder="وصف موجز للمدونة..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Content (Markdown - English) *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="12"
                    placeholder="Write your blog content here...&#10;&#10;You can use:&#10;# Main Heading&#10;## Subheading&#10;&#10;![Image description](image_url)"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono text-sm"
                    required
                    dir="ltr"
                  />
                  <p className="text-xs text-slate-500 mt-1">Use Markdown for formatting. Images: ![desc](url)</p>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">المحتوى (عربي)</label>
                  <textarea
                    name="content_ar"
                    value={formData.content_ar}
                    onChange={handleChange}
                    rows="12"
                    placeholder="اكتب محتوى المدونة هنا..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-mono text-sm"
                    dir="rtl"
                  />
                  <p className="text-xs text-slate-500 mt-1">استخدم Markdown للتنسيق</p>
                </div>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Author Name</label>
                  <input
                    type="text"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Author Avatar</label>
                  <div className="flex items-center gap-3">
                    {formData.author_avatar && (
                      <img src={formData.author_avatar} alt="Author" className="w-12 h-12 rounded-full object-cover" />
                    )}
                    <label className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition-all">
                      <FiUpload size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-600">{uploading ? 'Uploading...' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handleAuthorAvatarUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Content Images */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Content Images (Optional)</label>
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition-all">
                  <FiUpload size={20} className="text-slate-400" />
                  <span className="text-slate-600">{uploadingContentImage ? 'Uploading...' : 'Add Image to Content'}</span>
                  <input type="file" accept="image/*" onChange={handleContentImageUpload} className="hidden" disabled={uploadingContentImage} />
                </label>
                
                {formData.content_images && formData.content_images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    {formData.content_images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img src={imageUrl} alt={`Content ${index + 1}`} className="w-full h-32 object-cover rounded-xl" />
                        <button
                          type="button"
                          onClick={() => removeContentImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(`![Image](${imageUrl})`);
                            toast.success('Copied! Paste it in content');
                          }}
                          className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Copy to Content
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Publication Date</label>
                  <input
                    type="date"
                    name="published_at"
                    value={formData.published_at}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Reading Time (minutes)</label>
                  <input
                    type="number"
                    name="reading_time_minutes"
                    value={formData.reading_time_minutes}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">Tags (Optional)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g. react, javascript, webdev"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Separate tags with commas</p>
              </div>

              {/* External URL */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2">External URL (Optional)</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com/blog/post"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Display Settings */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span>Display Settings</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Blog Type */}
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Blog Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="regular">🔹 Regular</option>
                      <option value="premium">⭐ Premium</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      Premium blogs have special design
                    </p>
                  </div>

                  {/* Order Field */}
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="0"
                      min="0"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Lower numbers appear first
                    </p>
                  </div>

                  {/* Featured Checkbox */}
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Show on Homepage
                    </label>
                    <div className="flex items-center gap-3 h-12">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-600"></div>
                      </label>
                      <span className="text-sm font-medium text-slate-700">
                        {formData.featured ? '✓ Yes' : '✗ No'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Featured on homepage
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50"
                  disabled={loading || uploading || uploadingContentImage}
                >
                  {editingBlog ? 'Update Blog' : 'Publish Blog'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
