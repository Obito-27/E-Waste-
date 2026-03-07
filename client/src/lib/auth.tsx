import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock checking session
  useEffect(() => {
    const storedUser = localStorage.getItem("ecocycle_mock_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    const mockUser: User = {
      uid: "mock-user-123",
      email: "eco.hero@example.com",
      displayName: "Eco Hero",
      photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=EcoHero&backgroundColor=10b981",
    };
    setUser(mockUser);
    localStorage.setItem("ecocycle_mock_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecocycle_mock_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
