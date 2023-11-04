import { ReactNode, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Col } from "ui/basic";

interface IDrawer {
  bg?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  h?: string;
}

const Drawer: React.FC<IDrawer> = ({
  bg,
  onClose,
  children,
  isOpen,
  h = "90%",
}) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [closeDrawer, setCloseDrawer] = useState(true);
  const [wrapperHeight, setWrapperHeight] = useState<string>("100%"); // Initialize with 100% or some default value

  useEffect(() => {
    const updateWrapperHeight = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      setWrapperHeight(`${vh}px`);
    };

    window.addEventListener("resize", updateWrapperHeight);
    updateWrapperHeight(); // Set initial height

    return () => {
      window.removeEventListener("resize", updateWrapperHeight);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCloseDrawer(false);
      const timeoutId = setTimeout(() => {
        setOpenDrawer(true);
      }, 0);
      return () => clearTimeout(timeoutId);
    } else {
      setOpenDrawer(false);
      const timeoutId = setTimeout(() => {
        setCloseDrawer(true);
      }, 220);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  if (closeDrawer) {
    return null;
  }

  return (
    <Wrapper
      dynamicHeight={wrapperHeight}
      style={{
        background: bg ? bg : theme.neutralColor.bgMask,
      }}
    >
      <Col
        h={h}
        j="center"
        a="end"
        style={{
          transform: openDrawer ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {children}
      </Col>
    </Wrapper>
  );
};

const Wrapper = styled(Box)<{ dynamicHeight: string }>`
  width: 100%;
  position: fixed;
  display: flex;

  flex-direction: column;
  justify-content: end;
  height: ${({ dynamicHeight }) => dynamicHeight};
  left: 0;
  bottom: 0;
  z-index: 9;
`;

export default Drawer;
