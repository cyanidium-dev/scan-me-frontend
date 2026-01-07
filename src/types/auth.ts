import { User, UserCredential } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;

  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyResetCode: (code: string) => Promise<string>;
  confirmResetPassword: (code: string, newPassword: string) => Promise<void>;
  updateProfile: (displayName?: string, photoURL?: string) => Promise<void>;
}
