import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    font-family: 'Manrope', sans-serif;
  }
  *{
    box-sizing: border-box;
  }
`;
export default GlobalStyle;
