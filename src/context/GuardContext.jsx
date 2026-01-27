import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { guardService } from '../services/guardService';
import { useToast } from './ToastContext';

const GuardContext = createContext();

export const useGuards = () => useContext(GuardContext);

export const GuardProvider = ({ children }) => {
    const [guards, setGuards] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const fetchGuards = useCallback(async () => {
        setLoading(true);
        try {
            const data = await guardService.getAll();
            setGuards(data);
        } catch (err) {
            toast.error("Failed to load guards");
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchGuards();
    }, [fetchGuards]);

    const addGuard = async (guardData) => {
        try {
            const newGuard = await guardService.create(guardData);
            setGuards(prev => [...prev, newGuard]);
            toast.success("Guard added successfully");
            return newGuard;
        } catch (err) {
            toast.error("Failed to add guard");
            throw err;
        }
    };

    const updateGuard = async (id, updates) => {
        try {
            const updated = await guardService.update(id, updates);
            setGuards(prev => prev.map(g => g.id === id ? updated : g));
            toast.success("Guard profile updated");
            return updated;
        } catch (err) {
            toast.error("Failed to update guard");
            throw err;
        }
    };

    const removeGuard = async (id) => {
        try {
            await guardService.delete(id);
            setGuards(prev => prev.filter(g => g.id !== id));
            toast.info("Guard removed from roster");
        } catch (err) {
            toast.error("Failed to remove guard");
            throw err;
        }
    };

    const getGuardById = (id) => {
        return guards.find(g => g.id.toString() === id.toString());
    };

    const value = {
        guards,
        loading,
        addGuard,
        updateGuard,
        removeGuard,
        getGuardById,
        fetchGuards // expose for manual refresh if needed
    };

    return (
        <GuardContext.Provider value={value}>
            {children}
        </GuardContext.Provider>
    );
};
