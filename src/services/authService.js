/**
 * Auth Service (Mock Backend)
 * Handles user session, login, signup, and role management.
 */

const STORAGE_KEY = 'auth_session';
const USER_KEY = 'auth_user';

export const authService = {
    login: async (email, password) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!email || !password) {
            throw new Error("Credentials required");
        }

        // specific mock check (optional, or allow any for demo)
        if (password.length < 6) {
            throw new Error("Invalid credentials");
        }

        const session = { token: 'mock-jwt-token-' + Date.now(), expiry: Date.now() + 3600000 };
        const user = { name: 'Supervisor', email, role: 'Supervisor' };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        return user;
    },

    signup: async (name, email, password) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const user = { name, email, role: 'Supervisor' };
        const session = { token: 'mock-jwt-token-' + Date.now() };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        // Clear old data for fresh start
        localStorage.removeItem('guards');

        return user;
    },

    logout: async () => {
        localStorage.removeItem(STORAGE_KEY);
        // Optional: Keep user preference but clear session
        // localStorage.removeItem(USER_KEY); 
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem(STORAGE_KEY);
    }
};
