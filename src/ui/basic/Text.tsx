/**
 * @typedef {Object} IText - Props for the Text component
 * @property {string} [s] - Font size in pixels
 * @property {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7} [w] - Font weight (0-7)
 * @property {string} [c] - Text color
 * @property {number[]} [m] - Margins (array of numbers representing rem units)
 * @property {keyof JSX.IntrinsicElements} [as] - HTML tag name for the text element (e.g., 'div', 'span', 'p')
 * @property {string} [mb] - Margin bottom
 * @property {string} [mt] - Margin top
 * @property {string} [mr] - Margin right
 * @property {string} [ml] - Margin left
 * @property {'none' | 'cap' | 'upp' | 'low'} [textTransform] - Text transform property
 */

import styled, { css } from "styled-components";

interface IText {
  s?: string; //px
  w?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  c?: string;
  m?: number[];
  as?: keyof JSX.IntrinsicElements;
  mb?: string;
  mt?: string;
  mr?: string;
  ml?: string;
  tt?: "none" | "cap" | "upp" | "low";
  type?: "heading" | "subheading";
}

const Text = styled.div<IText>`
  font-size: ${(props) => (props.s ? props.s + "px" : "")};
  font-weight: ${(props) => (props.w ? props.w + "00" : "")};
  color: ${(props) => (props.c ? props.c : "")};
  margin: ${(props) =>
    props.m ? props.m.map((item) => item + "rem").join(" ") : ""};
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
  margin-top: ${(props) => (props.mt ? props.mt : "")};
  margin-right: ${(props) => (props.mr ? props.mr : "")};
  margin-left: ${(props) => (props.ml ? props.ml : "")};

  text-transform: ${(props) => {
    switch (props.tt) {
      case "cap":
        return "capitalize";
      case "upp":
        return "uppercase";
      case "low":
        return "lowercase";
      default:
        return props.tt;
    }
  }};
  ${(props) =>
    props.type === "heading" &&
    css`
      font-family: "Manrope", sans-serif;
    `}
  ${(props) =>
    props.type === "subheading" &&
    css`
      font-family: "Manrope", sans-serif;
    `}
    overflow-wrap: break-word;
  white-space: normal;
`;

export default Text;
