import React, { ChangeEvent } from "react";

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[];
  error: string;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, id, value, onChange, options, error }) => {
  return (
    <div className={`form-group mb-3`}>
      <label htmlFor={id}>{label}</label>
      <select
        className="form-select"
        id={id}
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default FormSelect;
