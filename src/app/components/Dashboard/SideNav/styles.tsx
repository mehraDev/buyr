import styled, { keyframes } from "styled-components"
import media from "ui/Utils/Media/media";

interface SideNavWrapperProps {
  show: boolean;
  expanded: boolean
}

const slideInAnimation = keyframes`
  from {
    transform: translateX(-110%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOutAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-110%);
  }
`;

const SideNavWrapper = styled.div<SideNavWrapperProps>`
  position:${({expanded,show}) => (!expanded  && show ) ? 'relative' : 'absolute'};
  float: left;
  z-index: 100;
  height: calc(100% - 3.5rem);
  transition: width 0.2s ease-in-out;
  background: linear-gradient(43deg, rgb(1, 29, 54) 39%, rgb(8, 35, 60) 39%, rgb(7, 31, 54) 100%);
  top: 3.5rem;
  animation: ${({ show }) => (show ? slideInAnimation : slideOutAnimation)} 0.3s forwards;
  flex-direction: column;
  
  & > div:first-child {
    height: 3.5rem;
    display: none;
    border-bottom: 1px solid #9f9f9f;
    padding-left: ${({expanded}) => expanded ? '2rem' : '1.3rem'};
  }
  & > nav {
    margin-top: 1.5rem;
  }
  > div:first-of-type div {
    margin-right: 6rem;
   
  }
  ${media.desktop}{
      display: block;
      position: relative;
      float: left;
      height: calc(100%);
      top: 0rem;
      animation: none;
      & > div {
        display: flex;
      }
    & > div:first-child {
    display: flex;
  }
  }
`

interface SideNavListWrapperProps{
  expanded?: boolean
}
export const SideNavListWrapper = styled.nav<SideNavListWrapperProps>`
    padding: ${({expanded}) => expanded ? '0 1rem': '0 0.25rem'};
    ${media.desktop}{
      padding: ${({expanded}) => expanded ? '0 1rem': '0 0.5rem'};
    }
`

export const SideNavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  text-decoration: none;
  cursor: pointer;
  color: #ffffffcc;
  border-radius: 0.25rem;
  padding: .5rem 1.25rem;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #e6f7ff31;
  }

  &.active {
    background-color: #007aea;
    color: rgba(255, 255, 255, 1);
    font-weight: bold;
  }
`
interface SideNavLabelProps {
  show: boolean;
}

export const SideNavLabel = styled.span<SideNavLabelProps>`
  display: ${({show}) => show  ? 'flex' : 'none'};
  margin-left: 1.5rem;
`

interface SideNavAccountLabelProps {
  show: boolean;
}

export const SideNavAccountLabel = styled.span<SideNavAccountLabelProps>`
  display: ${({show}) => show  ? 'flex' : 'none'};
  margin-left: 1rem;
  margin-right: 0.5rem;
  text-transform: capitalize;
`
export const ToggleButton = styled.button`
    padding: 0.5rem;
    position: absolute;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background: none;
    bottom: 2rem;
    right: 1rem;

  &:hover {
    background-color: rgb(0, 122, 234);
    & > svg {
            opacity: 1;
        }
  }
  & > svg {
        opacity: 0.8;
    }
`
export const Button = styled.div`
  padding: 0.5rem;
  border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    background: none;
    &:hover {
    background-color: rgb(0, 122, 234);
    & > svg {
            opacity: 1;
        }
  }
  & > svg {
        opacity: 0.8;
    }
`;
export const SettingButton = styled(Button)`
  padding: 0.5rem;
  position: relative;
  margin-bottom: 0.5rem;
`

interface AccountWrapperProps {
  expanded: boolean;
}

export const SettingPopupWrapepr = styled.div`
     position: absolute;
  bottom: 0rem;
  left: 2rem;
  z-index: 99999;
  background: ${({theme}) => theme.neutralColor.bgElevated};
  width: 12rem;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: ${({theme}) => theme.neutralColor.textSecondary};

  /* Optional: Add transition for animation */
  transition: opacity 0.2s ease-in-out;

  /* Optional: Adjust the placement of the arrow */
  ::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #000000;
  }

  /* Optional: Adjust the text alignment */
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const AccountWrapper = styled.div<AccountWrapperProps>`
  display: flex;
  flex-direction: ${({expanded}) => expanded ? 'row': 'column'};;
  justify-content  : space-between ;
  color: #ffffffde;
  width: 100%;
  position: absolute;
    bottom: 6rem;
    border-bottom: 1px solid rgb(159, 159, 159);
    padding: ${({expanded}) => expanded ? '0 0.5rem': '0 0.25rem'};
    ${media.desktop}{
      padding: ${({expanded}) => expanded ? '0 0.5rem': '0 0.5rem'};
    }
`
export default SideNavWrapper;