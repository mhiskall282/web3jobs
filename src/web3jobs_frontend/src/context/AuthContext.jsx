import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createAuthClient, login, logout, createBackendWithIdentity } from '../services/authService';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext(null);

const convertMotokoRole = (roleObject) => {
  if (roleObject?.hasOwnProperty('Freelancer')) return 'Freelancer';
  if (roleObject?.hasOwnProperty('Recruiter')) return 'Recruiter';
  return null;
};

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isInitialized = useRef(false);

  const unwrapOptional = (optionalValue) => {
    if (Array.isArray(optionalValue) && optionalValue.length > 0) return optionalValue[0];
    return null;
  };

  const fetchUserProfile = async (actor) => {
    try {
      const profileResult = await actor.getProfile();
      const rawProfile = unwrapOptional(profileResult);

      if (!rawProfile) {
        setUserProfile(null);
        return null;
      }

      const processedProfile = {
        ...rawProfile,
        role: convertMotokoRole(rawProfile.role)
      };
      setUserProfile(processedProfile);
      return processedProfile;
    } catch (error) {
      console.error("Profile fetch error:", error);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      if (isInitialized.current) return;
      isInitialized.current = true;

      try {
        const client = await createAuthClient();
        setAuthClient(client);
        const isLoggedIn = await client.isAuthenticated();
        setIsAuthenticated(isLoggedIn);

        if (isLoggedIn) {
          const identity = client.getIdentity();
          setIdentity(identity);
          setPrincipal(identity.getPrincipal());

          const actor = await createBackendWithIdentity(client);
          setBackendActor(actor);

          const profile = await fetchUserProfile(actor);
          if (!profile) navigate('/create-profile');
        }
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [navigate]);

  const handleLogin = async () => {
    if (!authClient) return;

    await login(authClient, async () => {
      setIsAuthenticated(true);
      const identity = authClient.getIdentity();
      setIdentity(identity);
      setPrincipal(identity.getPrincipal());

      try {
        const actor = await createBackendWithIdentity(authClient);
        setBackendActor(actor);
        const profile = await fetchUserProfile(actor);

        if (!profile) {
          navigate('/create-profile');
        } else {
          navigate(profile.role === 'Freelancer'
            ? '/freelancer-dashboard'
            : '/recruiter-dashboard');
        }
      } catch (error) {
        console.error("Post-login error:", error);
        navigate('/create-profile');
      }
    });
  };

  // Logout function
  const handleLogout = async () => {
    if (!authClient) return;

    await logout(authClient);
    setIsAuthenticated(false);
    setIdentity(null);
    setPrincipal(null);
    setBackendActor(null);
    setUserProfile(null);
  };

  // Profile refresh function
  // const refreshProfile = async () => {
  //   if (!backendActor || typeof backendActor.getProfile !== 'function') {
  //     console.error("Cannot refresh profile: actor or getProfile method not available");
  //     return;
  //   }

  //   try {
  //     const profileResult = await backendActor.getProfile();
  //     // Handle the optional type correctly and convert role
  //     const profile = unwrapOptional(profileResult);
  //     if (profile) {
  //       profile.role = convertMotokoRole(profile.role);
  //     }
  //     setUserProfile(profile);
  //   } catch (error) {
  //     console.error("Error refreshing profile:", error);
  //   }
  // };
  const refreshProfile = async () => {
    if (!backendActor) {
      console.error("No backend actor available");
      return;
    }
  
    try {
      console.log("Refreshing profile...");
      const profileResult = await backendActor.getProfile();
      console.log("Raw profile result:", profileResult);
      
      const rawProfile = unwrapOptional(profileResult);
      console.log("Unwrapped profile:", rawProfile);
  
      if (rawProfile) {
        const processedProfile = {
          ...rawProfile,
          role: convertMotokoRole(rawProfile.role),
          isComplete: rawProfile.isComplete
        };
        console.log("Setting processed profile:", processedProfile);
        setUserProfile(processedProfile);
        return processedProfile;
      }
      return null;
    } catch (error) {
      console.error("Profile refresh error:", error);
      throw error;
    }
  };
  


  const value = {
    authClient,
    isAuthenticated,
    identity,
    principal,
    backendActor,
    userProfile,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    refreshProfile,
    setUserProfile,
    unwrapOptional,
    convertMotokoRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
