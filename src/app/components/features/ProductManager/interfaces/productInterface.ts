export interface IProduct {
    id: number;
    name: string;
    price?: number | undefined;
    description?: string;
    image?: string | File | null;
    
}

export interface IProductFood extends IProduct {
  isVeg? : boolean;
}