import { IFoodTag } from "app/interfaces/Shop/product";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { IButton } from "ui/Button/Button";
import Icon, { IconName } from "ui/Icon";
import HorizontalSlider from "ui/Scroller/HorizontalSlider/HorizontalSlider";
import theme from "ui/Utils/Media/Theme/theme";
import { Row, Text } from "ui/basic";

export interface FilterSortSearchProps extends TagsListProps {
  toggleDrawer: () => void;
  onSearch: () => void;
}

const FilterSortSearch: React.FC<FilterSortSearchProps> = ({
  toggleDrawer,
  onSearch,
  tagList,
  activeTagsList,
  handleTagClick,
}) => {
  return (
    <Row p="0.5rem 1rem" a="center" j="between" style={{ gap: "1rem" }}>
      <Row style={{ overflowX: "auto" }}>
        <HorizontalSlider activeChildIndex={0}>
          <UtilityButton
            label={"Filters"}
            icon={IconName.FilterArrow}
            onClick={toggleDrawer}
          />
          <TagsList
            tagList={tagList}
            activeTagsList={activeTagsList}
            handleTagClick={handleTagClick}
          />
        </HorizontalSlider>
      </Row>
      <Row w="initial" a="center">
        <Button
          variant="secondary"
          border="1px solid #d9d9e3"
          padding="0.25rem 0.5rem"
          br="0.35rem"
          onClick={() => onSearch()}
        >
          <Icon
            name={IconName.Search}
            borderRadius={0}
            color={theme.neutralColor.textSecondary}
          />
        </Button>
      </Row>
    </Row>
  );
};

export default FilterSortSearch;

interface TagsListProps {
  tagList: IFoodTag[];
  activeTagsList: IFoodTag[];
  handleTagClick: (tag: IFoodTag) => void;
}
const TagsList: React.FC<TagsListProps> = ({
  tagList,
  handleTagClick,
  activeTagsList,
}) => {
  const isTagActive = (tag: IFoodTag) => activeTagsList.includes(tag);
  const activeTags = tagList.filter(isTagActive);

  const inactiveTags = tagList.filter((tag) => !isTagActive(tag));
  return (
    <>
      {activeTags.map((tag) => (
        <UtilityButton
          key={tag.name}
          label={tag.name.toLowerCase()}
          onClick={() => handleTagClick(tag)}
          isActive={true}
        />
      ))}
      {inactiveTags.map((tag) => (
        <UtilityButton
          key={tag.name}
          label={tag.name.toLowerCase()}
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
      style={{ display: "flex", alignItems: "center", gap: "0.35rem" }} // Using flexbox for alignment and gap for spacing.
      variant={isActive ? "primary" : "secondary"}
      border={isActive ? "" : "1px solid #d9d9e3"}
      onClick={onClick}
    >
      {icon && ( // Conditionally render the Icon component
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
