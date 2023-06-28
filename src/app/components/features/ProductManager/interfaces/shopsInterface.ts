import { IViewer, IViewerFood } from "./viewerInterface";

interface IShops {
    [key: string]: React.FC<IViewer>;
    food: React.FC<IViewerFood>;
  }

  export default IShops;