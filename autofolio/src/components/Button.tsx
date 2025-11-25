import React from "react";
import "../styles/Button.css"

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
};

function Button({ children, onClick, className = "", type = "button" }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;