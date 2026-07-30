import { useState, useEffect } from "react";
import { UserContext } from "./userContext";

const STORAGE_KEY = "careercompass-user";
const TOKEN_KEY = "careercompass-token";

export function UserProvider({ children }) {
  const [user, setUserState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  function setUser(userData) {
    setUserState(userData);
  }

  function logout() {
    setUserState(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}