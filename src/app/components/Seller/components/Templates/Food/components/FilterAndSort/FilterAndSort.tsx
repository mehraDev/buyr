import { IFoodTag } from "app/interfaces/Shop/product";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { IButton } from "ui/Button/Button";
import Icon, { IconName } from "ui/Icon";
import HorizontalSlider from "ui/Scroller/HorizontalSlider/HorizontalSlider";
import { Row, Text } from "ui/basic";

export interface FilterSortProps extends TagsListProps {
  toggleDrawer: () => void;
}

const FilterSort: React.FC<FilterSortProps> = ({
  toggleDrawer,
  tagList,
  activeTagsList,
  handleTagClick,
}) => {
  return (
    <Row style={{ overflowX: "auto", gap: "1rem" }}>
      <UtilityButton
        label={"Sort"}
        icon={IconName.FilterArrow}
        onClick={toggleDrawer}
      />
      <HorizontalSlider activeChildIndex={0}>
        <TagsList
          tagList={tagList}
          activeTagsList={activeTagsList}
          handleTagClick={handleTagClick}
        />
      </HorizontalSlider>
    </Row>
  );
};

export default FilterSort;

interface TagsListProps {
  tagList: string[];
  activeTagsList: string[];
  handleTagClick: (tag: string) => void;
}
const TagsList: React.FC<TagsListProps> = ({
  tagList,
  handleTagClick,
  activeTagsList,
}) => {
  const isTagActive = (tag: string) => activeTagsList.includes(tag);
  const activeTags = tagList.filter(isTagActive);

  const inactiveTags = tagList.filter((tag) => !isTagActive(tag));
  return (
    <>
      {activeTags.map((tag) => (
        <UtilityButton
          key={tag}
          label={tag.toLowerCase()}
          onClick={() => handleTagClick(tag)}
          isActive={true}
        />
      ))}
      {inactiveTags.map((tag) => (
        <UtilityButton
          key={tag}
          label={tag.toLowerCase()}
          onClick={() => handleTagClick(tag)}
          isActive={false}
        />
      ))}
    </>
  );
};

interface UtilityButtonProps extends IButton {
  label: string;
  icon?: IconName;
  isActive?: boolean;
}

const UtilityButton: React.FC<UtilityButtonProps> = ({
  label,
  icon,
  isActive = false,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <Button
      padding="0.5rem 0.5rem"
      br="8px"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        boxShadow: "0 0 2px #000000e",
      }}
      variant={isActive ? "primary" : "secondary"}
      border={isActive ? "" : "1px solid #ffffff"}
      onClick={onClick}
      bg={isActive ? "" : "white"}
    >
      {icon && (
        <Icon
          name={icon}
          width={0.9}
          height={0.9}
          padding="0"
          color={theme.neutralColor.textSecondary}
          style={{ marginRight: "2px" }}
        />
      )}
      <Text
        s="14"
        tt="cap"
        w={4}
        c={isActive ? "white" : theme.neutralColor.textSecondary}
      >
        {label}
      </Text>
      {isActive && (
        <Icon
          name={IconName.Close}
          width={0.9}
          height={0.9}
          padding="0"
          color={"white"}
          style={{ marginRight: "2px" }}
        />
      )}
    </Button>
  );
};
