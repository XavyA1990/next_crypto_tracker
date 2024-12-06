import useTheme from "@/hooks/useTheme";
import React from "react";

const Input = ({
  onChange,
  placeholder,
  className,
  value,
  type,
  containerClasses,
}) => {
  const { theme, mounted } = useTheme();

  if (!mounted) return null;
  return (
    <div className={`mb-4 px-6 md:px-0 ${containerClasses}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className} md:w-1/2 w-full p-2 border rounded-md text-input ${theme}`}
      />
    </div>
  );
};

export default Input;
