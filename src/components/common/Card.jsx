import React from 'react';

export default function Card({ children, className = '', hover = false, ...props }) {
    return (
        <div
            className={`card ${hover ? 'card-interactive' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
