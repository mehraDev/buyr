import { ReactNode } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Col } from "ui/basic";

interface IBackdrop {
  onClose?: () => void;
  children: ReactNode;
}

const Backdrop: React.FC<IBackdrop> = ({ onClose, children }) => {
  const theme = useTheme();

  return (
    <Wrapper style={{ background: theme.neutralColor.fill }}>
      <Col
        h="100%"
        style={{
          position: "relative",
        }}
      >
        {children}
      </Col>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
`;

export default Backdrop;
