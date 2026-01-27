import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import IncidentDetailModal from '../components/IncidentDetailModal';

export default function Notifications() {
    const { incidents } = useIncidents();
    const [filter, setFilter] = useState('all');
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [dismissedIds, setDismissedIds] = useState([]);

    const handleDismiss = (e, incidentId) => {
        e.stopPropagation();
        setDismissedIds(prev => [...prev, incidentId]);
    };

    const filteredIncidents = (filter === 'all'
        ? incidents
        : filter === 'incident' || filter === 'report' || filter === 'alert'
            ? incidents.filter(inc => inc.type === filter)
            : incidents)
        .filter(inc => inc.status !== 'resolved') // Auto-dismiss resolved incidents
        .filter(inc => !dismissedIds.includes(inc.id));

    const getTypeIcon = (type) => {
        const icons = { incident: '⚠️', report: '📝', alert: '🔔' };
        return icons[type] || '📋';
    };

    const getSeverityColor = (severity) => {
        const colors = {
            low: { bg: '#f0fdf4', text: '#15803d', border: '#22c55e' },
            medium: { bg: '#fef3c7', text: '#b45309', border: '#f59e0b' },
            high: { bg: '#fee2e2', text: '#b91c1c', border: '#ef4444' },
            critical: { bg: '#fce7f3', text: '#be185d', border: '#ec4899' }
        };
        return colors[severity] || colors.medium;
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return past.toLocaleDateString();
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                        Notifications
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>
                        Recent alerts and system updates
                    </p>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    <strong>{filteredIncidents.length}</strong> notification{filteredIncidents.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginBottom: '2rem',
                flexWrap: 'wrap'
            }}>
                {[
                    { key: 'all', label: 'All', count: incidents.filter(inc => inc.status !== 'resolved' && !dismissedIds.includes(inc.id)).length },
                    { key: 'incident', label: 'Incidents', count: incidents.filter(inc => inc.type === 'incident' && inc.status !== 'resolved' && !dismissedIds.includes(inc.id)).length },
                    { key: 'report', label: 'Reports', count: incidents.filter(inc => inc.type === 'report' && inc.status !== 'resolved' && !dismissedIds.includes(inc.id)).length },
                    { key: 'alert', label: 'Alerts', count: incidents.filter(inc => inc.type === 'alert' && inc.status !== 'resolved' && !dismissedIds.includes(inc.id)).length }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className="tab-button"
                        style={{
                            padding: '0.625rem 1.25rem',
                            borderRadius: '8px',
                            border: filter === tab.key ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                            backgroundColor: filter === tab.key ? '#eff6ff' : '#ffffff',
                            color: filter === tab.key ? '#3b82f6' : '#64748b',
                            fontWeight: filter === tab.key ? 600 : 500,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <span>{tab.label}</span>
                        <span style={{
                            padding: '0.125rem 0.5rem',
                            borderRadius: '12px',
                            backgroundColor: filter === tab.key ? '#3b82f6' : '#e2e8f0',
                            color: filter === tab.key ? '#ffffff' : '#64748b',
                            fontSize: '0.75rem',
                            fontWeight: 700
                        }}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Notifications List */}
            <div className="card" style={{ padding: 0 }}>
                {filteredIncidents.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                        <h3 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>All caught up!</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No new notifications</p>
                    </div>
                ) : (
                    filteredIncidents.map((incident, index) => {
                        const severityColors = getSeverityColor(incident.severity);

                        return (
                            <div
                                key={incident.id}
                                className="notification-item"
                                onClick={() => setSelectedIncident(incident)}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    borderBottom: index < filteredIncidents.length - 1 ? '1px solid #f1f5f9' : 'none',
                                    alignItems: 'flex-start',
                                    transition: 'background-color 0.2s',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    borderRadius: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    backgroundColor: severityColors.bg,
                                    fontSize: '1.125rem'
                                }}>
                                    {getTypeIcon(incident.type)}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontWeight: 600,
                                        color: '#0f172a',
                                        marginBottom: '0.375rem',
                                        fontSize: '0.9375rem'
                                    }}>
                                        {incident.title}
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: '#64748b',
                                        marginBottom: '0.5rem',
                                        lineHeight: 1.5
                                    }}>
                                        {incident.description.length > 100
                                            ? incident.description.substring(0, 100) + '...'
                                            : incident.description}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.75rem',
                                        alignItems: 'center',
                                        flexWrap: 'wrap'
                                    }}>
                                        <span style={{
                                            padding: '0.25rem 0.625rem',
                                            borderRadius: '6px',
                                            fontSize: '0.6875rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            backgroundColor: severityColors.bg,
                                            color: severityColors.text
                                        }}>
                                            {incident.severity}
                                        </span>
                                        <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                                            📍 {incident.location}
                                        </span>
                                        <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                                            {formatTimeAgo(incident.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedIncident(incident);
                                        }}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '6px',
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: '#ffffff',
                                            color: '#3b82f6',
                                            fontSize: '0.8125rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#eff6ff';
                                            e.currentTarget.style.borderColor = '#3b82f6';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#ffffff';
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                        }}
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={(e) => handleDismiss(e, incident.id)}
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: '6px',
                                            border: '1px solid #e2e8f0',
                                            backgroundColor: '#ffffff',
                                            color: '#64748b',
                                            fontSize: '1.125rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            lineHeight: 1
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#fee2e2';
                                            e.currentTarget.style.borderColor = '#ef4444';
                                            e.currentTarget.style.color = '#ef4444';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#ffffff';
                                            e.currentTarget.style.borderColor = '#e2e8f0';
                                            e.currentTarget.style.color = '#64748b';
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Detail Modal */}
            <IncidentDetailModal
                isOpen={!!selectedIncident}
                onClose={() => setSelectedIncident(null)}
                incident={selectedIncident}
            />
        </div>
    );
}
