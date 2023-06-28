import styled, { keyframes } from 'styled-components';

const LoadingAnimation = () => {
  return (
    <Container>
      <LoadingSpinner />
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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  position: fixed;
  background-color: #f8f8f8;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border-width: 4px;
    border-style: dotted;
    border-color: rgba(255, 152, 0, 0.89) rgb(190 190 190 / 31%) rgba(255, 152, 0, 0.88) rgb(210 210 210 / 43%);
  border-radius: 50%;
  animation: ${spinAnimation} 0.7s linear infinite;
`;

export default LoadingAnimation;
