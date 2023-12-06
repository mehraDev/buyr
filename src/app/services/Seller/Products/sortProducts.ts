import { ESortType } from "app/components/Seller/components/Templates/Food/FoodMenu";
import { IProductFood } from "app/interfaces";

function sortProductsFood(products: IProductFood[], sortType: ESortType): IProductFood[] {
  switch (sortType) {
    case ESortType.PriceLowToHigh:
      return products.sort((a, b) => getProductPrice(a, true) - getProductPrice(b, true));
    case ESortType.PriceHighToLow:
      return products.sort((a, b) => getProductPrice(b, false) - getProductPrice(a, false));
    case ESortType.AlphabeticalAsc:
      return products.sort((a, b) => a.name.localeCompare(b.name));
    case ESortType.AlphabeticalDesc:
      return products.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return products;
  }
}

function getProductPrice(product: IProductFood, isLowToHigh: boolean): number {
  if (product.variants && product.variants.length > 0) {
    const prices = product.variants.map((variant) => variant.price);
    return isLowToHigh ? Math.min(...prices) : Math.max(...prices);
  } else {
    return product.price as number;
  }
}

export default sortProductsFood;
