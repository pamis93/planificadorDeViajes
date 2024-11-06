import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("session")) || null
    );
console.log(user);

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

