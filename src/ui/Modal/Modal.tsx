import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
  show: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, children }) => {
  if (!show) {
    return null;
  }

  return (
    <ModalWrapper>
      {children}
    </ModalWrapper>
  );
};

const ModalWrapper =  styled.div`
    top: 0;
    position: absolute;
    padding: 5rem 1rem;
    z-index: 9999;
    background: ${({theme}) => theme.neutralColor.bgMask};
    left: 0;
    width: 100%;
    height: 100%;
`

export default Modal;
