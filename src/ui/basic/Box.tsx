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

interface IBox {
  /**
   * Width of the box (e.g., "200px", "50%")
   */
  w?: string;
  /**
   * Height of the box (e.g., "200px", "50%")
   */
  h?: string;
  /**
   * Padding of the box
   */
  p?: string;
  /**
   * Flex direction of the box ('r' for row, 'c' for column)
   */
  fd?: "r" | "c";
  /**
   * Justify content of the box
   */
  j?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  /**
   * Align items of the box
   */
  a?: 'start' | 'end' | 'center' | 'stretch';
  /**
   * Margins of the box (array of numbers representing rem units)
   */
  m?: number[];
}

const Box = styled.div<IBox>`
  width: ${(props) => props.w || "100%"};
  height: ${(props) => props.h};
  padding: ${props => props.p};
  display: flex;
  flex-direction: ${(props) => (props.fd === 'c' ? 'column' : 'row')};
  justify-content: ${(props) => {
    switch (props.j) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'center':
        return 'center';
      case 'between':
        return 'space-between';
      case 'around':
        return 'space-around';
      case 'evenly':
        return 'space-evenly';
      default:
        return 'flex-start';
    }
  }};
  align-items: ${(props) => {
    switch (props.a) {
      case 'start':
        return 'flex-start';
      case 'end':
        return 'flex-end';
      case 'center':
        return 'center';
      case 'stretch':
        return 'stretch';
      default:
        return 'flex-start';
    }
  }};
  margin: ${(props) =>
    props.m ? props.m.map((item) => item + 'rem').join(' ') : ''};
`;

export default Box;
