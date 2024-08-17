import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Redirecting from "../loading/Redirecting";

const RedirectPage = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  useEffect(() => {
    try {
      fetch(`http://localhost:8000/app/login-user/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.log("Ocorreu um erro: ", error);
    }
    navigate("/app/galerias");
  }, [navigate, email]);

  return <Redirecting />;
};

export default RedirectPage;
