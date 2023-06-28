import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FolderViewer from "./FolderViewer";
import { PanelHeader } from "ui/headers";
import Icon, { IconName } from "ui/Icon";
import { listAll, ref } from "firebase/storage";
import { storage } from "firebaseServices/firebase";

interface IFileExplorer {
  root: string
}

const FileExplorer: React.FC<IFileExplorer> = ({root}) => {
  const [currentPath, setCurrentPath] = useState([root]);
  const [, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [subFoldersList, setSubFoldersList] = useState<string[]>([]);
  const [files, setFilesList] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const path = currentPath.join('/');

  useEffect(() => {
    const fetchFolderContents = async () => {
      try {
        setLoading(true);
        setError(false);
        const folderRef = ref(storage, path);
        const folderData = await listAll(folderRef);
        const subFoldersMetaData = folderData.prefixes;
        const subFolders = subFoldersMetaData.map(prefix => prefix.name);
        const filesMetaData = folderData.items;
        const files = filesMetaData.map(file => file.name)
        setSubFoldersList(subFolders);
        setFilesList(files);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchFolderContents();
  }, [path]);
  
  const handleBreadCrumb = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
  };
  const handleGoBack = () => {
    if (currentPath.length === 1) {
      return;
    }
    const newPath = currentPath.slice(0, -1);
    setCurrentPath(newPath);
  };
  const handleFolderClick = (folderName:string) => {
    setSelectedImage(null);
    setCurrentPath((prevPath) => [...prevPath,folderName]); // Update the current path
  };
  const handleFileClick = (folderName:string) => {
    setSelectedImage(null);
    setCurrentPath((prevPath) => [...prevPath,folderName]); // Update the current path
  };

  return (
    <ExplorerContainer>
      <PanelHeader>
        <Icon name={IconName.GoBack}  onClick={handleGoBack}/>
        <BreadCrumbs>{
          currentPath.map((path,index) => (
            <BreadCrumb key={index}>
              <span onClick={() => handleBreadCrumb(index)}>{path}</span>
              {
                index !== 0 && 
                <Icon name={IconName.LeftArrow} />
              }
            </BreadCrumb>
          ))
        }</BreadCrumbs>
      </PanelHeader>
      <FolderViewer foldersList={subFoldersList} onFolderClick={(name) => handleFolderClick(name)} isLoading={loading} filesList={files} hasError={error} onFileClick={(name) => handleFileClick(name)}/>
      <ImageList></ImageList><PreviewPane></PreviewPane><SearchBar></SearchBar>
    </ExplorerContainer>
  );
};

// Styled components
const ExplorerContainer = styled.div`
  /* Styles for the main container */
`;

const BreadCrumbs = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
  & > span:not(:last-child)::after {
    content: "/";
    margin: 0 5px;
  }
`;

const BreadCrumb = styled.div`
    display: flex;
    :hover{
      text-decoration: underline;
    }
`;

const ImageList = styled.div`
  /* Styles for the list of images */
`;

const PreviewPane = styled.div`
  /* Styles for the image preview pane */
`;

const SearchBar = styled.div`
  /* Styles for the search bar */
`;


export default FileExplorer;
