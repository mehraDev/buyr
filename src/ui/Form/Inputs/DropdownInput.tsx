import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

interface DropdownInputProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DropdownWrapper = styled.div`
  position: relative;
  width: 200px;
`;

const DropdownLabel = styled.label`
  margin-bottom: 4px;
  display: block;
`;

const DropdownInputWrapper = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionClick = (selectedValue: string) => {
    setIsOpen(false);
    onChange(selectedValue);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownWrapper>
      {label && <DropdownLabel>{label}</DropdownLabel>}
      <DropdownInputWrapper
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        onClick={toggleDropdown}
      />
      <DropdownList isOpen={isOpen}>
        {filteredOptions.map((option) => (
          <DropdownListItem
            key={option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  );
};

export default DropdownInput;
