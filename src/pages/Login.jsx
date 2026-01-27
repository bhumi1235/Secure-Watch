import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        } catch (err) {
            // Error managed by context
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <Card className="auth-card">
                <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️ SecureWatch</h1>
                    <h2 style={{ fontSize: '1.5rem', marginTop: '0', marginBottom: '0.75rem' }}>Supervisor Portal</h2>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Secure login for security management staff.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Work Email *</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="name@security-company.com"
                            autoFocus
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password *</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" className="w-full" style={{ marginTop: '1.5rem' }} loading={isSubmitting}>
                        Access Dashboard
                    </Button>
                </form>

                <div className="text-center" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                        New Supervisor? <Link to="/signup" style={{ fontWeight: 600, color: 'var(--primary)' }}>Initialize System</Link>
                    </p>
                </div>
            </Card>

            <style jsx>{`
                .auth-page {
                    min-height: calc(100vh - 60px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
                }
                .auth-card {
                    width: 100%;
                    max-width: 420px;
                    padding: 2.5rem 2rem;
                    box-shadow: var(--shadow-lg);
                }
            `}</style>
        </div>
    );
}
