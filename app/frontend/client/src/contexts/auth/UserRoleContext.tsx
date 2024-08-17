import React, { createContext, useContext, useState } from "react";

// Cria um contexto para o tipo de usuário
const UserTypeContext = createContext();

// Create um provider para o tipo de usuário
function UserTypeProvider({ children }) {
  const [userType, setUserType] = useState(null);

  // A prop value é o valor que será passado para os componentes que estão dentro do provider
  const value = { userType, setUserType };

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
}

// Cria um hook para usar o tipo de usuário
function useUserType() {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error("useUserType must be used within a UserTypeProvider");
  }
  return context;
}

export { UserTypeProvider, useUserType };
