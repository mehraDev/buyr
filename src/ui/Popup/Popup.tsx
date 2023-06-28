import React from 'react';
import styled from 'styled-components';

interface IPopupProps {
  onClose: () => void;
  children: React.ReactNode;
  isOpen: boolean;
  title: string
}

const Popup: React.FC<IPopupProps> = ({ onClose, children ,isOpen,title}) => {
    if (!isOpen) {
        return null;
      }
  return (
    <Overlay>
      <PopupContainer>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>X</CloseButton>
        </Header>
        <Content>{children}</Content>
      </PopupContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the transparency as needed */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContainer = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const Content = styled.div`
  /* Add any additional styling for the content */
`;

export default Popup;
