import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean; // 添加這行
  children: React.ReactNode;
}

function Button({
  type = "button",
  className,
  onClick,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled} // 添加這行
    >
      {children}
    </button>
  );
}

export default Button;
