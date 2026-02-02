import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import supabase from '../../lib/supabase';
import { ChevronLeft, Trash2, Mail, MailOpen, Calendar } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setMessages(data || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Mark message as read
  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Update messages state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      ));

      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read: true });
      }
    } catch (error) {
      let message = 'Failed to update message';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  // Delete message
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Update state to remove the deleted message
      setMessages(messages.filter(msg => msg.id !== id));
      
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      
      toast.success('Message deleted successfully');
    } catch (error) {
      let message = 'Failed to delete message';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    }
  };

  // Handle message selection
  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if it's unread
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/admin" className="mr-4 text-plum-900 hover:text-lilac-500">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-plum-900">Messages</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-lilac-300 border-t-lilac-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-plum-900">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 btn btn-primary"
            >
              Retry
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-700 mb-4">No messages found</p>
            <p className="text-gray-600">
              When visitors send you messages through the contact form, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="md:col-span-1">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-plum-900">
                    {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
                  </h2>
                </div>
                <div className="max-h-[600px] overflow-y-auto">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      variants={itemVariants}
                      className={`border-b border-gray-100 cursor-pointer transition-colors 
                      ${selectedMessage?.id === message.id ? 'bg-lilac-50' : message.read ? 'bg-white' : 'bg-gray-50'}`}
                      onClick={() => handleSelectMessage(message)}
                    >
                      <div className="p-4 flex items-start">
                        <div className="mr-3 text-gray-400">
                          {message.read ? <MailOpen size={18} /> : <Mail size={18} className="text-lilac-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${message.read ? 'text-gray-700' : 'text-plum-900'}`}>
                            {message.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {message.email}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(message.created_at)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Message Detail */}
            <div className="md:col-span-2">
              {selectedMessage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-semibold text-plum-900">
                      {selectedMessage.name}
                    </h2>
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="btn bg-red-50 text-red-600 hover:bg-red-100 flex items-center"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-2 text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-lilac-500 hover:text-lilac-600"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>

                  <div className="flex items-center mb-6 text-sm text-gray-500">
                    <Calendar size={14} className="mr-2" />
                    <time dateTime={selectedMessage.created_at}>
                      {formatDate(selectedMessage.created_at)}
                    </time>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap text-gray-700">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="mt-6">
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="btn btn-primary"
                    >
                      Reply via Email
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Mail size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-600">
                    Select a message from the list to view its details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;