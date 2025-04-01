import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { createActor as createBackendActor } from "../../../declarations/web3jobs_backend";

// One day in nanoseconds
const ONE_DAY_NS = BigInt(86400000000000);

// Get the correct Internet Identity URL based on environment
const getIdentityProviderUrl = () => {
  const network = process.env.DFX_NETWORK || "local";
  const canisterId = process.env.CANISTER_ID_INTERNET_IDENTITY;
  
  if (network === "ic") {
    return "https://identity.ic0.app";
  } else {
    return `http://${canisterId}.localhost:4943`;
  }
};

// Create an auth client instance
export const createAuthClient = async () => {
  return await AuthClient.create({
    idleOptions: {
      disableIdle: false,
      idleTimeout: 1000 * 60 * 30, // 30 minutes
    },
  });
};

// Login with Internet Identity
export const login = async (authClient, onSuccess) => {
  await authClient.login({
    identityProvider: getIdentityProviderUrl(),
    maxTimeToLive: ONE_DAY_NS,
    onSuccess: onSuccess,
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// Logout
export const logout = async (authClient) => {
  await authClient.logout();
  window.location.href = "/";
};

// Create backend actor with identity
export const createBackendWithIdentity = async (authClient) => {
  const identity = authClient.getIdentity();
  
  const agent = new HttpAgent({ 
    identity,
    host: process.env.DFX_NETWORK === 'ic' 
      ? 'https://icp0.io' 
      : 'http://localhost:4943'
  });

  if (process.env.DFX_NETWORK !== "ic") {
    try {
      await agent.fetchRootKey();
      console.log("Root key fetched successfully");
    } catch (error) {
      console.error("Failed to fetch root key:", error);
      throw new Error("Local replica unavailable. Start with: dfx start");
    }
  }
  
  // Make sure this matches your canister ID environment variable name
  const canisterId = process.env.CANISTER_ID_WEB3JOBS_BACKEND;
  
  if (!canisterId) {
    console.error("Canister ID is undefined. Check your environment variables.");
    throw new Error("Canister ID is undefined");
  }
  
  return createBackendActor(canisterId, { agent });
};