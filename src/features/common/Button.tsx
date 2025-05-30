import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ loading, children, className = '', ...rest }) => {
  return (
    <button
      className={`btn ${className}`}
      style={loading ? { opacity: 0.4 } : {}}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? "Submitting..." : children}
    </button>
  );
};

export default Button;
