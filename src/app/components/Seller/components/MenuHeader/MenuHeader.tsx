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
export const MENU_HEADER_HEIGHT = 50;
const MenuHeader: React.FC<IMenuHeader> = ({
  name,
  onSearch,
  containerRef,
  stickyPointHeader,
}) => {
  const theme = useTheme();
  return (
    <Sticky
      at={stickyPointHeader}
      stickyStyle={{
        position: "fixed",
        zIndex: 1,
        opacity: 1,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        transition: "box-shadow 0.3s ease-in-out",
        display: "block",
      }}
      style={{
        display: "none",
      }}
      containerRef={containerRef}
    >
      <Row
        p={"0.5rem 1rem"}
        style={{
          zIndex: 1,
          background: theme.neutralColor.bgContainer,
        }}
        j="between"
        a="center"
      >
        <Sticky
          at={stickyPointHeader}
          stickyStyle={{
            opacity: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "initial",
          }}
          style={{ opacity: 0, display: "none" }}
          containerRef={containerRef}
        >
          <Row
            style={{ position: "relative", background: "#f65d6b" }}
            a="center"
            w="initial"
            p={"0.5rem"}
            br="6px"
          >
            <Text tt="cap" type="heading" s="14" w={5} c={"#fff"}>
              {name}
            </Text>
          </Row>
        </Sticky>
        <Row w="initial">
          <Icon
            width={1.1}
            height={1.1}
            color={"#f65d6b"}
            name={IconName.Search}
            onClick={onSearch}
            style={{}}
            padding="0px"
            borderRadius={0}
          />
        </Row>
      </Row>
    </Sticky>
  );
};

export default MenuHeader;
