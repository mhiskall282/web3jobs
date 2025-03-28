// src/services/authService.ts
import { AuthClient } from "@dfinity/auth-client";

// One day in nanoseconds
const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
    // Maximum authorization expiration is 8 days
    maxTimeToLive: days * hours * nanoseconds,
  },
};

export class AuthService {
  private static authClient: AuthClient | null = null;

  static async getAuthClient(): Promise<AuthClient> {
    if (!this.authClient) {
      this.authClient = await AuthClient.create(defaultOptions.createOptions);
    }
    return this.authClient;
  }

  static async isAuthenticated(): Promise<boolean> {
    const authClient = await this.getAuthClient();
    return authClient.isAuthenticated();
  }

  static async login(): Promise<void> {
    const authClient = await this.getAuthClient();
    return new Promise((resolve, reject) => {
      authClient.login({
        ...defaultOptions.loginOptions,
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      });
    });
  }

  static async logout(): Promise<void> {
    const authClient = await this.getAuthClient();
    await authClient.logout();
  }

  static async getIdentity() {
    const authClient = await this.getAuthClient();
    return authClient.getIdentity();
  }
}