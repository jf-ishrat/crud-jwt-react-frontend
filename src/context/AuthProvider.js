import { useState, createContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser?.access_token) {
      console.log("user: ", currentUser);
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  const authHeader = () => {
    if (user && user.access_token) {
      return { Authorization: "Bearer " + user.access_token };
    } else {
      return {};
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
