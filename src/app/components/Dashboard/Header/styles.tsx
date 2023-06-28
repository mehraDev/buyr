import styled from "styled-components";

export const DashboardHeaderWrapper = styled.div`
    background-color    : white;
    padding: 0 1rem;
    font-family: 'Raleway'; 
    display: flex;
    justify-content: flex-end;
    height: 3rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
    box-shadow: 0px 1px 2px 0px #3c40434d, 0px 1px 3px 1px #3c404326;
`;


export const ShopNameWrapper = styled.div`
    display: flex;
    align-items: center;
    span{
        font-size: x-small;
    margin-right: 0.5rem;
    color: #464545ba;
    }

    h4{
        padding-right: 1rem;
    }
`;

export const DashboardHeaderControlsWrapper = styled.div`
    display: flex;
    align-items: center;

    div{
        margin-right: 1rem;
    }

`;

export const NotificationIconWraper = styled.div`
    border-radius: 4rem;
    padding: 0px 2px 0px;
    border: 6px #fff solid;
    &:hover {
        background: rgb(217 217 217 / 38%); 
        cursor: pointer;
        border: 6px #f0f0f0 solid;
    }  
`;

export const ProfileIconWrapper = styled.div`
    border-radius: 4rem;
    padding: 1px 8px 6px;
    color: white;
    background: #4099ef;
    border: 6px solid white;
    &:hover {
        cursor: pointer;
        background: #146fc7;
        border: 6px solid #f0f0f0;
    }  
`
export const ProfileIconPopupWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  z-index: 100;
  display: ${(props: { show: boolean }) => (props.show ? 'block' : 'none')};
  width: 200px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;