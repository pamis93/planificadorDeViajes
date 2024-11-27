// import { createContext, useContext, useState } from "react";
// import { jwtDecode } from 'jwt-decode';

// export const UserContext = createContext();
// export const useUser = () => useContext(UserContext);
// export const UserProvider = ({ children }) => {

//   const [user, setUser] = useState(() => {
//     const session = JSON.parse(localStorage.getItem("session")) || null;

//     // No decodifiques el token inmediatamente al registrar
//     if (session?.token) {
//       try {
//         const decodedToken = jwtDecode(session.token);
//         return { ...session, id: decodedToken.id };
//       } catch (error) {
//         console.error("Error al decodificar el token:", error);
//         return null;
//       }
//     }
//     return null;
//   });

//   const enhancedSetUser = (v) => {
//     setUser(v);
//     localStorage.setItem("session", JSON.stringify(v));
//   };

//   return (
//     <UserContext.Provider value={[user, enhancedSetUser]}>
//       {children}
//     </UserContext.Provider>
//   );
// };
//asi estaba 

//asi lo dejo yo 
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id, // Añadir el id del usuario
      isAdmin: decoded.isAdmin, // Añadir el rol del usuario
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {

  // Inicializar el estado con el usuario guardado en localStorage
  const [user, setUser] = useState(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session && session.token) {
      const decoded = decodeToken(session.token); // Decodificar el token usando la función
      if (decoded) {
        return {
          ...session,
          ...decoded, // Añadir id y isAdmin al usuario
        };
      }
    }
    return null;
  });

  // Función para establecer el usuario en el estado y en localStorage
  const enhancedSetUser = (v) => {
    if (v && v.token) {
      const decoded = decodeToken(v.token); // Usar la función de decodificación
      if (decoded) {
        v = {
          ...v,
          ...decoded, // Añadir id y isAdmin al usuario
        };
      } else {
        v = null;
      }
    }

    setUser(v);
    localStorage.setItem("session", JSON.stringify(v));
  };

  return (
    <UserContext.Provider value={[user, enhancedSetUser]}>
      {children}
    </UserContext.Provider>
  );
};


