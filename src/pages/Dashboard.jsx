import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useGuards } from "../context/GuardContext";
import { useIncidents } from "../context/IncidentContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

export default function Dashboard() {
    const { guards, loading } = useGuards();
    const { incidents, getActiveIncidentsCount } = useIncidents();
    const [stats, setStats] = useState({ total: 0, active: 0, incidents: 0 });

    useEffect(() => {
        if (guards) {
            setStats({
                total: guards.length,
                active: guards.filter(g => g.status === "Active").length,
                incidents: getActiveIncidentsCount()
            });
        }
    }, [guards, incidents, getActiveIncidentsCount]);

    if (loading) {
        return (
            <div className="grid-3 animate-pulse">
                <div className="skeleton" style={{ height: '160px' }}></div>
                <div className="skeleton" style={{ height: '160px' }}></div>
                <div className="skeleton" style={{ height: '160px' }}></div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Header Section */}
            <div className="flex justify-between items-end mb-8 animate-fade-in" style={{ alignItems: 'flex-end' }}>
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Command Center</h2>
                    <p className="text-slate-500 mt-1">Overview of your security operations.</p>
                </div>
                <Link to="/add-guard">
                    <Button size="lg" className="shadow-lg shadow-blue-500/30">
                        + Add Guard
                    </Button>
                </Link>
            </div>

            {/* Stats Grid with Staggered Animation */}
            <div className="grid-3" style={{ marginBottom: '3rem' }}>
                <Card className="stat-card animate-slide-up" style={{ animationDelay: '0.1s', borderLeft: '4px solid #3b82f6', padding: '2rem' }}>
                    <div className="flex justify-between items-start">
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                                color: '#64748b',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '0.75rem'
                            }}>
                                Total Personnel
                            </div>
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                lineHeight: 1,
                                marginBottom: '0.75rem'
                            }}>
                                {stats.total}
                            </div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.375rem 0.75rem',
                                backgroundColor: '#f0fdf4',
                                color: '#15803d',
                                borderRadius: '6px',
                                fontSize: '0.8125rem',
                                fontWeight: 600
                            }}>
                                <span>↑ 12%</span>
                                <span style={{ color: '#22c55e' }}>•</span>
                                <span style={{ fontWeight: 500 }}>vs last month</span>
                            </div>
                        </div>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#eff6ff',
                            borderRadius: '12px',
                            fontSize: '2rem'
                        }}>
                            👥
                        </div>
                    </div>
                </Card>

                <Card className="stat-card animate-slide-up" style={{ animationDelay: '0.2s', borderLeft: '4px solid #10b981', padding: '2rem' }}>
                    <div className="flex justify-between items-start">
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                                color: '#64748b',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '0.75rem'
                            }}>
                                Active Duty
                            </div>
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                lineHeight: 1,
                                marginBottom: '0.75rem'
                            }}>
                                {stats.active}
                            </div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.375rem 0.75rem',
                                backgroundColor: '#f0fdf4',
                                color: '#15803d',
                                borderRadius: '6px',
                                fontSize: '0.8125rem',
                                fontWeight: 600
                            }}>
                                <span style={{ color: '#22c55e' }}>●</span>
                                <span>All posts covered</span>
                            </div>
                        </div>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#f0fdf4',
                            borderRadius: '12px',
                            fontSize: '2rem'
                        }}>
                            🛡️
                        </div>
                    </div>
                </Card>

                <Card className="stat-card animate-slide-up" style={{ animationDelay: '0.3s', borderLeft: '4px solid #f59e0b', padding: '2rem' }}>
                    <div className="flex justify-between items-start">
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '0.8125rem',
                                fontWeight: 700,
                                color: '#64748b',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '0.75rem'
                            }}>
                                Active Incidents
                            </div>
                            <div style={{
                                fontSize: '3rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                lineHeight: 1,
                                marginBottom: '0.75rem'
                            }}>
                                {stats.incidents}
                            </div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                padding: '0.375rem 0.75rem',
                                backgroundColor: stats.incidents > 0 ? '#fef3c7' : '#f0fdf4',
                                color: stats.incidents > 0 ? '#b45309' : '#15803d',
                                borderRadius: '6px',
                                fontSize: '0.8125rem',
                                fontWeight: 600
                            }}>
                                <span style={{ color: stats.incidents > 0 ? '#f59e0b' : '#22c55e' }}>●</span>
                                <span>{stats.incidents > 0 ? 'Needs attention' : 'All clear'}</span>
                            </div>
                        </div>
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#fef3c7',
                            borderRadius: '12px',
                            fontSize: '2rem'
                        }}>
                            ⚠️
                        </div>
                    </div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }}>

                {/* Live Feed */}
                <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                        <div>
                            <h3 className="text-lg font-bold" style={{ marginBottom: '0.25rem' }}>Recent Incidents</h3>
                            <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                                Latest security alerts and reports
                            </p>
                        </div>
                        <Link to="/incidents">
                            <button
                                className="btn-icon"
                                style={{
                                    padding: '0.5rem',
                                    backgroundColor: '#eff6ff',
                                    border: '1px solid #bfdbfe',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span style={{ fontSize: '1rem' }}>→</span>
                            </button>
                        </Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {incidents.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: '#94a3b8',
                                backgroundColor: '#f8fafc',
                                borderRadius: '8px'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                                <p style={{ margin: 0, fontSize: '0.875rem' }}>No recent incidents</p>
                            </div>
                        ) : (
                            incidents.slice(0, 5).map((incident) => {
                                const getTypeIcon = (type) => {
                                    const icons = { incident: '⚠️', report: '📝', alert: '🔔' };
                                    return icons[type] || '📋';
                                };

                                const getSeverityColor = (severity) => {
                                    const colors = {
                                        low: { bg: '#f0fdf4', border: '#22c55e', iconBg: '#dcfce7' },
                                        medium: { bg: '#fef3c7', border: '#f59e0b', iconBg: '#fde68a' },
                                        high: { bg: '#fee2e2', border: '#ef4444', iconBg: '#fecaca' },
                                        critical: { bg: '#fce7f3', border: '#ec4899', iconBg: '#fbcfe8' }
                                    };
                                    return colors[severity] || colors.medium;
                                };

                                const formatTimeAgo = (timestamp) => {
                                    const now = new Date();
                                    const past = new Date(timestamp);
                                    const diffMs = now - past;
                                    const diffMins = Math.floor(diffMs / 60000);
                                    const diffHours = Math.floor(diffMs / 3600000);

                                    if (diffMins < 1) return 'Just now';
                                    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
                                    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                                    return past.toLocaleDateString();
                                };

                                const colors = getSeverityColor(incident.severity);

                                return (
                                    <Link
                                        key={incident.id}
                                        to="/incidents"
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <div
                                            className="activity-item"
                                            style={{
                                                display: 'flex',
                                                gap: '0.75rem',
                                                padding: '1rem',
                                                border: '1px solid #e5e7eb',
                                                borderLeft: `3px solid ${colors.border}`,
                                                borderRadius: '0.5rem',
                                                backgroundColor: colors.bg,
                                                transition: 'all 0.2s ease',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <div style={{
                                                width: '2.5rem',
                                                height: '2.5rem',
                                                borderRadius: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                backgroundColor: colors.iconBg,
                                                fontSize: '1.125rem'
                                            }}>
                                                {getTypeIcon(incident.type)}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h4 style={{
                                                    fontWeight: 600,
                                                    color: '#1e293b',
                                                    marginBottom: '0.25rem',
                                                    fontSize: '0.9375rem',
                                                    lineHeight: '1.25rem'
                                                }}>
                                                    {incident.title}
                                                </h4>
                                                <p style={{
                                                    fontSize: '0.8125rem',
                                                    color: '#64748b',
                                                    lineHeight: '1.25rem',
                                                    margin: 0
                                                }}>
                                                    {incident.location} • {formatTimeAgo(incident.createdAt)}
                                                </p>
                                            </div>
                                            {incident.status === 'active' && (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    color: '#f59e0b'
                                                }}>
                                                    ●
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>

                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                        <Link to="/notifications">
                            <button style={{
                                width: '100%',
                                padding: '0.625rem 1rem',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#3b82f6',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#eff6ff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <span>View All Activity</span>
                                <span style={{ fontSize: '1rem' }}>→</span>
                            </button>
                        </Link>
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="flex flex-col gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
                        <h3 className="text-white mb-2">Quick Actions</h3>
                        <p className="text-slate-400 text-sm mb-6">Common tasks for supervisors</p>

                        <div className="flex flex-col gap-3">
                            <Link to="/schedule">
                                <Button variant="secondary" className="w-full justify-between bg-white/10 border-white/10 text-white hover:bg-white/20 hover:text-white">
                                    <span>📅 View Schedule</span>
                                    <span>→</span>
                                </Button>
                            </Link>
                            <Link to="/guards">
                                <Button variant="secondary" className="w-full justify-between bg-white/10 border-white/10 text-white hover:bg-white/20 hover:text-white">
                                    <span>👮 Manage Roster</span>
                                    <span>→</span>
                                </Button>
                            </Link>
                            <Link to="/incidents">
                                <Button variant="secondary" className="w-full justify-between bg-white/10 border-white/10 text-white hover:bg-white/20 hover:text-white">
                                    <span>⚠️ Report Issue</span>
                                    <span>→</span>
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>

            <style jsx>{`
                .animate-slide-up {
                    animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .space-y-6 > * + * { margin-top: 1.5rem; }
            `}</style>
        </div>
    );
}
