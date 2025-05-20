import { useState, useEffect } from "react";

type DebouncedInputProps = {
  value: string;
  onDebouncedChange: (value: string) => void;
  delay?: number;
  placeholder?: string;
  className?: string;
};

export const DebouncedInput = ({
  value,
  onDebouncedChange,
  delay = 500,
  placeholder,
  className = "",
}: DebouncedInputProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebouncedChange(localValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [localValue, delay, onDebouncedChange]);

  return (
    <input
      id="search"
      name="search"
      type="search"
      value={localValue}
      placeholder={placeholder}
      onChange={(e) => setLocalValue(e.target.value)}
      className={className}
    />
  );
};
