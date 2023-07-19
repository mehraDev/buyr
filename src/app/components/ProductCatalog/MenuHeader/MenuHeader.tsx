import { useTheme } from "styled-components";
import { Row, Text } from "ui/basic";

interface IMenuHeader {
  name?: string;
}
const MenuHeader: React.FC<IMenuHeader> = ({ name }) => {
  const theme = useTheme();
  return (
    <Row
      h="2rem"
      j="center"
      a="center"
      style={{
        top: 0,
        position: "fixed",
        zIndex: 2,
        background: "#ffffff",
        transition: "opacity 0.3s",
        // borderBottom: "1px dashed" + theme.neutralColor.border,
      }}
    >
      <Text tt="cap" type="heading" s="16" w={7} c={theme.neutralColor.text}>
        {name}
      </Text>
    </Row>
  );
};

export default MenuHeader;
