import styled, { keyframes } from "styled-components";

interface ILoadingAnimation {
  iconType?: boolean;
  bw?: string;
  height?: string;
  width?: string;
  p?: string;
}

const LoadingAnimation: React.FC<ILoadingAnimation> = ({
  iconType = false,
  bw = "4px",
  height = "24px",
  width = "24px",
  p = "2rem",
}) => {
  return (
    <Container p={p} iconType={iconType}>
      <LoadingSpinner bw={bw} height={height} width={width} />
    </Container>
  );
};

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<{ p: string; iconType: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: ${({ iconType }) => (iconType ? "initial" : "100%")};
  padding: ${(props) => props.p};
`;

const LoadingSpinner = styled.div<{
  bw: string;
  height: string;
  width: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-style: solid;
  border-width: ${(props) => props.bw};
  border-color: rgb(5 96 185) rgb(5 96 185) rgb(211 211 211)
    rgba(210, 210, 210, 0.43);
  border-radius: 50%;
  animation: ${spinAnimation} 0.7s linear infinite;
`;

export default LoadingAnimation;
