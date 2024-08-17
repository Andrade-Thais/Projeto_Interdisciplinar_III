import { createContext, useEffect, useState } from "react";
import { useUserType } from "./UserRoleContext";
import { getToken } from "../../services/LoginDataService";
import Loading from "../../ui/loading/Loading";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setUserType } = useUserType();
  const navigate = useNavigate();

  const setAuthState = async (isLoggedIn, userType) => {
    setIsLoggedIn(isLoggedIn);
    setUserType(userType);
  };

  const logout = () => {
    const removeTokenFromCookie = async () => {
      const response = await fetch("http://localhost:8000/app/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setAuthState(false, "");
      }
    };
    removeTokenFromCookie();
    setAuthState(false, "");
    navigate("/auth/login");
  };

  useEffect(() => {
    const checkToken = async () => {
      if (window.location.href.includes("app")) {
        try {
          const tokenResponse = await getToken();
          if (!tokenResponse.token) {
            setIsLoggedIn(false);
            navigate("/auth/login");
          } else {
            setAuthState(true, tokenResponse.role);
          }
        } catch (error) {
          console.error("Error checking token:", error);
          setIsLoggedIn(false);
          navigate("/auth/login");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        window.location.href;
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
