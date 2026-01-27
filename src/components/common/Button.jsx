import React from 'react';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    className = '',
    disabled,
    ...props
}) {
    const baseClass = "btn";
    const variantClass = `btn-${variant}`;
    const sizeClass = size === 'sm' ? 'text-sm py-1 px-3' : size === 'lg' ? 'text-lg py-3 px-6' : '';
    const loadingClass = loading ? 'loading opacity-70 cursor-not-allowed' : '';

    return (
        <button
            className={`${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="spinner spin mr-2">⟳</span>}
            {children}
            <style jsx>{`
        .spin {
            animation: spin 1s linear infinite;
            display: inline-block;
        }
        @keyframes spin {
            100% { transform: rotate(360deg); }
        }
      `}</style>
        </button>
    );
}
