import { DefaultTheme as StyledDefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends StyledDefaultTheme {
    brandColor: {
      primaryBg: string;
      primaryBgHover: string;
      primaryBorder: string;
      primaryBorderHover: string;
      primaryHover: string;
      primary: string;
      primaryActive: string;
      primaryTextHover: string;
      primaryText: string;
      primaryTextActive: string;

      pinkBg: string;
      pinkBgHover: string;
      pinkBorder: string;
      pinkBorderHover: string;
      pinkHover: string;
      pink: string;
      pinkActive: string;
      pinkTextHover: string;
      pinkText: string;
      pinkTextActive: string;
      
    };
    neutralColor: {
      text: string;
      textSecondary: string;
      textTertiary: string;
      textQuaternary: string;
      border: string;
      borderSecondary: string;
      fill: string;
      fillSecondary: string;
      fillTertiary: string;
      fillQuaternary: string;
      bgContainer: string;
      bgElevated: string;
      bgLayout: string;
      bgSpotlight: string;
      bgMask: string;
    };
    font: {
      fontSize: string;
      fontSizeSM: string;
      fontSizeLG: string;
      fontSizeXL: string;
      fontSizeHeading1: string;
      fontSizeHeading2: string;
      fontSizeHeading3: string;
      fontSizeHeading4: string;
      fontSizeHeading5: string;
    };
    lineHeight: {
      lineHeight: number;
      lineHeightSM: number;
      lineHeightLG: number;
      lineHeightHeading1: number;
      lineHeightHeading2: number;
      lineHeightHeading3: number;
      lineHeightHeading4: number;
      lineHeightHeading5: number;
    };
    shadow :{
      boxShadow: string;
      boxShadowSecondary: string;
    }
  }
}
