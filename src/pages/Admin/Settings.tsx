import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { ChevronLeft, Key, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const { updatePin } = useAdmin();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'currentPin') setCurrentPin(value);
    else if (name === 'newPin') setNewPin(value);
    else if (name === 'confirmPin') setConfirmPin(value);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentPin.trim()) {
      newErrors.currentPin = 'Current PIN is required';
    }
    
    if (!newPin.trim()) {
      newErrors.newPin = 'New PIN is required';
    } else if (newPin.length < 4) {
      newErrors.newPin = 'PIN must be at least 4 characters';
    }
    
    if (newPin !== confirmPin) {
      newErrors.confirmPin = 'PINs do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await updatePin(newPin);
      
      if (success) {
        toast.success('PIN updated successfully');
        
        // Reset form
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
      } else {
        toast.error('Failed to update PIN');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/admin" className="mr-4 text-plum-900 hover:text-lilac-500">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-plum-900">Settings</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-plum-900 mb-6 flex items-center">
            <Key size={20} className="mr-2" />
            Change Admin PIN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <div>
              <label htmlFor="currentPin" className="block text-sm font-medium text-gray-700 mb-1">
                Current PIN
              </label>
              <input
                type="password"
                id="currentPin"
                name="currentPin"
                value={currentPin}
                onChange={handleChange}
                className={`input ${errors.currentPin ? 'border-red-500' : ''}`}
                placeholder="Enter current PIN"
                autoComplete="off"
              />
              {errors.currentPin && (
                <p className="mt-1 text-sm text-red-500">{errors.currentPin}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPin" className="block text-sm font-medium text-gray-700 mb-1">
                New PIN
              </label>
              <input
                type="password"
                id="newPin"
                name="newPin"
                value={newPin}
                onChange={handleChange}
                className={`input ${errors.newPin ? 'border-red-500' : ''}`}
                placeholder="Enter new PIN"
                autoComplete="off"
              />
              {errors.newPin && (
                <p className="mt-1 text-sm text-red-500">{errors.newPin}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New PIN
              </label>
              <input
                type="password"
                id="confirmPin"
                name="confirmPin"
                value={confirmPin}
                onChange={handleChange}
                className={`input ${errors.confirmPin ? 'border-red-500' : ''}`}
                placeholder="Confirm new PIN"
                autoComplete="off"
              />
              {errors.confirmPin && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPin}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex items-center"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    Update PIN
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-plum-900 mb-4">Security Tips</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Choose a PIN that is easy for you to remember but hard for others to guess</li>
            <li>Avoid using sequential numbers (e.g., 1234) or repeating digits (e.g., 1111)</li>
            <li>Do not share your PIN with unauthorized individuals</li>
            <li>Change your PIN periodically for enhanced security</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;