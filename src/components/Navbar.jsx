import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar animate-fade-in">
      <div className="container flex justify-between items-center" style={{ padding: '0.5rem 0', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Brand */}
        <Link to="/" className="nav-brand flex items-center gap-2">
          <span style={{ fontSize: '1.75rem' }}>🛡️</span>
          <span style={{ fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>SecureWatch</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', margin: '0 0.5rem' }}></div>
              <Link to="/login" className="text-white hover:text-white/80 font-medium">Log In</Link>
              <Link to="/signup">
                <Button variant="secondary" size="sm">Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
              <NavLink to="/guards" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Roster</NavLink>
              <NavLink to="/schedule" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Schedule</NavLink>
              <NavLink to="/incidents" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Incidents</NavLink>

              <div style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <NavLink to="/notifications" className="btn-icon" style={{ color: 'white', position: 'relative' }}>
                  🔔
                  <span style={{ position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
                </NavLink>

                <div className="flex items-center gap-2 pl-4 border-l border-white/20">
                  <div style={{ width: '32px', height: '32px', background: 'white', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {user?.name.charAt(0)}
                  </div>
                  <button onClick={handleLogout} className="text-sm" style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
            background-color: var(--accent);
            color: white;
            padding: 0 2rem;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .nav-link {
            color: rgba(255,255,255,0.7);
            font-weight: 500;
            padding: 0.5rem 0;
            position: relative;
            transition: all 0.2s;
        }
        .nav-link:hover {
            color: white;
        }
        .nav-link.active {
            color: white;
        }
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary);
            border-radius: 2px;
        }
      `}</style>
    </nav>
  );
}
