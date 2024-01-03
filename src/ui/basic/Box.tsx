/**
 * @typedef {Object} IBox - Props for the Box component
 * @property {string} [w] - Width of the box (e.g., "200px", "50%")
 * @property {string} [p] - Padding of the box
 * @property {'r' | 'c'} [fd] - Flex direction of the box ('r' for row, 'c' for column)
 * @property {'start' | 'end' | 'center'} [j] - Justify content of the box
 * @property {'start' | 'end' | 'center' | 'stretch'} [a] - Align items of the box
 * @property {number[]} [m] - Margins of the box (array of numbers representing rem units)
 */
/**
 * Box component for flexible layout
 * @param {IBox} props - Box component props
 * @returns {React.ReactNode} - Rendered Box component
 */
import styled from "styled-components";

export interface IBox {
  w?: string;
  h?: string;
  p?: string | number | number[];
  m?: string | number | number[];
  fd?: "r" | "c" | "rr";
  j?: "start" | "end" | "center" | "between" | "around" | "evenly";
  a?: "start" | "end" | "center" | "stretch";
  br?: string;
  hasOutline?: boolean;
  bg?: string;
  gap?: string;
}

const Box = styled.div<IBox>`
  width: ${(props) => props.w || "100%"};
  height: ${(props) => props.h};
  padding: ${(props) => {
    const padding = props.p;
    if (Array.isArray(padding)) {
      return padding.map((item) => `${item}rem`).join(" ");
    } else {
      return padding;
    }
  }};
  margin: ${(props) => {
    const margin = props.m;
    if (Array.isArray(margin)) {
      return margin.map((item) => `${item}rem`).join(" ");
    } else {
      return margin;
    }
  }};
  border-radius: ${(props) => (props.br ? props.br : "")};
  display: flex;
  flex-direction: ${(props) => flexDirectionMap[props.fd || "r"]};
  justify-content: ${(props) => {
    switch (props.j) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      case "between":
        return "space-between";
      case "around":
        return "space-around";
      case "evenly":
        return "space-evenly";
      default:
        return "flex-start";
    }
  }};
  align-items: ${(props) => {
    switch (props.a) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      case "stretch":
        return "stretch";
      default:
        return "flex-start";
    }
  }};
  background: ${({ bg }) => {
    return bg ? bg : "";
  }};
  border: ${(props) => (props.hasOutline ? "2px solid #000" : "none")};
  gap: ${({ gap }) => {
    return gap ? gap : "";
  }};
  white-space: nowrap;
`;

export default Box;

interface IRow extends IBox {}

const Row = styled(Box)<IRow>`
  flex-direction: row;
`;

interface IColumn extends IBox {}

const Col = styled(Box)<IColumn>`
  flex-direction: column;
`;

const flexDirectionMap: Record<string, string> = {
  r: "row",
  c: "column",
  rr: "row-reverse",
};
export { Row, Col };
