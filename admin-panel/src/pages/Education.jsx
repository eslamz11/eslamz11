
import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiBook, FiCalendar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAllEducation, addEducation, updateEducation, deleteEducation } from '../services/firestoreService';
import IconSelector from '../components/IconSelector';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    institution: '',
    institution_ar: '',
    duration: '',
    description: '',
    description_ar: '',
    icon: ''
  });

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    setLoading(true);
    try {
      const result = await getAllEducation();
      if (result.success) {
        setEducation(result.data);
      } else {
        toast.error('Failed to load education');
      }
    } catch (error) {
      console.error('Error loading education:', error);
      toast.error('Failed to load education');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading('Saving education...');

    try {
      let result;
      if (editingEducation) {
        result = await updateEducation(editingEducation.docId, formData);
      } else {
        result = await addEducation(formData);
      }

      if (result.success) {
        toast.success(editingEducation ? 'Education updated successfully!' : 'Education added successfully!', { id: loadingToast });
        resetForm();
        loadEducation();
      } else {
        toast.error(result.error || 'Something went wrong', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error saving education:', error);
      toast.error('Failed to save education', { id: loadingToast });
    }
  };

  const handleEdit = (edu) => {
    setEditingEducation(edu);
    setFormData({
      title: edu.title || '',
      title_ar: edu.title_ar || '',
      institution: edu.institution || '',
      institution_ar: edu.institution_ar || '',
      duration: edu.duration || '',
      description: edu.description || '',
      description_ar: edu.description_ar || '',
      icon: edu.icon || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (docId) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;

    const loadingToast = toast.loading('Deleting education...');

    try {
      const result = await deleteEducation(docId);
      if (result.success) {
        toast.success('Education deleted successfully!', { id: loadingToast });
        loadEducation();
      } else {
        toast.error(result.error || 'Something went wrong', { id: loadingToast });
      }
    } catch (error) {
      console.error('Error deleting education:', error);
      toast.error('Failed to delete education', { id: loadingToast });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_ar: '',
      institution: '',
      institution_ar: '',
      duration: '',
      description: '',
      description_ar: '',
      icon: ''
    });
    setEditingEducation(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-violet-600"></div>
        <p className="mt-4 text-slate-600 font-medium">Loading education...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Education</h1>
            <p className="text-violet-100">Manage your academic background</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-violet-600 hover:bg-violet-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FiPlus size={20} />
            Add Education
          </button>
        </div>
      </div>

      {/* Education List */}
      {education.length > 0 ? (
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-yellow-500 to-orange-500 hidden md:block"></div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={edu.docId}
                className="group relative bg-white rounded-2xl border border-slate-200 hover:border-orange-500 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-6 -ml-4 w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                <div className="p-6 md:pl-12">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                          <FiBook className="text-white text-xl" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{edu.title}</h3>
                          <p className="text-orange-600 font-semibold text-lg">{edu.institution}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4 bg-orange-50 px-3 py-1.5 rounded-lg inline-flex">
                        <FiCalendar size={16} className="text-orange-600" />
                        <span className="font-medium">{edu.duration}</span>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <p className="text-slate-600 leading-relaxed">{edu.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="flex-1 bg-violet-50 hover:bg-violet-100 text-violet-700 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <FiEdit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(edu.docId)}
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
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-slate-200 max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiBook className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Education Yet</h3>
            <p className="text-slate-600 mb-6">Start adding your educational background</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg"
            >
              Add Your First Education
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingEducation ? 'Edit Education' : 'Add New Education'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {editingEducation ? 'Update education details' : 'Add a new education entry'}
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
                  <label className="block text-slate-700 font-semibold mb-2">Degree/Certificate (English) *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="e.g. Bachelor of Computer Science"
                    required
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">الدرجة/الشهادة (عربي)</label>
                  <input
                    type="text"
                    value={formData.title_ar}
                    onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="مثال: بكالوريوس علوم الحاسب"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Institution (English) *</label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="e.g. Stanford University"
                    required
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">المؤسسة التعليمية (عربي)</label>
                  <input
                    type="text"
                    value={formData.institution_ar}
                    onChange={(e) => setFormData({ ...formData, institution_ar: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    placeholder="مثال: جامعة ستانفورد"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">Duration *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  placeholder="e.g. 2016 - 2020"
                  required
                  dir="ltr"
                />
              </div>

              <div>
                <IconSelector
                  value={formData.icon}
                  onChange={(icon) => setFormData({ ...formData, icon })}
                  label="Education Icon"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Description (English) *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    rows="5"
                    placeholder="Describe your studies, achievements, and relevant coursework..."
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
                    rows="5"
                    placeholder="اكتب عن دراستك وإنجازاتك..."
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
                >
                  {editingEducation ? 'Update Education' : 'Add Education'}
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

export default Education;
