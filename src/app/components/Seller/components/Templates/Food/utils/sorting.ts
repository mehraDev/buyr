import { IProductFood } from "app/interfaces";

function sortProductsAlphabetically(products: IProductFood[]): IProductFood[] {
  return products.sort((a, b) => a.name.localeCompare(b.name));
}
export { sortProductsAlphabetically };
