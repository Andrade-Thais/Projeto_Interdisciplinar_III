import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { getToken } from "../../services/LoginDataService";
import { useUserType } from "../../contexts/auth/UserRoleContext";

const withAuthCheck = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setIsLoading } = useContext(AuthContext);
    const { setUserType } = useUserType();

    const setAuthState = (loggedIn, type) => {
      setIsLoggedIn(loggedIn);
      setUserType(type);
    };

    useEffect(() => {
      const checkToken = async () => {
        try {
          const tokenResponse = await getToken();
          console.log("Token response:", tokenResponse);
          if (!tokenResponse || !tokenResponse.token) {
            setAuthState(false, null);
            navigate("/auth/login");
          } else {
            console.log("Role:", tokenResponse.role);
            setAuthState(true, tokenResponse.role);
          }
        } catch (error) {
          console.error("Error checking token:", error);
          setAuthState(false, null);
          navigate("/auth/login");
        } finally {
          setIsLoading(false);
        }
      };

      checkToken();
    }, []);

    return <Component {...props} />;
  };
};

export default withAuthCheck;
