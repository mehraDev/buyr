import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
// import Icon, { IconName } from "ui/Icon";
import { Sticky } from "ui/Sticky";
import { Row, Text } from "ui/basic";

interface IMenuHeader {
  name?: string;
  onSearch?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
  stickyPointHeader: number;
}
export const MENU_HEADER_HEIGHT = 40;
const MenuHeader: React.FC<IMenuHeader> = ({
  name,
  onSearch,
  containerRef,
  stickyPointHeader,
}) => {
  const theme = useTheme();
  return (
    <Sticky
      height={MENU_HEADER_HEIGHT}
      at={stickyPointHeader}
      stickyStyle={{
        position: "fixed",
        zIndex: 1,
        opacity: 1,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease-in-out",
      }}
      style={{
        background: theme.neutralColor.bgContainer,
        boxShadow: "rgba(0, 0, 0, 0.069) 0px 1px 4px",
      }}
      containerRef={containerRef}
    >
      <Row
        h="100%"
        p={"0.5rem 1rem"}
        style={{
          zIndex: 1,
          background: theme.neutralColor.bgContainer,
        }}
        j="center"
        a="center"
      >
        <Sticky
          at={stickyPointHeader}
          stickyStyle={{
            opacity: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ opacity: 0 }}
          containerRef={containerRef}
        >
          <Row style={{ position: "relative" }} a="center">
            <Text
              tt="cap"
              type="heading"
              s="16"
              w={7}
              c={theme.neutralColor.text}
            >
              {name}
            </Text>
            <Row w="initial" style={{ position: "absolute", right: "0" }}>
              <Icon
                width={1}
                height={1}
                color={theme.brandColor.pink}
                name={IconName.Search}
                onClick={onSearch}
                style={{}}
                borderRadius={0}
              />
            </Row>
          </Row>
        </Sticky>
      </Row>
    </Sticky>
  );
};

export default MenuHeader;
