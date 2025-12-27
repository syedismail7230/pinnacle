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
}

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string, role: 'admin' | 'user', referralCode?: string, registrationData?: any) => void;
  completeProfile: (details: { name: string; email: string; companyName: string; userType: UserType }) => void;
  logout: () => void;
  addCredits: (amount: number) => void;
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
    // If user exists in local storage (simulated DB), load them
    const existingUserStr = localStorage.getItem(`user_${phoneNumber}`);
    
    if (existingUserStr) {
        const existingUser = JSON.parse(existingUserStr);
        // If we have new registration data during a login (which shouldn't happen for existing, but strictly speaking)
        // We'll just load the existing user.
        setUser(existingUser);
        localStorage.setItem('user', JSON.stringify(existingUser));
    } else {
        // Create a new user
        // We default isProfileComplete to true as we removed the onboarding page.
        // If registrationData is missing (Sign In flow for new user), we use defaults.
        
        const newUser: User = { 
            name: registrationData?.name || 'User', 
            email: registrationData?.email || '',
            companyName: registrationData?.companyName || '',
            userType: registrationData?.userType || 'Individual',
            role, 
            phoneNumber,
            credits: 5, // 5 credits for signup
            referralCode: generateReferralCode(),
            isProfileComplete: true
        };
        
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem(`user_${phoneNumber}`, JSON.stringify(newUser)); // Save to "DB"
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
        localStorage.setItem(`user_${user.phoneNumber}`, JSON.stringify(updatedUser)); // Save to "DB"
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

  return (
    <AuthContext.Provider value={{ user, login, completeProfile, logout, addCredits, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};