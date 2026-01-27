import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{"name": "Supervisor"}');

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h2 style={{ color: 'white', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🛡️ SecureWatch
                </h2>
            </div>

            <nav style={{ flex: 1, padding: '1rem 0' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span>📊</span> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/guards" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span>👮</span> Security Guards
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/schedule" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span>📅</span> Shift Schedule
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/incidents" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span>⚠️</span> Incident Reports
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/notifications" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span>🔔</span> Notifications
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'var(--primary)', color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                    }}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Supervisor</div>
                    </div>
                </div>
                <button onClick={handleLogout} className="btn w-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
