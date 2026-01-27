import React from 'react';

const InputField = ({ label, type = 'text', placeholder }) => {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input type={type} placeholder={placeholder} />
        </div>
    );
};

export default InputField;
