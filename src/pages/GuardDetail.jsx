import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useGuards } from "../context/GuardContext";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";

export default function GuardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getGuardById, loading: contextLoading } = useGuards();
    const [guard, setGuard] = useState(null);

    useEffect(() => {
        if (!contextLoading) {
            const found = getGuardById(id);
            setGuard(found);
        }
    }, [id, contextLoading, getGuardById]);

    if (contextLoading) {
        return (
            <div className="animate-fade-in">
                <div className="skeleton" style={{ height: '300px' }}></div>
            </div>
        );
    }

    if (!guard) {
        return (
            <Card className="text-center" style={{ padding: '4rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
                <h3>Guard Not Found</h3>
                <p>The guard profile you're looking for doesn't exist.</p>
                <Button onClick={() => navigate('/guards')}>Back to Roster</Button>
            </Card>
        );
    }

    return (
        <div className="animate-fade-in">
            <Button variant="secondary" onClick={() => navigate("/guards")} className="mb-4">
                ← Back to Roster
            </Button>

            <Card className="mb-4 overflow-hidden">
                <div style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-light))', padding: '2rem', color: 'white' }}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div style={{
                                width: '80px', height: '80px', background: 'white',
                                color: 'var(--accent)', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', fontWeight: 'bold'
                            }}>
                                {guard.name.charAt(0)}
                            </div>
                            <div>
                                <h1 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                                    {guard.name}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <span style={{ opacity: 0.8 }}>Employee ID: #{guard.id}</span>
                                    <Badge variant={guard.status === 'Active' ? 'success' : 'neutral'}>
                                        {guard.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="secondary"
                            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>

                <div style={{ padding: '2rem' }}>
                    <div className="grid-3">
                        <div className="info-group">
                            <label className="info-label">Contact Phone</label>
                            <div className="info-value">{guard.phone}</div>
                        </div>

                        <div className="info-group">
                            <label className="info-label">Age</label>
                            <div className="info-value">{guard.age} Years</div>
                        </div>

                        <div className="info-group">
                            <label className="info-label">Assigned Shift</label>
                            <div className="info-value">{guard.shift}</div>
                        </div>

                        <div className="info-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="info-label">Address</label>
                            <div className="info-value">{guard.address}</div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <h3>Recent Activity & Shifts</h3>
                <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                            <div className="font-semibold text-slate-800">Shift Completed - Main Gate</div>
                            <div className="text-sm text-slate-500 mt-1">Yesterday, 09:00 AM - 05:00 PM</div>
                        </div>
                        <Badge variant="success">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                            <div className="font-semibold text-slate-800">Incident Report Filed</div>
                            <div className="text-sm text-slate-500 mt-1">3 days ago</div>
                        </div>
                        <Badge variant="warning">Review Pending</Badge>
                    </div>
                </div>
            </Card>

            <style jsx>{`
                .info-label {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: var(--text-muted);
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    display: block;
                    letter-spacing: 0.05em;
                }
                .info-value {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--text-main);
                }
                .space-y-4 > * + * {
                    margin-top: 1rem;
                }
            `}</style>
        </div>
    );
}
