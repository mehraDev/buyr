import { ReactNode, useEffect, useState } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { Box, Col } from "ui/basic";

interface IDrawer {
  bg?: string;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  h?: string;
  j?: "center" | "start" | "end";
}

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

const DrawerContainer = styled(Box)<{ bg: string }>`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9;
  background: ${({ bg }) => bg};
`;

const AnimatedCol = styled(Col)<{ open: boolean }>`
  animation: ${(props) => (props.open ? slideUp : slideDown)} 0.3s forwards;
`;

const Drawer: React.FC<IDrawer> = ({
  bg,
  children,
  isOpen,
  h = "90%",
  j = "end",
}) => {
  const theme = useTheme();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderDrawer(true);
      setIsOpenDrawer(true);
    } else {
      setIsOpenDrawer(false);
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    console.log("Animation ended");
    if (isOpen) {
      setOpened(true);
    } else {
      setOpened(false);
      setRenderDrawer(false);
    }
  };

  const backgroundColor =
    opened && isOpen ? bg || theme.neutralColor.bgMask : "transparent";

  return (
    <>
      {renderDrawer ? (
        <DrawerContainer j="end" a="end" h="100%" bg={backgroundColor}>
          <AnimatedCol
            h={h}
            j={j}
            open={isOpenDrawer}
            onAnimationEnd={handleAnimationEnd}
          >
            {children}
          </AnimatedCol>
        </DrawerContainer>
      ) : null}
    </>
  );
};

export default Drawer;
