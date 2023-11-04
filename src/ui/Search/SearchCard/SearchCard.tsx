import React from "react";
import { useTheme } from "styled-components";
import { InputSearch } from "ui/Form";
import Icon, { IconName } from "ui/Icon";
import { Col, Row } from "ui/basic";

interface ISearchCard<T> {
  searchQuery: string;
  onSearch: (query: string) => void; //
  onClose: () => void;
  searchItems: T[];
  children: (item: T, index: number) => React.ReactNode;
  filterField: (item: T) => string;
}

const SearchCard: React.FC<ISearchCard<any>> = ({
  searchQuery,
  onSearch,
  onClose,
  searchItems,
  children,
  filterField,
}) => {
  const theme = useTheme();
  const filteredItems = searchItems.filter((item) =>
    filterField(item).includes(searchQuery)
  );
  return (
    <Col
      h="100%"
      style={{
        background: theme.neutralColor.bgContainer,
        borderRadius: "8px 8px 0 0",
      }}
    >
      <Row
        a="center"
        j="center"
        p="1rem"
        style={{
          gap: "0.5rem",
          borderBottom: `1px solid ${theme.neutralColor.border}`,
        }}
      >
        <Icon
          name={IconName.ChevronDown}
          borderRadius={0}
          onClick={() => onClose()}
        />
        <InputSearch
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(value: string) => {
            onSearch(value);
          }}
          onClear={() => {
            onSearch("");
          }}
          isActive={true}
        />
      </Row>
      <Col style={{ overflow: "scroll" }} p={"1rem"}>
        {filteredItems.map((item, index) => (
          <>{children(item, index)}</>
        ))}
      </Col>
    </Col>
  );
};

export default SearchCard;
