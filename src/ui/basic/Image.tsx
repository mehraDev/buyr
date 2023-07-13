import styled from "styled-components";

interface IImg {
  w?: string;
  h?: string;
  br?: string;
}

const Img = styled.img<IImg>`
  width: ${(props) => props.w || "100%"};
  height: ${(props) => props.h || "100%"};
  border-radius: ${(props) => props.br || ""};
`;
export { Img };
