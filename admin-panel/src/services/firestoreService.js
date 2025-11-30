import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc,
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// ==================== Personal Data ====================

/**
 * جلب البيانات الشخصية
 */
export const getPersonalData = async () => {
  try {
    const docRef = doc(db, 'portfolio', 'personalData');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, message: 'لا توجد بيانات' };
    }
  } catch (error) {
    console.error('Error getting personal data:', error);
    return { success: false, error: error.message };
  }
};

/**
 * تحديث البيانات الشخصية
 */
export const updatePersonalData = async (data) => {
  try {
    const docRef = doc(db, 'portfolio', 'personalData');
    await setDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    return { success: true, message: 'تم تحديث البيانات بنجاح' };
  } catch (error) {
    console.error('Error updating personal data:', error);
    return { success: false, error: error.message };
  }
};

// ==================== Projects ====================

/**
 * جلب جميع المشاريع
 */
export const getAllProjects = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('id', 'asc'));
    const querySnapshot = await getDocs(q);
    
    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ docId: doc.id, ...doc.data() });
    });
    
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error getting projects:', error);
    return { success: false, error: error.message };
  }
};

/**
 * جلب مشروع واحد
 */
export const getProject = async (projectId) => {
  try {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { docId: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, message: 'المشروع غير موجود' };
    }
  } catch (error) {
    console.error('Error getting project:', error);
    return { success: false, error: error.message };
  }
};

/**
 * إضافة مشروع جديد
 */
export const addProject = async (projectData) => {
  try {
    // إنشاء معرف فريد للمشروع
    const projectRef = doc(collection(db, 'projects'));
    
    await setDoc(projectRef, {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, message: 'تم إضافة المشروع بنجاح', id: projectRef.id };
  } catch (error) {
    console.error('Error adding project:', error);
    return { success: false, error: error.message };
  }
};

/**
 * تحديث مشروع
 */
export const updateProject = async (projectId, projectData) => {
  try {
    const docRef = doc(db, 'projects', projectId);
    await updateDoc(docRef, {
      ...projectData,
      updatedAt: serverTimestamp()
    });
    
    return { success: true, message: 'تم تحديث المشروع بنجاح' };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: error.message };
  }
};

/**
 * حذف مشروع
 */
export const deleteProject = async (projectId) => {
  try {
    const docRef = doc(db, 'projects', projectId);
    await deleteDoc(docRef);
    
    return { success: true, message: 'تم حذف المشروع بنجاح' };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: error.message };
  }
};

// ==================== Skills ====================

/**
 * جلب جميع المهارات
 */
export const getAllSkills = async () => {
  try {
    const docRef = doc(db, 'portfolio', 'skills');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data().skills || [] };
    } else {
      return { success: true, data: [] };
    }
  } catch (error) {
    console.error('Error getting skills:', error);
    return { success: false, error: error.message };
  }
};

/**
 * تحديث المهارات
 */
export const updateSkills = async (skills) => {
  try {
    const docRef = doc(db, 'portfolio', 'skills');
    await setDoc(docRef, {
      skills: skills,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    return { success: true, message: 'Skills updated successfully' };
  } catch (error) {
    console.error('Error updating skills:', error);
    return { success: false, error: error.message };
  }
};

// ==================== Education ====================

/**
 * Get all education entries
 * Supports both old structure (single document) and new structure (collection)
 */
export const getAllEducation = async () => {
  try {
    const educations = [];
    
    // Try new structure first (collection)
    try {
      const educationRef = collection(db, 'education');
      const querySnapshot = await getDocs(educationRef);
      
      querySnapshot.forEach((doc) => {
        educations.push({ docId: doc.id, ...doc.data() });
      });
    } catch (collectionError) {
      console.warn('Error reading from education collection:', collectionError);
    }
    
    // Also try old structure (single document) - merge with new data
    try {
      const docRef = doc(db, 'portfolio', 'education');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const oldData = docSnap.data().educations || [];
        // Convert old structure to new structure with docId
        oldData.forEach((edu, index) => {
          educations.push({
            docId: `old_${index}`,
            ...edu
          });
        });
      }
    } catch (oldStructureError) {
      console.warn('Error reading from old education structure:', oldStructureError);
    }
    
    // Sort by createdAt desc (newest first), or by duration if createdAt doesn't exist
    educations.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        const aTime = a.createdAt.toMillis ? a.createdAt.toMillis() : a.createdAt;
        const bTime = b.createdAt.toMillis ? b.createdAt.toMillis() : b.createdAt;
        return bTime - aTime;
      }
      // Fallback: sort by duration string (reverse chronological)
      return (b.duration || '').localeCompare(a.duration || '');
    });
    
    return { success: true, data: educations };
  } catch (error) {
    console.error('Error getting education:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add new education entry
 */
export const addEducation = async (educationData) => {
  try {
    const educationRef = collection(db, 'education');
    const docRef = await addDoc(educationRef, {
      ...educationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, message: 'Education added successfully', id: docRef.id };
  } catch (error) {
    console.error('Error adding education:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update education entry
 * Handles both old structure (migrates to new) and new structure
 */
export const updateEducation = async (docId, educationData) => {
  try {
    // If it's an old structure entry, migrate it to new collection first
    if (docId.startsWith('old_')) {
      // Add to new collection
      const educationRef = collection(db, 'education');
      await addDoc(educationRef, {
        ...educationData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Remove from old structure
      try {
        const oldDocRef = doc(db, 'portfolio', 'education');
        const oldDocSnap = await getDoc(oldDocRef);
        if (oldDocSnap.exists()) {
          const oldEducations = oldDocSnap.data().educations || [];
          const index = parseInt(docId.split('_')[1]);
          if (index >= 0 && index < oldEducations.length) {
            oldEducations.splice(index, 1);
            await setDoc(oldDocRef, {
              educations: oldEducations,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        }
      } catch (migrationError) {
        console.warn('Error migrating old education:', migrationError);
      }
      
      return { success: true, message: 'Education updated and migrated successfully' };
    } else {
      // Update in new collection
      const docRef = doc(db, 'education', docId);
      await updateDoc(docRef, {
        ...educationData,
        updatedAt: serverTimestamp()
      });
      
      return { success: true, message: 'Education updated successfully' };
    }
  } catch (error) {
    console.error('Error updating education:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete education entry
 * Handles both old structure and new structure
 */
export const deleteEducation = async (docId) => {
  try {
    // If it's an old structure entry, delete from old structure
    if (docId.startsWith('old_')) {
      try {
        const oldDocRef = doc(db, 'portfolio', 'education');
        const oldDocSnap = await getDoc(oldDocRef);
        if (oldDocSnap.exists()) {
          const oldEducations = oldDocSnap.data().educations || [];
          const index = parseInt(docId.split('_')[1]);
          if (index >= 0 && index < oldEducations.length) {
            oldEducations.splice(index, 1);
            await setDoc(oldDocRef, {
              educations: oldEducations,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        }
        return { success: true, message: 'Education deleted successfully' };
      } catch (oldDeleteError) {
        console.error('Error deleting old education:', oldDeleteError);
        return { success: false, error: oldDeleteError.message };
      }
    } else {
      // Delete from new collection
      const docRef = doc(db, 'education', docId);
      await deleteDoc(docRef);
      
      return { success: true, message: 'Education deleted successfully' };
    }
  } catch (error) {
    console.error('Error deleting education:', error);
    return { success: false, error: error.message };
  }
};

// ==================== Experience ====================

/**
 * Get all experience entries
 * Supports both old structure (single document) and new structure (collection)
 */
export const getAllExperience = async () => {
  try {
    const experiences = [];
    
    // Try new structure first (collection)
    try {
      const experienceRef = collection(db, 'experience');
      const querySnapshot = await getDocs(experienceRef);
      
      querySnapshot.forEach((doc) => {
        experiences.push({ docId: doc.id, ...doc.data() });
      });
    } catch (collectionError) {
      console.warn('Error reading from experience collection:', collectionError);
    }
    
    // Also try old structure (single document) - merge with new data
    try {
      const docRef = doc(db, 'portfolio', 'experience');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const oldData = docSnap.data().experiences || [];
        // Convert old structure to new structure with docId
        oldData.forEach((exp, index) => {
          experiences.push({
            docId: `old_${index}`,
            ...exp
          });
        });
      }
    } catch (oldStructureError) {
      console.warn('Error reading from old experience structure:', oldStructureError);
    }
    
    // Sort by createdAt desc (newest first), or by duration if createdAt doesn't exist
    experiences.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        const aTime = a.createdAt.toMillis ? a.createdAt.toMillis() : a.createdAt;
        const bTime = b.createdAt.toMillis ? b.createdAt.toMillis() : b.createdAt;
        return bTime - aTime;
      }
      // Fallback: sort by duration string (reverse chronological)
      return (b.duration || '').localeCompare(a.duration || '');
    });
    
    return { success: true, data: experiences };
  } catch (error) {
    console.error('Error getting experience:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add new experience entry
 */
export const addExperience = async (experienceData) => {
  try {
    const experienceRef = collection(db, 'experience');
    const docRef = await addDoc(experienceRef, {
      ...experienceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, message: 'Experience added successfully', id: docRef.id };
  } catch (error) {
    console.error('Error adding experience:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Update experience entry
 * Handles both old structure (migrates to new) and new structure
 */
export const updateExperience = async (docId, experienceData) => {
  try {
    // If it's an old structure entry, migrate it to new collection first
    if (docId.startsWith('old_')) {
      // Add to new collection
      const experienceRef = collection(db, 'experience');
      await addDoc(experienceRef, {
        ...experienceData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Remove from old structure
      try {
        const oldDocRef = doc(db, 'portfolio', 'experience');
        const oldDocSnap = await getDoc(oldDocRef);
        if (oldDocSnap.exists()) {
          const oldExperiences = oldDocSnap.data().experiences || [];
          const index = parseInt(docId.split('_')[1]);
          if (index >= 0 && index < oldExperiences.length) {
            oldExperiences.splice(index, 1);
            await setDoc(oldDocRef, {
              experiences: oldExperiences,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        }
      } catch (migrationError) {
        console.warn('Error migrating old experience:', migrationError);
      }
      
      return { success: true, message: 'Experience updated and migrated successfully' };
    } else {
      // Update in new collection
      const docRef = doc(db, 'experience', docId);
      await updateDoc(docRef, {
        ...experienceData,
        updatedAt: serverTimestamp()
      });
      
      return { success: true, message: 'Experience updated successfully' };
    }
  } catch (error) {
    console.error('Error updating experience:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete experience entry
 * Handles both old structure and new structure
 */
export const deleteExperience = async (docId) => {
  try {
    // If it's an old structure entry, delete from old structure
    if (docId.startsWith('old_')) {
      try {
        const oldDocRef = doc(db, 'portfolio', 'experience');
        const oldDocSnap = await getDoc(oldDocRef);
        if (oldDocSnap.exists()) {
          const oldExperiences = oldDocSnap.data().experiences || [];
          const index = parseInt(docId.split('_')[1]);
          if (index >= 0 && index < oldExperiences.length) {
            oldExperiences.splice(index, 1);
            await setDoc(oldDocRef, {
              experiences: oldExperiences,
              updatedAt: serverTimestamp()
            }, { merge: true });
          }
        }
        return { success: true, message: 'Experience deleted successfully' };
      } catch (oldDeleteError) {
        console.error('Error deleting old experience:', oldDeleteError);
        return { success: false, error: oldDeleteError.message };
      }
    } else {
      // Delete from new collection
      const docRef = doc(db, 'experience', docId);
      await deleteDoc(docRef);
      
      return { success: true, message: 'Experience deleted successfully' };
    }
  } catch (error) {
    console.error('Error deleting experience:', error);
    return { success: false, error: error.message };
  }
};

// ==================== Blogs ====================

/**
 * جلب جميع المدونات
 */
export const getAllBlogs = async () => {
  try {
    const blogsRef = collection(db, 'blogs');
    const q = query(blogsRef, orderBy('published_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ docId: doc.id, ...doc.data() });
    });
    
    return { success: true, data: blogs };
  } catch (error) {
    console.error('Error getting blogs:', error);
    return { success: false, error: error.message };
  }
};

/**
 * إضافة مدونة جديدة
 */
export const addBlog = async (blogData) => {
  try {
    const blogRef = doc(collection(db, 'blogs'));
    
    await setDoc(blogRef, {
      ...blogData,
      published_at: blogData.published_at || new Date().toISOString(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return { success: true, message: 'تم إضافة المدونة بنجاح', id: blogRef.id };
  } catch (error) {
    console.error('Error adding blog:', error);
    return { success: false, error: error.message };
  }
};

/**
 * تحديث مدونة
 */
export const updateBlog = async (blogId, blogData) => {
  try {
    const docRef = doc(db, 'blogs', blogId);
    await updateDoc(docRef, {
      ...blogData,
      updatedAt: serverTimestamp()
    });
    
    return { success: true, message: 'تم تحديث المدونة بنجاح' };
  } catch (error) {
    console.error('Error updating blog:', error);
    return { success: false, error: error.message };
  }
};

/**
 * حذف مدونة
 */
export const deleteBlog = async (blogId) => {
  try {
    const docRef = doc(db, 'blogs', blogId);
    await deleteDoc(docRef);
    
    return { success: true, message: 'تم حذف المدونة بنجاح' };
  } catch (error) {
    console.error('Error deleting blog:', error);
    return { success: false, error: error.message };
  }
};

// ==================== Messages ====================

/**
 * Get all messages
 */
export const getAllMessages = async () => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ docId: doc.id, ...doc.data() });
    });
    
    return { success: true, data: messages };
  } catch (error) {
    console.error('Error getting messages:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Mark message as read
 */
export const markMessageAsRead = async (messageId) => {
  try {
    const docRef = doc(db, 'messages', messageId);
    await updateDoc(docRef, {
      status: 'read',
      readAt: serverTimestamp()
    });
    
    return { success: true, message: 'Message marked as read' };
  } catch (error) {
    console.error('Error marking message as read:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete message
 */
export const deleteMessage = async (messageId) => {
  try {
    const docRef = doc(db, 'messages', messageId);
    await deleteDoc(docRef);
    
    return { success: true, message: 'Message deleted successfully' };
  } catch (error) {
    console.error('Error deleting message:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get unread messages count
 */
export const getUnreadMessagesCount = async () => {
  try {
    const messagesResult = await getAllMessages();
    if (messagesResult.success) {
      const unreadCount = messagesResult.data.filter(msg => msg.status === 'unread').length;
      return { success: true, count: unreadCount };
    }
    return { success: false, count: 0 };
  } catch (error) {
    console.error('Error getting unread messages count:', error);
    return { success: false, error: error.message, count: 0 };
  }
};

// ==================== Statistics ====================

/**
 * جلب الإحصائيات
 */
export const getStatistics = async () => {
  try {
    const projectsResult = await getAllProjects();
    const skillsResult = await getAllSkills();
    const educationResult = await getAllEducation();
    const experienceResult = await getAllExperience();
    const blogsResult = await getAllBlogs();
    const messagesResult = await getAllMessages();
    
    return {
      success: true,
      data: {
        projects: projectsResult.data?.length || 0,
        skills: skillsResult.data?.length || 0,
        education: educationResult.data?.length || 0,
        experience: experienceResult.data?.length || 0,
        blogs: blogsResult.data?.length || 0,
        messages: messagesResult.data?.length || 0
      }
    };
  } catch (error) {
    console.error('Error getting statistics:', error);
    return { success: false, error: error.message };
  }
};

export default {
  getPersonalData,
  updatePersonalData,
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
  getAllSkills,
  updateSkills,
  getAllEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  getAllExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
  getUnreadMessagesCount,
  getStatistics
};

