import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { API_URL } from '../../config/api';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `${API_URL}/api/contacts/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContacts();
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Contact deleted successfully!');
      setSelectedContact(null);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-neon-blue/20 text-neon-blue';
      case 'read':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'replied':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text">Contacts Management</h2>
        <p className="text-gray-400 mt-2">View and manage contact form submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Contacts</p>
              <p className="text-3xl font-bold text-white mt-2">{contacts.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">New Messages</p>
              <p className="text-3xl font-bold text-neon-blue mt-2">
                {contacts.filter(c => c.status === 'new').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-neon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Replied</p>
              <p className="text-3xl font-bold text-green-400 mt-2">
                {contacts.filter(c => c.status === 'replied').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Loading contacts...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No contacts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contacts Cards */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedContact(contact)}
                className={`glass rounded-xl p-6 cursor-pointer hover:border-primary/50 transition-all ${
                  selectedContact?._id === contact._id ? 'border-primary' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                    <p className="text-gray-400 text-sm">{contact.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2 mb-3">{contact.message}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(contact.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="sticky top-8">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-xl font-bold gradient-text">Contact Details</h3>
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Name & Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <p className="text-white font-medium">{selectedContact.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      {selectedContact.email}
                    </a>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-gray-300 whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Received</label>
                    <p className="text-gray-300">
                      {new Date(selectedContact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Status Actions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">Update Status</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(selectedContact._id, 'read')}
                        className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                          selectedContact.status === 'read'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        Read
                      </button>
                      <button
                        onClick={() => updateStatus(selectedContact._id, 'replied')}
                        className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                          selectedContact.status === 'replied'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        Replied
                      </button>
                    </div>
                  </div>

                  {/* Quick Reply */}
                  <div>
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: Portfolio Inquiry&body=Hi ${selectedContact.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
                      className="btn-primary w-full py-3 rounded-lg text-center inline-block"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass rounded-xl p-12 text-center">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400">Select a contact to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManager;
