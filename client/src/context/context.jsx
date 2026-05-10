import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const name = "me";
  
  return <AuthContext.Provider value={name}>{children}</AuthContext.Provider>;
};
