import React from 'react';
import styled, { keyframes } from 'styled-components';

const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
`;

const Dot = styled.div<{ isOnline: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.isOnline ? '#00C853' : '#F44336'};
  cursor: default;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
     background-color:#00c853;
    animation: ${ripple} 1.5s linear infinite;
  }
`;

interface Props {
  isOnline: boolean;
}

const StatusDot: React.FC<Props> = ({ isOnline }) => {
  return <Dot isOnline={isOnline} />;
};

export default StatusDot;
