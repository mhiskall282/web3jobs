import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createAuthClient, login, logout, createBackendWithIdentity } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a ref to track initialization
  const isInitialized = useRef(false);

  // Helper function to unwrap optional values from Candid
  const unwrapOptional = (optionalValue) => {
    if (Array.isArray(optionalValue) && optionalValue.length > 0) {
      return optionalValue[0];
    }
    return null;
  };

  // Initialize auth client
  useEffect(() => {
    const init = async () => {
      if (isInitialized.current) return;
      isInitialized.current = true;
      
      try {
        console.log("Initializing auth client...");
        const client = await createAuthClient();
        setAuthClient(client);
        
        const isLoggedIn = await client.isAuthenticated();
        console.log("Is authenticated:", isLoggedIn);
        setIsAuthenticated(isLoggedIn);
        
        if (isLoggedIn) {
          const identity = client.getIdentity();
          setIdentity(identity);
          setPrincipal(identity.getPrincipal());
          
          try {
            console.log("Creating backend actor...");
            const actor = await createBackendWithIdentity(client);
            setBackendActor(actor);
            
            // Verify actor has getProfile method
            if (actor && typeof actor.getProfile === 'function') {
              console.log("Fetching user profile...");
              try {
                const profileResult = await actor.getProfile();
                console.log("Profile received:", profileResult);
                
                // Handle the optional type correctly
                const profile = unwrapOptional(profileResult);
                setUserProfile(profile);
              } catch (profileError) {
                console.error("Error fetching profile:", profileError);
              }
            } else {
              console.error("Actor missing getProfile method");
            }
          } catch (actorError) {
            console.error("Error creating actor:", actorError);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
      }
    };
    
    init();
  }, []);
  
  // Login function
  const handleLogin = async () => {
    if (!authClient) {
      console.error("Auth client not initialized");
      return;
    }
    
    await login(authClient, async () => {
      console.log("Login successful");
      setIsAuthenticated(true);
      const identity = authClient.getIdentity();
      setIdentity(identity);
      setPrincipal(identity.getPrincipal());
      
      try {
        console.log("Creating backend actor after login...");
        const actor = await createBackendWithIdentity(authClient);
        setBackendActor(actor);
        
        // Verify actor has getProfile method
        if (actor && typeof actor.getProfile === 'function') {
          console.log("Fetching user profile after login...");
          try {
            const profileResult = await actor.getProfile();
            console.log("Profile received after login:", profileResult);
            
            // Handle the optional type correctly
            const profile = unwrapOptional(profileResult);
            setUserProfile(profile);
          } catch (profileError) {
            console.error("Error fetching profile after login:", profileError);
          }
        } else {
          console.error("Actor missing getProfile method after login");
          
          // Debug: Try calling whoami to verify authentication
          if (actor && typeof actor.whoami === 'function') {
            try {
              const principal = await actor.whoami();
              console.log("Whoami result:", principal.toString());
            } catch (whoamiError) {
              console.error("Error calling whoami:", whoamiError);
            }
          }
        }
      } catch (actorError) {
        console.error("Error creating actor after login:", actorError);
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
  const refreshProfile = async () => {
    if (!backendActor || typeof backendActor.getProfile !== 'function') {
      console.error("Cannot refresh profile: actor or getProfile method not available");
      return;
    }
    
    try {
      const profileResult = await backendActor.getProfile();
      // Handle the optional type correctly
      const profile = unwrapOptional(profileResult);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error refreshing profile:", error);
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
    unwrapOptional // Export the helper function for use in other components
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