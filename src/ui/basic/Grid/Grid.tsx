import styled from "styled-components";
import Box, { IBox } from "../Box";

interface IGrid extends IBox {
  columns?: number;
  mc?: number | number[] | undefined;
}

const Grid = styled(Box)<IGrid>`
  flex-wrap: wrap;

  > div {
    width: ${(props) => {
      const { columns, mc } = props;

      if (columns) {
        const margins = Array.isArray(mc)
          ? mc
          : [mc || 0, mc || 0, mc || 0, mc || 0];
        const marginLength = margins.length;

        let widthCalc = "100%";

        if (marginLength === 1) {
          widthCalc = `calc((100% - ${
            margins[0] * 2
          }rem * ${columns}) / ${columns})`;
        } else if (marginLength === 2) {
          widthCalc = `calc((100% - ${
            margins[1] * 2
          }rem * ${columns}) / ${columns})`;
        } else if (marginLength === 3) {
          widthCalc = `calc((100% - ${
            (margins[1] + margins[2]) * 2
          }rem * ${columns}) / ${columns})`;
        } else if (marginLength >= 4) {
          widthCalc = `calc((100% - ${
            (margins[1] + margins[3]) * 2
          }rem * ${columns}) / ${columns})`;
        }

        return widthCalc;
      }

      return "100%";
    }};

    margin: ${(props) =>
      Array.isArray(props.mc)
        ? props.mc.map((mc) => `${mc}rem`).join(" ")
        : `${props.mc || 0}rem`};
  }
`;

export default Grid;
