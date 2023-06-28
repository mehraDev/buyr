import { IProduct, IProductFood } from "./productInterface";

export interface IViewer{
    products: IProduct[];
  }

  export interface IViewerFood{
    products: IProductFood[];
  }