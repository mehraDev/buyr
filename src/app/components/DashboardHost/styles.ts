import styled from "styled-components";

interface HostWrapperProps{
    height?: number
};

const HostWrapper = styled.div<HostWrapperProps>`
     height: ${({height}) => `${height}px`};
`;

export default HostWrapper