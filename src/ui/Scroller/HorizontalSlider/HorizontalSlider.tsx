import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Row } from "ui/basic";
import { IBox } from "ui/basic/Box";

interface IHorizontalSliderProps extends IBox {
  children: React.ReactNode;
  activeChildIndex: number;
  // children: React.ReactNode;
  // scrollOffset: number;
}

const StyledSlider = styled(Row)`
  overflow-x: auto;
  white-space: nowrap;
  position: relative;
  scroll-behavior: smooth;

  // For Internet Explorer, Edge
  -ms-overflow-style: none;

  // For Firefox
  scrollbar-width: none;

  // For Chrome, Safari, Opera
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HorizontalSlider: React.FC<IHorizontalSliderProps> = ({
  children,
  activeChildIndex,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (sliderRef.current && childRefs.current[activeChildIndex]) {
      const scrollLeftPosition = childRefs.current[activeChildIndex].offsetLeft;
      if (activeChildIndex === 0) {
        sliderRef.current.scrollLeft = 0;
        console.log("inital", sliderRef.current.scrollLeft);
      } else {
        sliderRef.current.scrollLeft = scrollLeftPosition;
      }
    }
  }, [activeChildIndex, children]);

  // Clone each child to add refs
  const childrenWithRefs = React.Children.map(children, (child, index) => {
    return React.cloneElement(child as React.ReactElement, {
      ref: (el: HTMLElement) => (childRefs.current[index] = el),
    });
  });

  return (
    <StyledSlider ref={sliderRef}>
      <Row style={{ gap: "0.5rem" }}>{childrenWithRefs}</Row>
    </StyledSlider>
  );
};

export default HorizontalSlider;
