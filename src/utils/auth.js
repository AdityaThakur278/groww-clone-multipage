import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    function signin({ userName, password }) {
        setUser({
        userName,
        email: "",
        password,
        });
    }

    function signup({ userName, email, password }) {
        setUser({
            userName,
            email,
            password,
        });
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
