import styled  from "styled-components";

interface DashboardWrapperProps {
  height?: number;
}

export const DashboardWrapper = styled.div<DashboardWrapperProps>`
  height: ${props => props.height}px;
  min-width: 256px;
  display: flex;
  width: 100%;
  position: fixed;
`;


const DashboardBodyWrapperStyle = styled.div`
  height: calc(100vh - 3.5rem);
`;

export default DashboardBodyWrapperStyle;