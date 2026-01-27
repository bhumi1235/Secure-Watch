import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Landing() {
    const [expandedFeature, setExpandedFeature] = useState(null);

    // Apply background to body on mount, remove on unmount
    useEffect(() => {
        document.body.style.background = `
            linear-gradient(135deg, rgba(224, 242, 254, 0.6) 0%, rgba(186, 230, 253, 0.6) 100%),
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.05) 10px, rgba(59, 130, 246, 0.05) 20px)
        `;
        document.body.style.backgroundAttachment = 'fixed';

        return () => {
            document.body.style.background = '';
            document.body.style.backgroundAttachment = '';
        };
    }, []);

    const features = [
        {
            id: 1,
            icon: '🛡️',
            title: 'Guard Tracking',
            shortDesc: 'Real-time status updates of all your security personnel.',
            fullDesc: 'Monitor your entire security team in real-time. Track check-ins, patrol routes, and duty status. Get instant alerts when guards start or end shifts, ensuring complete visibility of your security operations 24/7.'
        },
        {
            id: 2,
            icon: '📅',
            title: 'Shift Management',
            shortDesc: 'Organize and assign shifts effortlessly without conflicts.',
            fullDesc: 'Create, assign, and manage shifts with our intelligent scheduling system. Avoid conflicts with automatic overlap detection. Send shift notifications to guards instantly and maintain a complete history of all shift assignments.'
        },
        {
            id: 3,
            icon: '🔔',
            title: 'Instant Alerts',
            shortDesc: 'Get notified immediately about incidents or shift changes.',
            fullDesc: 'Stay informed with real-time notifications for critical events. Receive alerts for incident reports, shift changes, guard absences, and security breaches. Customize notification preferences to focus on what matters most to your operation.'
        }
    ];

    const handleCardClick = (featureId) => {
        // Only one card can be expanded at a time
        setExpandedFeature(expandedFeature === featureId ? null : featureId);
    };

    return (
        <div className="landing-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Smart Security Management <br />
                        <span style={{ color: 'var(--primary)' }}>Simplified.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Manage your security team, track shifts, and ensure safety with our
                        all-in-one digital dashboard. Efficient. Reliable. Secure.
                    </p>

                    <div className="cta-group">
                        <Link to="/login" className="btn btn-primary">
                            Supervisor Portal
                        </Link>
                        <Link to="/signup" className="btn btn-secondary">
                            Initialize System
                        </Link>
                    </div>
                </div>
            </div>

            <div className="features-section">
                <div className="features-grid">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`feature-card ${expandedFeature === feature.id ? 'expanded' : ''}`}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p className="short-desc">{feature.shortDesc}</p>

                            {expandedFeature === feature.id && (
                                <div className="expanded-content">
                                    <p>{feature.fullDesc}</p>
                                </div>
                            )}

                            <button
                                className="expand-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardClick(feature.id);
                                }}
                            >
                                {expandedFeature === feature.id ? '− Less' : '+ Learn More'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .landing-container {
                    min-height: calc(100vh - 60px);
                }

                .hero-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 70vh;
                    padding: 4rem 2rem;
                }

                .hero-content {
                    max-width: 800px;
                    text-align: center;
                }

                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 1.5rem;
                    color: var(--accent);
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--text-muted);
                    margin-bottom: 3rem;
                    line-height: 1.6;
                }

                .cta-group {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .features-section {
                    padding: 4rem 2rem;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .feature-card {
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    border: 2px solid #e2e8f0;
                    text-align: center;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                }

                .feature-card:hover {
                    border-color: var(--primary);
                    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
                    transform: translateY(-2px);
                }

                .feature-card.expanded {
                    border-color: var(--primary);
                    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.2);
                }

                .feature-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .feature-card h3 {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    color: var(--accent);
                }

                .short-desc {
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: 1rem;
                }

                .expanded-content {
                    background: #f8fafc;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    margin: 1rem 0;
                    border-left: 4px solid var(--primary);
                    animation: slideDown 0.3s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .expanded-content p {
                    color: var(--text-main);
                    line-height: 1.7;
                    margin: 0;
                    text-align: left;
                }

                .expand-btn {
                    background: transparent;
                    border: 1px solid var(--primary);
                    color: var(--primary);
                    padding: 0.5rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.9rem;
                }

                .expand-btn:hover {
                    background: var(--primary);
                    color: white;
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5rem;
                    }
                    .hero-subtitle {
                        font-size: 1.1rem;
                    }
                    .features-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
