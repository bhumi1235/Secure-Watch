/**
 * Guard Service (Mock Backend)
 * Handles CRUD operations for guards.
 */

const STORAGE_KEY = 'guards';

const getStore = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const setStore = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const guardService = {
    getAll: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return getStore();
    },

    getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 200));
        const guards = getStore();
        return guards.find(g => g.id.toString() === id.toString()) || null;
    },

    create: async (guardData) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        const guards = getStore();
        const newGuard = {
            id: Date.now(),
            joinedAt: new Date().toISOString(),
            status: 'Active',
            ...guardData
        };

        guards.push(newGuard);
        setStore(guards);
        return newGuard;
    },

    update: async (id, updates) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const guards = getStore();
        const index = guards.findIndex(g => g.id.toString() === id.toString());

        if (index === -1) throw new Error("Guard not found");

        const updatedGuard = { ...guards[index], ...updates };
        guards[index] = updatedGuard;
        setStore(guards);
        return updatedGuard;
    },

    delete: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const guards = getStore();
        const filtered = guards.filter(g => g.id.toString() !== id.toString());
        setStore(filtered);
        return true;
    }
};
