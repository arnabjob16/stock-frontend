import { createContext } from "react";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (userData: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
