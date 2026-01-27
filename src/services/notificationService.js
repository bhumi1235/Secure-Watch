/**
 * Notification Service
 * Manages system alerts and activity logs.
 */

const LOGS_KEY = 'activity_logs';

// Mock initial data
const MOCK_NOTIFICATIONS = [
    { id: 1, text: "Guard #102 shift updated", time: "2 hours ago", type: "info" },
    { id: 2, text: "New guard added to system", time: "5 hours ago", type: "success" },
    { id: 3, text: "Night shift alert generated", time: "1 day ago", type: "warning" },
];

export const notificationService = {
    getNotifications: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_NOTIFICATIONS;
    },

    logActivity: (action, details) => {
        const logs = JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
        const newLog = {
            id: Date.now(),
            action,
            details,
            timestamp: new Date().toISOString()
        };
        logs.unshift(newLog);
        // Keep only last 50 logs
        if (logs.length > 50) logs.pop();
        localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    },

    getRecentActivity: () => {
        return JSON.parse(localStorage.getItem(LOGS_KEY) || '[]');
    }
};
