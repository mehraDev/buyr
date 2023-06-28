import React, { useState } from "react";
import styled, { css } from "styled-components";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";


interface Props {
  items?: string[];
  showButton?: boolean;
}

const SearchInputWrapper = styled.div<{ isFocused: boolean }>`
  width: 100%;
  border-radius: 16px;
  align-items: center;
  display: flex;
  gap: 1rem;
  background: #fff;
  border: 1px solid
    ${({ isFocused, theme }) =>
      isFocused ? theme.brandColor.primaryBorderHover : theme.neutralColor.border};
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
  align-items: stretch;
`;

const SearchIcon = styled.span`
  color: #999;
  font-size: 1.2rem;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.25rem;
  margin: 2px;
  width: 100%;
  border: 1px solid #ffffff00;
  background: transparent;
  color: ${({ theme }) => theme.neutralColor.text};
  font-size: 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.neutralColor.textTertiary};
  }
`;

const IconWrapper = styled.span`
  display: flex;
`;

const Search: React.FC<Props> = ({ items = [], showButton = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <>
      <SearchInputWrapper isFocused={isFocused}>
        <SearchInput
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {isFocused && showButton && (
          <IconWrapper>
            <Button variant="secondary" size="small" onClick={handleClick}>
              <Icon name={IconName.LeftArrow} width={1.2} height={1.2} />
              Search
            </Button>
          </IconWrapper>
        )}
      </SearchInputWrapper>
    </>
  );
};

export default Search;
