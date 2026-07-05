import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => ({

        user_id: localStorage.getItem("user_id"),

        username: localStorage.getItem("username"),

        email: localStorage.getItem("email")

    }));

    function login(userData) {

        localStorage.setItem("user_id", userData.user_id);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("email", userData.email);

        setUser(userData);

    }

    function logout() {

        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}