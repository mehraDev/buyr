import { useTheme } from "styled-components";
import { Box, Row, Text } from "ui/basic";

const EmptySearch = () => {
  const theme = useTheme();
  return (
    <Box style={{ height: "100vh" }}>
      <Row j="center" p="1rem">
        <Text s="16" w={5} c={theme.neutralColor.textSecondary}>
          {" "}
          No results found{" "}
        </Text>
      </Row>
    </Box>
  );
};

export default EmptySearch;
