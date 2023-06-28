import styled, { CSSObject } from 'styled-components';

interface ICard {
  p?: string;
  fd?: 'row' | 'column';
}

const Card = styled.div<ICard>`
  padding: ${props => props.p || '16px'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  border: 1px solid red;
  ${props => getFlexStyles(props)};
`;

export default Card;

const getFlexStyles = (props: ICard): CSSObject => {
  if (props.fd === 'row') {
    return {
      display: 'flex',
      flexDirection: 'row',
    };
  }
  return {
    display: 'flex',
    flexDirection: 'column',
  };
};

