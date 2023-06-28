import { PanelHeader } from "ui/headers";
import FileExplorer from "./ImageExplorer/FileExplorer";

const StorageManagerAdmin = () => {
  return (
    <div>
        <PanelHeader color="#c9304b">
            <h3>Image Pool Manager</h3>
        </PanelHeader>
        <FileExplorer root="s"/>
    </div>
  );
};
export default StorageManagerAdmin;
