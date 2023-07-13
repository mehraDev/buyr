export interface IProduct {
    id?: number;
    name: string;
    price?: number | undefined;
    description?: string;
    image?: string ;
}

export interface IProductFood extends IProduct {
  veg? : boolean;
  category?: string[] | string;
}