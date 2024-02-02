import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextProps {
    loggedIn: boolean;
    loggedInUserName: string;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setLoggedInUserName: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthProvider: React.FC = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loggedInUserName, setLoggedInUserName] = useState<string>('');

    useEffect(() => {
        const token = sessionStorage.getItem('jwt')
        const userName = sessionStorage.getItem('username')

        if(token) {
            setLoggedIn(true);
        }

        if (userName) {
            setLoggedInUserName(userName)
        }
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, loggedInUserName, setLoggedIn, setLoggedInUserName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
