import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-fade-in">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Page Not Found</h1>
            <p style={{ maxWidth: '400px', margin: '0 auto 2rem', color: 'var(--text-muted)' }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/">
                <Button>Go to Homepage</Button>
            </Link>
        </div>
    );
}
