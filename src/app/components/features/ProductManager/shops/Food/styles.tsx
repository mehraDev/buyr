import styled from "styled-components";
import media from "ui/Utils/Media/media";

export const ProductManagerWrapper = styled.div`
    height: 100%;
    position: relative;
    background: ${({theme}) => theme.neutralColor.bgContainer};
`;




export const ControlsWrapper = styled.div`
   padding: 0.5rem 1.5rem;
    display: flex;
    background: ${({theme}) => theme.neutralColor.bgContainer};
    height: 3rem;
    justify-content: space-between;
`;

export const OptionsWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        justify-self: end;
        margin-right: 6rem;
`;


export const OptionsWrapperMobileTab = styled.div`
        position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
`
export const OptionsList = styled.div`
  list-style-type: none;
  cursor: pointer;
  background: white;
  border: 1px solid #f5f5f5;
  padding: 1rem;
  margin: 0;
  width: 15rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add box shadow */
  z-index: 999; 
`;

export const OptionItem = styled.li`
  margin-bottom: 0.5rem;
`;

export const SelectWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 3rem;
        margin-right: 6rem;
`;
export const OptionSelector = styled.div`
  position: absolute;
    bottom: 0;
    width: 100%;
    left: 0px;
    height: 3rem;
    
   
`;

export const Options = styled.div`
  padding: 0.5rem;
  background: ${({theme}) => theme.neutralColor.bgContainer};
  border: 1px solid ${({theme}) => theme.neutralColor.borderSecondary};
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`
export const Option = styled.div`
  background: white;
  flex: 1;
  color: ${({theme}) => theme.brandColor.primary};
  border: 1px solid ${({theme}) => theme.neutralColor.border};
    padding: 0.5rem;
    border-radius: 6px;
  
`