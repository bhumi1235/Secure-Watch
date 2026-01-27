import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Lazy Load Pages for Performance
const Landing = React.lazy(() => import('../pages/Landing'));
const Login = React.lazy(() => import('../pages/Login'));
const Signup = React.lazy(() => import('../pages/Signup'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const GuardsList = React.lazy(() => import('../pages/GuardsList'));
const AddGuard = React.lazy(() => import('../pages/AddGuard'));
const GuardDetail = React.lazy(() => import('../pages/GuardDetail'));
const Notifications = React.lazy(() => import('../pages/Notifications'));
const Schedule = React.lazy(() => import('../pages/Schedule'));
const Incidents = React.lazy(() => import('../pages/Incidents'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

// Loading Suspense Fallback
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="spinner spin" style={{ width: '40px', height: '40px', borderTopColor: 'var(--primary)' }}></div>
        <style jsx>{`
      .spinner {
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
    </div>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/guards" element={<ProtectedRoute><GuardsList /></ProtectedRoute>} />
                <Route path="/guards/:id" element={<ProtectedRoute><GuardDetail /></ProtectedRoute>} />
                <Route path="/add-guard" element={<ProtectedRoute><AddGuard /></ProtectedRoute>} />
                <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
                <Route path="/incidents" element={<ProtectedRoute><Incidents /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
