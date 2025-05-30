import React from "react";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, id, type = "text", placeholder, value, onChange, error }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default FormInput;
