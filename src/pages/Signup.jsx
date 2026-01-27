import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string()
}).refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"]
});

export default function Signup() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            signupSchema.parse(data);
            setIsSubmitting(true);
            await signup(data.name, data.email);
            navigate("/dashboard");
        } catch (err) {
            console.error("Validation error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <Card className="auth-card">
                <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️ SecureWatch</h1>
                    <h2 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Supervisor Registration</h2>
                    <p style={{ margin: 0, color: 'var(--text-muted)' }}>Create your administrative account to manage security staff.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label">Supervisor Name *</label>
                        <input
                            {...register("name")}
                            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="e.g. Chief John Doe"
                            autoFocus
                        />
                        {errors.name && <span className="text-sm text-danger mt-1 block">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Work Email *</label>
                        <input
                            {...register("email")}
                            type="email"
                            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="name@security-company.com"
                        />
                        {errors.email && <span className="text-sm text-danger mt-1 block">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password *</label>
                        <input
                            {...register("password")}
                            type="password"
                            className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-sm text-danger mt-1 block">{errors.password.message}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password *</label>
                        <input
                            {...register("confirm")}
                            type="password"
                            className={`form-input ${errors.confirm ? 'border-red-500' : ''}`}
                            placeholder="••••••••"
                        />
                        {errors.confirm && <span className="text-sm text-danger mt-1 block">{errors.confirm.message}</span>}
                    </div>

                    <Button type="submit" className="w-full" style={{ marginTop: '1.5rem' }} loading={isSubmitting}>
                        Initialize Dashboard
                    </Button>
                </form>

                <div className="text-center" style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>
                        Existing Supervisor? <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary)' }}>Login here</Link>
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
