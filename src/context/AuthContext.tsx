import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://api-dev.quicklyinc.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (data.success && data.token) {
        // set token as authToken in local storage in browser
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    // once user clicks logout, remove authToken from local storage, thereby, removing the stored token and clearing browser application storage
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
