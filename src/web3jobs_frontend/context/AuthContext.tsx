// src/context/AuthContext.tsx
import * as React from "react";
import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/authServices';
import { createActor } from '../../declarations/web3jobs_backend';
import { canisterId } from '../../declarations/web3jobs_backend';
import { Identity } from '@dfinity/agent';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: 'freelancer' | 'recruiter' | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkUserRole: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'freelancer' | 'recruiter' | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    const init = async () => {
      const authenticated = await AuthService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const identity = await AuthService.getIdentity();
        setIdentity(identity);
        await checkUserRole();
      }
    };
    
    init();
  }, []);

  const login = async () => {
    await AuthService.login();
    setIsAuthenticated(true);
    const identity = await AuthService.getIdentity();
    setIdentity(identity);
    await checkUserRole();
  };

  const logout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    setUserRole(null);
    setIdentity(null);
  };

  const checkUserRole = async () => {
    if (!identity) return;
  
    try {
      const actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });
  
      // Call your backend function
      const roleVariant = await actor.getMyRole(); // roleVariant can be null or { Freelancer: null } | { Recruiter: null }
  
      if (roleVariant) {
        if ("Freelancer" in roleVariant) {
          setUserRole("freelancer"); // Convert to string for simplicity
        } else if ("Recruiter" in roleVariant) {
          setUserRole("recruiter");
        } else {
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      setUserRole(null);
    }
  };
  
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, checkUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};