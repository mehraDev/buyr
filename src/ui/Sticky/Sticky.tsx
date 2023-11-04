import React, { useEffect, useRef, useState } from "react";
import { Box } from "ui/basic";

interface ISticky {
  children: React.ReactNode;
  at: number;
  stickyStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  parentRef?: React.RefObject<HTMLDivElement>;
  containerRef?: React.RefObject<HTMLDivElement>;
  height?: number;
  onStickyChange?: () => void;
}

const Sticky: React.FC<ISticky> = ({
  children,
  at,
  stickyStyle,
  style,
  parentRef,
  containerRef,
  height,
  onStickyChange,
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [, setScrollDirection] = useState<"up" | "down" | null>(null);
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = parentRef || internalRef;
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef?.current || window;
      const currentScrollY =
        container instanceof Window
          ? container.scrollY
          : container.scrollTop || 0;
      setScrollDirection(prevScrollY.current < currentScrollY ? "down" : "up");
      prevScrollY.current = currentScrollY;
      const newIsSticky = currentScrollY >= at;
      setIsSticky(newIsSticky);
      if (newIsSticky !== isSticky && onStickyChange) {
        onStickyChange();
      }
    };

    let cleanup;
    const currentContainer = containerRef?.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
      cleanup = () => {
        currentContainer.removeEventListener("scroll", handleScroll);
      };
    } else {
      window.addEventListener("scroll", handleScroll);
      cleanup = () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return cleanup;
  }, [at, containerRef, isSticky, onStickyChange]);

  if (height) {
    return (
      <Box style={{ minHeight: `${height}px` }} ref={ref}>
        <Box
          h={`${height}px`}
          style={
            isSticky
              ? {
                  ...stickyStyle,
                }
              : { ...style }
          }
        >
          {children}
        </Box>
      </Box>
    );
  }
  return (
    <Box
      ref={ref}
      style={
        isSticky
          ? {
              ...stickyStyle,
            }
          : { ...style }
      }
    >
      {children}
    </Box>
  );
};

export default Sticky;
