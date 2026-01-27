import React from 'react';
import { Link } from "react-router-dom";
import { useGuards } from "../context/GuardContext";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";

export default function GuardsList() {
    const { guards, loading } = useGuards();

    if (loading) {
        return (
            <div className="grid-3 animate-fade-in">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '200px' }}></div>)}
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2>Security Personnel</h2>
                    <p>Manage your security team roster.</p>
                </div>
                <Link to="/add-guard">
                    <Button>+ Add Guard</Button>
                </Link>
            </div>

            {guards.length === 0 ? (
                <Card className="text-center" style={{ padding: '4rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📭</div>
                    <h3>No guards found</h3>
                    <p style={{ maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                        Your roster is currently empty. Add your first security guard to start managing shifts.
                    </p>
                    <Link to="/add-guard">
                        <Button>Add First Guard</Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid-3">
                    {guards.map((g) => (
                        <Card key={g.id} className="flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="guard-avatar">
                                        {g.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{g.name}</h4>
                                        <span className="text-sm text-muted">ID: #{g.id}</span>
                                    </div>
                                </div>
                                <Badge variant={g.status === 'Active' ? 'success' : 'neutral'}>
                                    {g.status}
                                </Badge>
                            </div>

                            <div style={{ flex: 1 }}>
                                <div className="detail-item">
                                    <span style={{ minWidth: '20px' }}>📞</span> {g.phone}
                                </div>
                                <div className="detail-item">
                                    <span style={{ minWidth: '20px' }}>📍</span> {g.address || 'No address logged'}
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                                <Link to={`/guards/${g.id}`} className="w-full block">
                                    <Button variant="secondary" className="w-full">View Profile</Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
