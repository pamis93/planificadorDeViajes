// import { createContext, useContext, useState } from "react";

// export const UserContext = createContext();

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(
//         JSON.parse(localStorage.getItem("session")) || null
//     );
// console.log(user);

//     const enhancedSetUser = (v) => {
//         setUser(v);
//         localStorage.setItem("session", JSON.stringify(v));
//     };
//     return (
//         <UserContext.Provider value={[user, enhancedSetUser]}>
//             {children}
//         </UserContext.Provider>
//     );
// };

import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // Inicializar el estado con el usuario guardado en localStorage
    const [user, setUser] = useState(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session && session.token) {
            try {
                const decoded = jwtDecode(session.token); // Decodifica el token
                return {
                    ...session,
                    isAdmin: decoded.isAdmin, // Añadir el rol del usuario
                };
            } catch (error) {
                console.error("Error decoding token:", error);
                return null;
            }
        }
        return null;
    });

    // Función para establecer el usuario en el estado y en localStorage
    const enhancedSetUser = (v) => {
        if (v && v.token) {
            try {
                const decoded = jwtDecode(v.token); // Decodifica el token
                v = {
                    ...v,
                    isAdmin: decoded.isAdmin, // Añadir el rol del usuario
                };
            } catch (error) {
                console.error("Error decoding token:", error);
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


