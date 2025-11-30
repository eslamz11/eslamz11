import { useState, useEffect, useRef } from 'react';
import { 
  FiMail, 
  FiTrash2, 
  FiUser, 
  FiClock, 
  FiFilter,
  FiSearch,
  FiInbox,
  FiCheckCircle,
  FiActivity,
  FiCheck,
  FiPhone,
  FiRefreshCw
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getAllMessages, markMessageAsRead, deleteMessage } from '../services/firestoreService';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const audioRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    // Create notification sound (simple beep)
    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGmi78OScTgwOUKrj8LdjHAY3kdbyy3ksBSV3x/DdkUALFWC16OynUxQKRp/g8rpqIAUsgs/y2Yk1CBdps/DlnlAMDVKv5fC6YhoGOZPY8sl1KwUmd8v03o9ACRVhtuvsp1EUC0ih4vO7ax4GLYPx8tyINQgWabLw5ZxPCw1Tr+XwuF8aBy==');
  }, []);

  useEffect(() => {
    loadMessages();
    
    // Start polling every 10 seconds
    pollingIntervalRef.current = setInterval(() => {
      loadMessages(true);
    }, 10000);

    // Cleanup on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, filter, searchQuery]);

  const loadMessages = async (isPolling = false) => {
    if (!isPolling) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }
    
    try {
      const result = await getAllMessages();
      
      if (result.success) {
        const newMessages = result.data;
        const newUnreadCount = newMessages.filter(msg => msg.status === 'unread').length;
        
        // Check if there are new messages
        if (isPolling && lastMessageCount > 0 && newMessages.length > lastMessageCount) {
          const newMessagesCount = newMessages.length - lastMessageCount;
          
          // Play notification sound
          try {
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.log('Audio play failed:', e));
            }
          } catch (error) {
            console.log('Could not play sound:', error);
          }
          
          // Show toast notification
          toast.success(
            `🔔 ${newMessagesCount} new message${newMessagesCount > 1 ? 's' : ''} received!`,
            {
              duration: 5000,
              position: 'top-right',
              style: {
                background: '#10b981',
                color: '#fff',
                fontWeight: 'bold',
              },
            }
          );
        }
        
        setMessages(newMessages);
        setLastMessageCount(newMessages.length);
        
        // Save to localStorage for sidebar badge
        localStorage.setItem('unreadMessagesCount', newUnreadCount.toString());
      } else {
        if (!isPolling) {
          toast.error('Failed to load messages');
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      if (!isPolling) {
        toast.error('Failed to load messages');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const filterMessages = () => {
    let filtered = [...messages];

    // Apply status filter
    if (filter === 'unread') {
      filtered = filtered.filter(msg => msg.status === 'unread');
    } else if (filter === 'read') {
      filtered = filtered.filter(msg => msg.status === 'read');
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(msg => 
        msg.name?.toLowerCase().includes(query) ||
        msg.email?.toLowerCase().includes(query) ||
        msg.message?.toLowerCase().includes(query)
      );
    }

    setFilteredMessages(filtered);
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      const result = await markMessageAsRead(messageId);
      
      if (result.success) {
        const updatedMessages = messages.map(msg => 
          msg.docId === messageId ? { ...msg, status: 'read' } : msg
        );
        setMessages(updatedMessages);
        
        if (selectedMessage?.docId === messageId) {
          setSelectedMessage({ ...selectedMessage, status: 'read' });
        }
        
        // Update unread count in localStorage
        const newUnreadCount = updatedMessages.filter(msg => msg.status === 'unread').length;
        localStorage.setItem('unreadMessagesCount', newUnreadCount.toString());
        
        toast.success('Message marked as read');
      } else {
        toast.error('Failed to mark message as read');
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    setDeleteLoading(messageId);
    try {
      const result = await deleteMessage(messageId);
      
      if (result.success) {
        const updatedMessages = messages.filter(msg => msg.docId !== messageId);
        setMessages(updatedMessages);
        
        if (selectedMessage?.docId === messageId) {
          setSelectedMessage(null);
        }
        
        // Update unread count in localStorage
        const newUnreadCount = updatedMessages.filter(msg => msg.status === 'unread').length;
        localStorage.setItem('unreadMessagesCount', newUnreadCount.toString());
        
        // Update last message count
        setLastMessageCount(updatedMessages.length);
        
        toast.success('Message deleted successfully');
      } else {
        toast.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      handleMarkAsRead(message.docId);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch (error) {
      return 'N/A';
    }
  };

  const stats = {
    total: messages.length,
    unread: messages.filter(msg => msg.status === 'unread').length,
    read: messages.filter(msg => msg.status === 'read').length
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-violet-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FiActivity className="text-violet-600 animate-pulse" size={24} />
          </div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <FiMail className="text-3xl" />
              Messages
              {isRefreshing && (
                <FiRefreshCw className="text-xl animate-spin" />
              )}
            </h1>
            <p className="text-violet-100">
              Manage and respond to user messages from your portfolio
            </p>
            <p className="text-violet-200 text-sm mt-1">
              🔄 Auto-refresh every 10 seconds
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => loadMessages()}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all disabled:opacity-50"
            >
              <FiRefreshCw className={isRefreshing ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FiInbox className="text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-transparent hover:border-blue-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 font-medium mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
              <FiInbox className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-transparent hover:border-orange-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 font-medium mb-1">Unread Messages</p>
              <p className="text-3xl font-bold text-slate-900">{stats.unread}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg">
              <FiMail className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-transparent hover:border-green-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 font-medium mb-1">Read Messages</p>
              <p className="text-3xl font-bold text-slate-900">{stats.read}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
              <FiCheckCircle className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <FiFilter size={16} />
                All ({stats.total})
              </span>
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <FiMail size={16} />
                Unread ({stats.unread})
              </span>
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'read'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <FiCheckCircle size={16} />
                Read ({stats.read})
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900">
              {filter === 'all' ? 'All Messages' : filter === 'unread' ? 'Unread Messages' : 'Read Messages'}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="max-h-[600px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <FiInbox className="text-4xl text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No messages found</p>
                <p className="text-sm text-slate-500 mt-1">Messages will appear here once users contact you</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {filteredMessages.map((message) => (
                  <div
                    key={message.docId}
                    onClick={() => handleSelectMessage(message)}
                    className={`p-4 cursor-pointer transition-all hover:bg-slate-50 ${
                      selectedMessage?.docId === message.docId ? 'bg-violet-50 border-l-4 border-violet-600' : ''
                    } ${message.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`p-2 rounded-lg ${
                          message.status === 'unread' 
                            ? 'bg-orange-500 text-white' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {message.status === 'unread' ? <FiMail size={20} /> : <FiCheckCircle size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold truncate ${
                              message.status === 'unread' ? 'text-slate-900' : 'text-slate-700'
                            }`}>
                              {message.name}
                            </h3>
                            {message.status === 'unread' && (
                              <span className="flex-shrink-0 px-2 py-0.5 bg-orange-500 text-white text-xs font-medium rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 truncate mb-1">{message.email}</p>
                          <p className="text-sm text-slate-500 line-clamp-2">{message.message}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                            <FiClock size={12} />
                            <span>{formatDate(message.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(message.docId);
                        }}
                        disabled={deleteLoading === message.docId}
                        className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                      >
                        {deleteLoading === message.docId ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent"></div>
                        ) : (
                          <FiTrash2 size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Detail Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900">Message Details</h2>
          </div>

          <div className="p-6">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedMessage.status === 'unread'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedMessage.status === 'unread' ? 'Unread' : 'Read'}
                  </span>
                  <div className="text-sm text-slate-500 flex items-center gap-2">
                    <FiClock size={14} />
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                </div>

                {/* Sender Info */}
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-violet-500 text-white rounded-lg">
                      <FiUser size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 mb-1">From</p>
                      <p className="font-semibold text-slate-900">{selectedMessage.name}</p>
                      <a 
                        href={`mailto:${selectedMessage.email}`}
                        className="text-violet-600 hover:text-violet-700 text-sm break-all block mb-1"
                      >
                        {selectedMessage.email}
                      </a>
                      {selectedMessage.phone && (
                        <a 
                          href={`tel:${selectedMessage.phone}`}
                          className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1"
                        >
                          <FiPhone size={14} />
                          {selectedMessage.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-600 mb-3">Message</h3>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Your message&body=Hi ${selectedMessage.name},%0D%0A%0D%0A`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all font-medium shadow-lg hover:shadow-xl"
                  >
                    <FiMail size={18} />
                    Reply via Email
                  </a>
                  {selectedMessage.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(selectedMessage.docId)}
                      className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-medium"
                    >
                      <FiCheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.docId)}
                    disabled={deleteLoading === selectedMessage.docId}
                    className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium disabled:opacity-50"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <FiMail className="text-4xl text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium">No message selected</p>
                <p className="text-sm text-slate-500 mt-1">Select a message from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

