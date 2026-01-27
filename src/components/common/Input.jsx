import React from 'react';

export default function Input({
    label,
    error,
    type = 'text',
    className = '',
    ...props
}) {
    return (
        <div className="form-group">
            {label && <label className="form-label">{label}</label>}
            <input
                type={type}
                className={`form-input ${error ? 'border-red-500 focus:border-red-500' : ''} ${className}`}
                {...props}
            />
            {error && <span className="text-sm text-danger mt-1 block">{error}</span>}
            <style jsx>{`
        .text-danger { color: var(--danger); font-size: 0.85rem; }
        .border-red-500 { border-color: var(--danger) !important; }
      `}</style>
        </div>
    );
}
