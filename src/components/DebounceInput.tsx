import React, { useState } from "react";

interface Props {
  onInput: (value: string) => void;
}

let timeout: number | null = null;

const DebounceInput: React.FC<Props> = ({ onInput }) => {
  const [value, setValue] = useState<string>("");

  // Function to handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      onInput(newValue);
    }, 500);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default DebounceInput;
