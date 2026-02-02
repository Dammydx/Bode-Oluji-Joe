import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { Lock } from 'lucide-react';
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const { validatePin } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pin) {
      toast.error('Please enter the PIN');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await validatePin(pin);
      
      if (success) {
        toast.success('Login successful');
        navigate('/admin');
      } else {
        toast.error('Invalid PIN');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-lilac-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-plum-900" />
          </div>
          <h1 className="text-2xl font-bold text-plum-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">
            Enter your PIN to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="input text-center text-xl tracking-widest"
              placeholder="••••"
              maxLength={10}
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </>
            ) : (
              'Access Admin Panel'
            )}
          </button>
        </form>

        

        <div className="mt-6 text-center text-sm text-gray-500">
        <Link to="/" className="text-blue-500 hover:underline">
         Back to Home
       </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;