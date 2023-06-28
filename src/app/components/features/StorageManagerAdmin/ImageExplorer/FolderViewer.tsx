import styled, { keyframes } from "styled-components";

interface IFolderViewer{
  foldersList: string[];
  filesList: string[];
  onFolderClick:  (folderName: string) => void;
  onFileClick:  (folderName: string) => void;
  isLoading: boolean;
  hasError: boolean;
}
const FolderViewer: React.FC<IFolderViewer> = ({ foldersList, onFolderClick,isLoading,filesList,onFileClick}) => {
  
  return (
    <FolderViewerWrapper>
      {isLoading ? (
        <LoadingAnimation>
          <DotAnimation />
        </LoadingAnimation>
      ) : <>
      {foldersList.map((folder,index) => (
        <FolderWrapper key={index} onClick={() => onFolderClick(folder)}>
          {folder}
        </FolderWrapper>
      ))}
      {filesList.map((image,index) => (
        <ImageFileWrapper key={index} onClick={() => onFileClick(image)}>
          {image}
        </ImageFileWrapper>
      ))}
    </>}
    </FolderViewerWrapper>

  );
};

const FolderViewerWrapper = styled.div`
  padding: 10px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* Set the desired width */
  height: 800px; /* Set the desired height */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-auto-rows: 10rem;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    grid-auto-rows: 8rem;
  }
`;

const ImageFileWrapper = styled.div`
  /* Styles for each image item */
`;

const FolderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

    margin-top: 10px;
    font-weight: bold;
  &:hover {
    background-color: rgb(71 255 125 / 66%);
  }

  .icon {
    margin-right: 0.5rem;
    color: #666;
  }
  background-color: rgb(86 255 135 / 30%);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LoadingAnimation = styled.div`
  position: relative;
  width: 100%;
  height: 200px; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const dotAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  30% {
    transform: scale(1.2);
    opacity: 1;
  }
  70% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const DotAnimation = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.brandColor.primary};

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.brandColor.primary};
    animation: ${dotAnimation} 1.2s infinite;
  }

  &::before {
    top: -60px;
    left: 0;
  }

  &::after {
    top: 60px;
    left: 0;
  }
`;

export default FolderViewer;
