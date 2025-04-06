import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TUser } from "shared/types/user";
import { fetchAPI } from "../utils/api";

interface AuthContextType {
  user: TUser | null;
  loading: boolean;
  refreshUser: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the current authenticated user from the backend.
  const refreshUser = async () => {
    try {
      // Since our user route is protected via passport, if not logged in this call should fail.
      const res = await fetchAPI("user", "GET");
      setUser(res as TUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = async () => {
    await fetchAPI("auth/logout", "POST");
    setUser(null);
    window.location.href = "/unlogged-home";
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};