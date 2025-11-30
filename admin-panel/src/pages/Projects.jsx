import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAllProjects, addProject, updateProject, deleteProject } from '../services/firestoreService';
import { uploadImage, getImagePreview } from '../services/imageUpload';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    tools: '',
    role: '',
    role_ar: '',
    code: '',
    demo: '',
    downloadLink: '',
    image: '',
    project_images: [],
    videos: [],
    order: 0,
    featured: true,
    type: 'regular' // 'regular' or 'premium'
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const result = await getAllProjects();
      if (result.success) {
        setProjects(result.data);
      } else {
        toast.error('Failed to load projects');
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show image preview
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

      setFormData(prev => ({
        ...prev,
        image: result.url
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

  const handleGalleryImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingGalleryImage(true);
    const loadingToast = toast.loading('Uploading image...');

    try {
      const result = await uploadImage(file);

      setFormData(prev => ({
        ...prev,
        project_images: [...(prev.project_images || []), { 
          url: result.url, 
          title: '', 
          title_ar: '', 
          description: '', 
          description_ar: '' 
        }]
      }));

      toast.success('Image added to gallery!', {
        id: loadingToast
      });
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      toast.error(error.message || 'Failed to upload image', {
        id: loadingToast
      });
    } finally {
      setUploadingGalleryImage(false);
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      project_images: prev.project_images.filter((_, i) => i !== index)
    }));
    toast.success('Image removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading('Saving project...');

    try {
      const projectData = {
        id: editingProject ? editingProject.id : formData.id,
        name: formData.name,
        name_ar: formData.name_ar || '',
        description: formData.description,
        description_ar: formData.description_ar || '',
        tools: formData.tools.split(',').map(t => t.trim()),
        role: formData.role,
        role_ar: formData.role_ar || '',
        code: formData.code,
        demo: formData.demo,
        downloadLink: formData.downloadLink,
        image: formData.image,
        project_images: formData.project_images || [],
        videos: formData.videos || [],
        order: parseInt(formData.order) || 0,
        featured: formData.featured === true || formData.featured === 'true',
        type: formData.type || 'regular'
      };

      let result;
      if (editingProject) {
        result = await updateProject(editingProject.docId, projectData);
      } else {
        result = await addProject(projectData);
      }

      if (result.success) {
        toast.success(editingProject ? 'Project updated successfully!' : 'Project added successfully!', { id: loadingToast });
        resetForm();
        loadProjects();
      } else {
        toast.error(result.error || 'Something went wrong', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project', { id: loadingToast });
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    
    // Convert old format project_images (array of strings) to new format (array of objects)
    const projectImages = project.project_images || [];
    const formattedImages = projectImages.map(img => {
      if (typeof img === 'string') {
        return { url: img, title: '', title_ar: '', description: '', description_ar: '' };
      }
      return img;
    });
    
    setFormData({
      id: project.id,
      name: project.name || '',
      name_ar: project.name_ar || '',
      description: project.description || '',
      description_ar: project.description_ar || '',
      tools: Array.isArray(project.tools) ? project.tools.join(', ') : '',
      role: project.role || '',
      role_ar: project.role_ar || '',
      code: project.code || '',
      demo: project.demo || '',
      downloadLink: project.downloadLink || '',
      image: project.image || '',
      project_images: formattedImages,
      videos: project.videos || [],
      order: project.order || 0,
      featured: project.featured !== undefined ? project.featured : true,
      type: project.type || 'regular'
    });
    setImagePreview(project.image || '');
    setShowModal(true);
  };

  const handleDelete = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    const loadingToast = toast.loading('Deleting project...');

    try {
      const result = await deleteProject(docId);
      if (result.success) {
        toast.success('Project deleted successfully!', { id: loadingToast });
        loadProjects();
      } else {
        toast.error(result.error || 'Something went wrong', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project', { id: loadingToast });
    }
  };

  const resetForm = () => {
    setFormData({
      id: Date.now(),
      name: '',
      name_ar: '',
      description: '',
      description_ar: '',
      tools: '',
      role: '',
      role_ar: '',
      code: '',
      demo: '',
      downloadLink: '',
      image: '',
      project_images: [],
      videos: [],
      order: 0,
      featured: true,
      type: 'regular'
    });
    setImagePreview('');
    setEditingProject(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-violet-600"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-violet-100">Manage your portfolio projects</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-violet-600 hover:bg-violet-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiPlus size={20} />
            Add New Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.docId} className="group bg-white rounded-2xl border border-slate-200 hover:border-violet-500 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Project Image */}
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              )}

              <div className="p-5">
                {/* Project Info */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{project.name}</h3>
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">{project.description}</p>

                {/* Role */}
                {project.role && (
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-medium shadow-sm">
                      {project.role}
                    </span>
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(project.tools) && project.tools.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-violet-50 text-violet-700 text-xs rounded-lg font-medium border border-violet-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {Array.isArray(project.tools) && project.tools.length > 3 && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium">
                      +{project.tools.length - 3} more
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 bg-violet-50 hover:bg-violet-100 text-violet-700 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <FiEdit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.docId)}
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
              <FiPlus className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Projects Yet</h3>
            <p className="text-slate-600 mb-6">Start by adding your first project to showcase your work</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              Add Your First Project
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {editingProject ? 'Update project information' : 'Fill in the project details'}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-slate-700 font-semibold mb-3">Project Cover Image</label>
                {(imagePreview || formData.image) && (
                  <div className="relative group mb-3">
                    <img
                      src={imagePreview || formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border-2 border-slate-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-xl"></div>
                  </div>
                )}
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-violet-50 text-violet-700 rounded-xl font-medium hover:bg-violet-100 transition-colors cursor-pointer border border-violet-200">
                  <FiUpload />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {uploading && (
                  <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                    <span className="animate-pulse">⏳</span> Trying Imgbb first, then Freeimage.host...
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Project Name (English) *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="Enter project name"
                    required
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">اسم المشروع (عربي)</label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="أدخل اسم المشروع"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Description (English) *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    rows="4"
                    placeholder="Describe your project"
                    required
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">الوصف (عربي)</label>
                  <textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    rows="4"
                    placeholder="اكتب وصف المشروع"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Your Role (English) *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="Full Stack Developer, Frontend Developer..."
                    required
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">دورك (عربي)</label>
                  <input
                    type="text"
                    value={formData.role_ar}
                    onChange={(e) => setFormData({ ...formData, role_ar: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="مطور ويب متكامل، مطور واجهات أمامية..."
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Technologies Used (comma separated) *
                </label>
                <input
                  type="text"
                  value={formData.tools}
                  onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="React, Node.js, MongoDB, TypeScript..."
                  dir="ltr"
                  required
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
                  {/* Project Type */}
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Project Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="regular">🔹 Regular</option>
                      <option value="premium">⭐ Premium</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      Premium projects have special design
                    </p>
                  </div>

                  {/* Order Field */}
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: e.target.value })}
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

              {/* Project Links */}
              <div className="border-t border-slate-200 pt-5">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-violet-600">🔗</span>
                  <span>Project Links</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-slate-600 font-medium text-sm">
                      🌐 Live Demo
                    </label>
                    <input
                      type="url"
                      value={formData.demo}
                      onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                      placeholder="https://demo.com"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-600 font-medium text-sm">
                      💻 Source Code
                    </label>
                    <input
                      type="url"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                      placeholder="https://github.com/..."
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-slate-600 font-medium text-sm">
                      📱 Download App
                    </label>
                    <input
                      type="url"
                      value={formData.downloadLink}
                      onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                      placeholder="https://app-store.com/..."
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-sm text-blue-700 flex items-start gap-2">
                    <span>💡</span>
                    <span>
                      <strong>Note:</strong> Empty fields won't show buttons on the project page.
                    </span>
                  </p>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="border-t border-slate-200 pt-5">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>🖼️</span>
                  <span>Project Gallery</span>
                  <span className="text-xs font-normal bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Optional</span>
                </h3>

                {/* Add Image Button */}
                <label className="mb-4 flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-violet-500 hover:bg-violet-50 transition-all duration-200">
                  <FiUpload size={20} className="text-slate-400" />
                  <span className="text-slate-600 font-medium">
                    {uploadingGalleryImage ? '⏳ Uploading...' : '📤 Add Image to Gallery'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryImageUpload}
                    className="hidden"
                    disabled={uploadingGalleryImage}
                  />
                </label>

                {/* Images List */}
                {formData.project_images && formData.project_images.length > 0 && (
                  <div className="space-y-4">
                    {formData.project_images.map((image, index) => {
                      // Handle both old format (string) and new format (object)
                      const imageUrl = typeof image === 'string' ? image : image.url;
                      const imageData = typeof image === 'string' ? { url: image, title: '', title_ar: '', description: '', description_ar: '' } : image;

                      return (
                        <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-slate-700">Image #{index + 1}</span>
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>

                          {/* Image Preview */}
                          <div className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-48 object-cover rounded-xl border-2 border-slate-200"
                            />
                          </div>

                          {/* Image Titles */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-600 font-medium text-sm mb-1">
                                Title (EN)
                              </label>
                              <input
                                type="text"
                                value={imageData.title || ''}
                                onChange={(e) => {
                                  const newImages = [...formData.project_images];
                                  if (typeof newImages[index] === 'string') {
                                    newImages[index] = { url: newImages[index], title: e.target.value, title_ar: '', description: '', description_ar: '' };
                                  } else {
                                    newImages[index] = { ...newImages[index], title: e.target.value };
                                  }
                                  setFormData({ ...formData, project_images: newImages });
                                }}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 text-sm"
                                placeholder="Image title"
                                dir="ltr"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 font-medium text-sm mb-1">
                                العنوان (AR)
                              </label>
                              <input
                                type="text"
                                value={imageData.title_ar || ''}
                                onChange={(e) => {
                                  const newImages = [...formData.project_images];
                                  if (typeof newImages[index] === 'string') {
                                    newImages[index] = { url: newImages[index], title: '', title_ar: e.target.value, description: '', description_ar: '' };
                                  } else {
                                    newImages[index] = { ...newImages[index], title_ar: e.target.value };
                                  }
                                  setFormData({ ...formData, project_images: newImages });
                                }}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 text-sm"
                                placeholder="عنوان الصورة"
                                dir="rtl"
                              />
                            </div>
                          </div>

                          {/* Image Descriptions */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-slate-600 font-medium text-sm mb-1">
                                Description (EN)
                              </label>
                              <textarea
                                value={imageData.description || ''}
                                onChange={(e) => {
                                  const newImages = [...formData.project_images];
                                  if (typeof newImages[index] === 'string') {
                                    newImages[index] = { url: newImages[index], title: '', title_ar: '', description: e.target.value, description_ar: '' };
                                  } else {
                                    newImages[index] = { ...newImages[index], description: e.target.value };
                                  }
                                  setFormData({ ...formData, project_images: newImages });
                                }}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 text-sm resize-none"
                                rows="2"
                                placeholder="Optional description"
                                dir="ltr"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-600 font-medium text-sm mb-1">
                                الوصف (AR)
                              </label>
                              <textarea
                                value={imageData.description_ar || ''}
                                onChange={(e) => {
                                  const newImages = [...formData.project_images];
                                  if (typeof newImages[index] === 'string') {
                                    newImages[index] = { url: newImages[index], title: '', title_ar: '', description: '', description_ar: e.target.value };
                                  } else {
                                    newImages[index] = { ...newImages[index], description_ar: e.target.value };
                                  }
                                  setFormData({ ...formData, project_images: newImages });
                                }}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-violet-500 text-sm resize-none"
                                rows="2"
                                placeholder="وصف اختياري"
                                dir="rtl"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <p className="text-sm text-amber-700 flex items-start gap-2">
                    <span>📸</span>
                    <span>
                      <strong>Tip:</strong> Add titles and descriptions to make your gallery more informative
                    </span>
                  </p>
                </div>
              </div>

              {/* Project Videos */}
              <div className="border-t border-slate-200 pt-5">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>🎥</span>
                  <span>Project Videos (YouTube)</span>
                  <span className="text-xs font-normal bg-slate-100 text-slate-600 px-2 py-1 rounded-full">Optional</span>
                </h3>

                {/* Add Video Button */}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      videos: [...(prev.videos || []), { title: '', title_ar: '', url: '', description: '', description_ar: '' }]
                    }));
                  }}
                  className="mb-4 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors border border-red-200 font-medium"
                >
                  <FiPlus />
                  Add YouTube Video
                </button>

                {/* Videos List */}
                {formData.videos && formData.videos.length > 0 && (
                  <div className="space-y-4">
                    {formData.videos.map((video, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-slate-700">Video #{index + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                videos: prev.videos.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>

                        {/* YouTube URL */}
                        <div>
                          <label className="block text-slate-600 font-medium text-sm mb-1">
                            🔗 YouTube URL *
                          </label>
                          <input
                            type="url"
                            value={video.url}
                            onChange={(e) => {
                              const newVideos = [...formData.videos];
                              newVideos[index].url = e.target.value;
                              setFormData({ ...formData, videos: newVideos });
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                            placeholder="https://www.youtube.com/watch?v=..."
                            dir="ltr"
                          />
                        </div>

                        {/* Video Titles */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 font-medium text-sm mb-1">
                              Title (EN) *
                            </label>
                            <input
                              type="text"
                              value={video.title}
                              onChange={(e) => {
                                const newVideos = [...formData.videos];
                                newVideos[index].title = e.target.value;
                                setFormData({ ...formData, videos: newVideos });
                              }}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                              placeholder="Video title"
                              dir="ltr"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 font-medium text-sm mb-1">
                              العنوان (AR)
                            </label>
                            <input
                              type="text"
                              value={video.title_ar}
                              onChange={(e) => {
                                const newVideos = [...formData.videos];
                                newVideos[index].title_ar = e.target.value;
                                setFormData({ ...formData, videos: newVideos });
                              }}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                              placeholder="عنوان الفيديو"
                              dir="rtl"
                            />
                          </div>
                        </div>

                        {/* Video Descriptions */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 font-medium text-sm mb-1">
                              Description (EN)
                            </label>
                            <textarea
                              value={video.description}
                              onChange={(e) => {
                                const newVideos = [...formData.videos];
                                newVideos[index].description = e.target.value;
                                setFormData({ ...formData, videos: newVideos });
                              }}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm resize-none"
                              rows="2"
                              placeholder="Optional description"
                              dir="ltr"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 font-medium text-sm mb-1">
                              الوصف (AR)
                            </label>
                            <textarea
                              value={video.description_ar}
                              onChange={(e) => {
                                const newVideos = [...formData.videos];
                                newVideos[index].description_ar = e.target.value;
                                setFormData({ ...formData, videos: newVideos });
                              }}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm resize-none"
                              rows="2"
                              placeholder="وصف اختياري"
                              dir="rtl"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm text-red-700 flex items-start gap-2">
                    <span>🎬</span>
                    <span>
                      <strong>Note:</strong> Paste YouTube video URLs (supports: watch, shorts, embed formats)
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50"
                  disabled={uploading || uploadingGalleryImage}
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
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

export default Projects;

