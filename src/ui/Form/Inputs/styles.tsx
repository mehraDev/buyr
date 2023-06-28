import styled from "styled-components";

interface ILabel {
    top?: boolean
}

interface IInputWrapper {
    top?: boolean
}

export const InputWrapper = styled.div<IInputWrapper>`
  display: flex;
  flex-direction: ${({top}) => top ? 'column' : 'row'};
  align-items: ${({top}) => top ? '' : 'center'};
`;

const Label = styled.label<ILabel>`
    font-weight: 500;
    margin-bottom: ${({top}) => top ? '0.25rem' : '0'};
    margin-right: ${({top}) => !top ? '0.5rem' : '0'};
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
`;

const PriceVegNonVegWrapper = styled(FlexBox)`
    gap: 2rem;
    justify-content: space-evenly;
`;


export {Label,FlexBox,PriceVegNonVegWrapper};