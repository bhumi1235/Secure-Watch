import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useToast } from './ToastContext'; // Use our new toast!

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        // Check session on mount
        const currentUser = authService.getCurrentUser();
        if (currentUser && authService.isAuthenticated()) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await authService.login(email, password);
            setUser(userData);
            toast.success(`Welcome back, ${userData.name}`);
            return true;
        } catch (err) {
            toast.error(err.message || 'Login failed');
            throw err;
        }
    };

    const signup = async (name, email) => {
        try {
            const userData = await authService.signup(name, email);
            setUser(userData);
            toast.success('Account created successfully');
            return true;
        } catch (err) {
            toast.error(err.message || 'Signup failed');
            throw err;
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        toast.info('Signed out successfully');
    };

    const value = {
        user,
        loading,
        login,
        logout,
        signup,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
