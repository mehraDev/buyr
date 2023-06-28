import styled from "styled-components"

interface SideNavWrapperProps{
  isOpen?: boolean
}

const SideNavWrapper = styled.div<SideNavWrapperProps>`
  position: relative;
  padding: ${(props) => (props.isOpen ? '1rem' : '1rem 4px')};
  height: 100vh;
  background-image: url('/assets/sidenavBg.png');
  /* background-color: #061e34; */
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: width 0.2s ease-in-out;
  ${(props) => (props.isOpen ? `width: 250px;` : `width: 70px;`)};
  background: linear-gradient(43deg, rgb(1, 29, 54) 39%, rgb(8, 35, 60) 39%, rgb(7, 31, 54) 100%);
`
export const SideNavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-decoration: none;
  cursor: pointer;
  color: #ffffffcc;
  border-radius: 4px;
  padding: 10px 20px; /* default padding */
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
export default SideNavWrapper;