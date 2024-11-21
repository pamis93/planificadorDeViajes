import { createContext, useContext, useState } from "react";
import { jwtDecode } from 'jwt-decode';


export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = JSON.parse(localStorage.getItem("session")) || null;

    // No decodifiques el token inmediatamente al registrar
    if (session?.token) {
      try {
        const decodedToken = jwtDecode(session.token);
        return { ...session, id: decodedToken.id };
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
      }
    }
    return session;
  });

  const enhancedSetUser = (v) => {
    setUser(v);
    localStorage.setItem("session", JSON.stringify(v));
  };

  return (
    <UserContext.Provider value={[user, enhancedSetUser]}>
      {children}
    </UserContext.Provider>
  );
};
