import styled, { css } from "styled-components";

export const PanelHeader = styled.div`
  margin-bottom: 0.5rem;
  padding: 1rem;
  font-size: large;
  display: flex;
  flex-direction: row;
  font-weight: 700;
  align-items: center;
  border-bottom: 1px solid ${({theme }) => theme.neutralColor.border};
  color: ${({theme }) => theme.brandColor.primaryActive};
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
  div{
    margin-right: 1rem;
  }
  h3 {
    flex-grow: 1;
    text-align: center;
    margin-right: 2rem;
  }
`;
