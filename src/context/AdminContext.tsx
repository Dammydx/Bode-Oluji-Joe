import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Default admin PIN
const DEFAULT_PIN = '7892';

type AdminContextType = {
  isAdmin: boolean;
  validatePin: (pin: string) => Promise<boolean>;
  updatePin: (newPin: string) => Promise<boolean>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check for existing admin session on load
  useEffect(() => {
    const checkSession = () => {
      const adminSession = localStorage.getItem('adminSession');
      if (adminSession) {
        setIsAdmin(true);
      }
    };

    checkSession();
  }, []);

  // Validate the admin PIN
  const validatePin = async (pin: string): Promise<boolean> => {
    try {
      // First check if admin table exists and has PIN
      const { data, error } = await supabase
        .from('admin')
        .select('pin')
        .single();

      // If there's no admin record or we got an error, use default PIN
      if (error || !data) {
        // If PIN matches default PIN
        if (pin === DEFAULT_PIN) {
          // Create admin record with default PIN
          await supabase.from('admin').insert({ pin: DEFAULT_PIN });
          
          // Set admin session
          localStorage.setItem('adminSession', 'true');
          setIsAdmin(true);
          return true;
        }
        return false;
      }

      // If PIN matches stored PIN
      if (data.pin === pin) {
        localStorage.setItem('adminSession', 'true');
        setIsAdmin(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error validating PIN:', error);
      return false;
    }
  };

  // Update the admin PIN
  const updatePin = async (newPin: string): Promise<boolean> => {
    if (!isAdmin) return false;

    try {
      const { data } = await supabase
        .from('admin')
        .select('id')
        .single();

      if (data?.id) {
        const { error } = await supabase
          .from('admin')
          .update({ pin: newPin })
          .eq('id', data.id);

        return !error;
      } else {
        const { error } = await supabase
          .from('admin')
          .insert({ pin: newPin });

        return !error;
      }
    } catch (error) {
      console.error('Error updating PIN:', error);
      return false;
    }
  };

  // Logout from admin panel
  const logout = () => {
    localStorage.removeItem('adminSession');
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, validatePin, updatePin, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};