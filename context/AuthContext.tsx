import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'Individual' | 'Business' | 'CA';

export interface User {
  name: string;
  email: string;
  companyName?: string;
  userType: UserType;
  role: 'admin' | 'user';
  phoneNumber: string;
  credits: number;
  referralCode: string;
  isProfileComplete: boolean;
  connectedGSTINs: { id: number; gstin: string; name: string }[];
}

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string, role: 'admin' | 'user', referralCode?: string, registrationData?: any) => void;
  completeProfile: (details: { name: string; email: string; companyName: string; userType: UserType }) => void;
  logout: () => void;
  addCredits: (amount: number) => void;
  deductCredits: (amount: number) => boolean;
  connectGSTIN: (gstin: string, name: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const generateReferralCode = () => {
    return 'PIN-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const login = (phoneNumber: string, role: 'admin' | 'user', referralCode?: string, registrationData?: any) => {
    const existingUserStr = localStorage.getItem(`user_${phoneNumber}`);
    
    if (existingUserStr) {
        const existingUser = JSON.parse(existingUserStr);
        setUser(existingUser);
        localStorage.setItem('user', JSON.stringify(existingUser));
    } else {
        const newUser: User = { 
            name: registrationData?.name || 'User', 
            email: registrationData?.email || '',
            companyName: registrationData?.companyName || '',
            userType: registrationData?.userType || 'Individual',
            role, 
            phoneNumber,
            credits: 5, // 5 credits for signup
            referralCode: generateReferralCode(),
            isProfileComplete: true,
            connectedGSTINs: [] // Initialize empty
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem(`user_${phoneNumber}`, JSON.stringify(newUser)); 
    }
  };

  const completeProfile = (details: { name: string; email: string; companyName: string; userType: UserType }) => {
    if (user) {
        const updatedUser = { 
            ...user, 
            ...details, 
            isProfileComplete: true 
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        localStorage.setItem(`user_${user.phoneNumber}`, JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addCredits = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, credits: user.credits + amount };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem(`user_${user.phoneNumber}`, JSON.stringify(updatedUser));
    }
  };

  const deductCredits = (amount: number): boolean => {
      if (user && user.credits >= amount) {
          const updatedUser = { ...user, credits: user.credits - amount };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          localStorage.setItem(`user_${user.phoneNumber}`, JSON.stringify(updatedUser));
          return true;
      }
      return false;
  };

  const connectGSTIN = (gstin: string, name: string) => {
      if (user) {
          const newGSTIN = { id: Date.now(), gstin, name };
          const updatedUser = { 
              ...user, 
              connectedGSTINs: [...(user.connectedGSTINs || []), newGSTIN] 
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          localStorage.setItem(`user_${user.phoneNumber}`, JSON.stringify(updatedUser));
      }
  };

  return (
    <AuthContext.Provider value={{ user, login, completeProfile, logout, addCredits, deductCredits, connectGSTIN, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};