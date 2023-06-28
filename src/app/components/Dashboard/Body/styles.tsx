import styled  from "styled-components";
import media from "ui/Utils/Media/media";

const BodyWrapper = styled.div`
  height: calc(100% - 3.5rem);
  top: 3.5rem;
  position: relative;
  width: 100%;
  ${media.desktop}{
    top: 0;
    height: calc(100vh);
  }
`;

const ActiveComponentWrapper = styled.div`
  overflow: scroll;
  height: 100%;
  
`;
export {ActiveComponentWrapper};
export default BodyWrapper;