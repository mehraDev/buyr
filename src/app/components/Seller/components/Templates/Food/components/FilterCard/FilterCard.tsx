import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import { Col, Row, Text } from "ui/basic";
import { ESortType } from "../../FoodMenu";
import Button from "ui/Button";

export interface FilterCardProps {
  sortingOptions: ESortType[] | null;
  handleSortChange: (sortOption: ESortType) => void;
  activeSort: ESortType | null;
  onClose: () => void;
}

const FilterCard: React.FC<FilterCardProps> = ({
  sortingOptions,
  handleSortChange,
  activeSort,
  onClose,
}) => {
  const theme = useTheme();
  return (
    <Col
      p={"2rem 1rem"}
      style={{
        background: "white",
        gap: "0.5rem",
        borderRadius: "12px 12px 0px 0px",
      }}
    >
      <Col style={{ gap: "0.5rem" }} br="0.35">
        <Row j="between" a="center">
          <Text w={6} s="14" c={theme.neutralColor.text}>
            Sort By:
          </Text>
          <Icon name={IconName.Close} color="red" onClick={onClose} />
        </Row>
        <Row style={{ gap: "0.5rem", flexWrap: "wrap" }} br="0.35">
          {sortingOptions ? (
            sortingOptions.map((sortOption) => (
              <Button
                key={sortOption}
                onClick={() => handleSortChange(sortOption)}
                variant={activeSort === sortOption ? "primary" : "secondary"}
              >
                {sortOption}
              </Button>
            ))
          ) : (
            <Text>No Options</Text>
          )}
        </Row>
      </Col>
    </Col>
  );
};

export default FilterCard;
