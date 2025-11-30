import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCode, FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAllSkills, updateSkills } from '../services/firestoreService';
import { uploadImage, getImagePreview } from '../services/imageUpload';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    level: 50,
    category: 'frontend',
    image: ''
  });

  const categories = [
    { value: 'frontend', label: 'Frontend', icon: '🎨', color: 'from-blue-500 to-cyan-500' },
    { value: 'backend', label: 'Backend', icon: '⚙️', color: 'from-green-500 to-emerald-500' },
    { value: 'database', label: 'Database', icon: '🗄️', color: 'from-purple-500 to-pink-500' },
    { value: 'tools', label: 'Tools', icon: '🛠️', color: 'from-orange-500 to-yellow-500' },
    { value: 'other', label: 'Other', icon: '📦', color: 'from-violet-500 to-purple-500' }
  ];

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const result = await getAllSkills();
      if (result.success && Array.isArray(result.data)) {
        setSkills(result.data);
      } else {
        toast.error('Failed to load skills');
      }
    } catch (error) {
      console.error('Error loading skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Either name or image must be provided
    if (!formData.name.trim() && !formData.image.trim()) {
      toast.error('Please provide either a skill name or an image');
      return;
    }
    
    const loadingToast = toast.loading('Saving skill...');
    
    try {
      let updatedSkills;
      if (editingSkill !== null) {
        updatedSkills = [...skills];
        updatedSkills[editingSkill] = formData;
      } else {
        updatedSkills = [...skills, formData];
      }

      const result = await updateSkills(updatedSkills);
      if (result.success) {
        toast.success(editingSkill !== null ? 'Skill updated successfully!' : 'Skill added successfully!', { id: loadingToast });
        setSkills(updatedSkills);
        resetForm();
      } else {
        toast.error(result.error || 'Something went wrong', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error('Failed to save skill', { id: loadingToast });
    }
  };

  const handleEdit = (index) => {
    setEditingSkill(index);
    const skill = skills[index];
    setFormData({
      name: skill.name || '',
      name_ar: skill.name_ar || '',
      level: skill.level || 50,
      category: skill.category || 'frontend',
      image: skill.image || ''
    });
    setImagePreview(skill.image || '');
    setShowModal(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    const loadingToast = toast.loading('Deleting skill...');
    
    try {
      const updatedSkills = skills.filter((_, i) => i !== index);
      const result = await updateSkills(updatedSkills);
      
      if (result.success) {
        toast.success('Skill deleted successfully!', { id: loadingToast });
        setSkills(updatedSkills);
      } else {
        toast.error(result.error || 'Something went wrong', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill', { id: loadingToast });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      name_ar: '',
      level: 50,
      category: 'frontend',
      image: ''
    });
    setImagePreview('');
    setEditingSkill(null);
    setShowModal(false);
  };

  const groupedSkills = categories.map(cat => ({
    ...cat,
    skills: skills.filter(skill => skill.category === cat.value)
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-violet-600"></div>
        <p className="mt-4 text-slate-600 font-medium">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Technical Skills</h1>
            <p className="text-violet-100">Manage your professional skill set</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-violet-600 hover:bg-violet-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiPlus size={20} />
            Add New Skill
          </button>
        </div>
      </div>

      {/* Skills by Category */}
      {skills.length > 0 ? (
        <div className="space-y-6">
          {groupedSkills.map((category) => (
            category.skills.length > 0 && (
              <div key={category.value} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{category.label}</h2>
                    <p className="text-sm text-slate-500">{category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const actualIndex = skills.findIndex(s => s === skill);
                    const hasImage = skill.image && skill.image.trim() !== '';
                    const hasName = skill.name && skill.name.trim() !== '';
                    const imageOnly = hasImage && !hasName;
                    
                    return (
                      <div 
                        key={actualIndex}
                        className={`group bg-slate-50 hover:bg-white border-2 border-slate-200 hover:border-violet-500 rounded-xl transition-all duration-200 ${
                          imageOnly ? 'p-0 aspect-square overflow-hidden' : 'p-4'
                        }`}
                      >
                        {/* Image Only Mode - Full Square */}
                        {imageOnly ? (
                          <>
                            <div className="relative w-full h-full aspect-square">
                              <img
                                src={skill.image}
                                alt="Skill"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleEdit(actualIndex)}
                                  className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                                >
                                  <FiEdit2 size={14} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(actualIndex)}
                                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                                >
                                  <FiTrash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Normal Mode with Name and Level */}
                            {hasImage && (
                              <div className="mb-3">
                                <img
                                  src={skill.image}
                                  alt={skill.name || 'Skill'}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              </div>
                            )}
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                {hasName && (
                                  <>
                                    <h3 className="font-bold text-slate-900 mb-2">{skill.name}</h3>
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                                        <div 
                                          className={`h-full bg-gradient-to-r ${category.color} transition-all duration-300`}
                                          style={{ width: `${skill.level || 50}%` }}
                                        ></div>
                                      </div>
                                      <span className="text-sm font-semibold text-slate-600 min-w-[45px]">{skill.level || 50}%</span>
                                    </div>
                                  </>
                                )}
                                {!hasName && hasImage && (
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                                      <div 
                                        className={`h-full bg-gradient-to-r ${category.color} transition-all duration-300`}
                                        style={{ width: `${skill.level || 50}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 min-w-[45px]">{skill.level || 50}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-2 pt-3 border-t border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(actualIndex)}
                                className="flex-1 bg-violet-50 hover:bg-violet-100 text-violet-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                              >
                                <FiEdit2 size={14} />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(actualIndex)}
                                className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                              >
                                <FiTrash2 size={14} />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-slate-200 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiCode className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Skills Yet</h3>
            <p className="text-slate-600 mb-6">Start building your skill portfolio</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              Add Your First Skill
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingSkill !== null ? 'Edit Skill' : 'Add New Skill'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {editingSkill !== null ? 'Update skill information' : 'Add a new skill to your portfolio'}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Skill Name (English)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="e.g. React, Node.js, Python..."
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">اسم المهارة (عربي)</label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="مثال: رياكت، نود.جي اس، بايثون..."
                    dir="rtl"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 -mt-3">Leave both empty if you want image-only display</p>

              {/* Skill Image */}
              <div>
                <label className="block text-slate-700 font-semibold mb-3">Skill Image (Optional)</label>
                {imagePreview && (
                  <div className="mb-3">
                    <img
                      src={imagePreview}
                      alt="Skill Preview"
                      className="w-full h-32 object-cover rounded-xl border-2 border-slate-200"
                    />
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
                <p className="text-xs text-slate-500 mt-2">
                  If you upload an image without a name, it will display as a full square image
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-slate-700 font-semibold">Proficiency Level</label>
                  <span className="text-2xl font-bold text-violet-600">{formData.level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-violet-600"
                  style={{
                    background: `linear-gradient(to right, rgb(124, 58, 237) 0%, rgb(124, 58, 237) ${formData.level}%, rgb(226, 232, 240) ${formData.level}%, rgb(226, 232, 240) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
                >
                  {editingSkill !== null ? 'Update Skill' : 'Add Skill'}
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

export default Skills;
