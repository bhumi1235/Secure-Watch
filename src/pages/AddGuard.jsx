import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useGuards } from "../context/GuardContext";
import { useToast } from "../context/ToastContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

export default function AddGuard() {
    const navigate = useNavigate();
    const { addGuard } = useGuards();
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        phone: "",
        address: "",
        shift: "",
        status: "Active"
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        const age = parseInt(formData.age);
        if (!formData.age || isNaN(age) || age < 18 || age > 70) {
            newErrors.age = "Age must be between 18 and 70";
        }

        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be exactly 10 digits";
        }

        if (!formData.address || formData.address.length < 5) {
            newErrors.address = "Address must be at least 5 characters";
        }

        if (!formData.shift) {
            newErrors.shift = "Shift is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);

        if (!validateForm()) {
            console.log("Validation failed:", errors);
            showToast('Please fix validation errors', 'error');
            return;
        }

        try {
            setIsSubmitting(true);
            console.log("Creating guard with data:", formData);

            const newGuard = await addGuard(formData);
            console.log("Guard created successfully:", newGuard);

            showToast('Guard added successfully!', 'success');
            navigate(`/guards/${newGuard.id}`);
        } catch (err) {
            console.error("Error adding guard:", err);
            showToast('Failed to add guard: ' + err.message, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2>New Guard Profile</h2>
                    <p>Enter details to add personnel to the system.</p>
                </div>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="e.g. Officer Robert Smith"
                            autoFocus
                        />
                        {errors.name && <span className="text-sm text-danger mt-1 block">{errors.name}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">Age *</label>
                            <input
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                className={`form-input ${errors.age ? 'border-red-500' : ''}`}
                                placeholder="e.g. 28"
                                min="18"
                                max="70"
                            />
                            {errors.age && <span className="text-sm text-danger mt-1 block">{errors.age}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number *</label>
                            <input
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                                placeholder="e.g. 9876543210"
                                maxLength="10"
                            />
                            {errors.phone && <span className="text-sm text-danger mt-1 block">{errors.phone}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Address *</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`form-input ${errors.address ? 'border-red-500' : ''}`}
                            placeholder="Full residential address"
                            rows="3"
                        />
                        {errors.address && <span className="text-sm text-danger mt-1 block">{errors.address}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Shift Timing *</label>
                        <select
                            name="shift"
                            value={formData.shift}
                            onChange={handleChange}
                            className={`form-select ${errors.shift ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select shift...</option>
                            <option value="Morning (6 AM - 2 PM)">Morning (6 AM - 2 PM)</option>
                            <option value="Afternoon (2 PM - 10 PM)">Afternoon (2 PM - 10 PM)</option>
                            <option value="Night (10 PM - 6 AM)">Night (10 PM - 6 AM)</option>
                        </select>
                        {errors.shift && <span className="text-sm text-danger mt-1 block">{errors.shift}</span>}
                    </div>

                    <div className="flex gap-4 mt-8">
                        <Button type="submit" className="flex-1" loading={isSubmitting}>
                            Add Guard Profile
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/guards')}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
