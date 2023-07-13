import { IProductFood } from 'app/interfaces';

interface Category {
  products: IProductFood[];
  subCategories: Category[];
}

function convertProductsToStructure(products: IProductFood[]): { [name: string]: Category } {
  if (!products || products.length === 0) {
    return {};
  }

  const categorisedProducts: { [name: string]: Category } = {};

  categorisedProducts['Others'] = { products: [], subCategories: [] };

  for (const product of products) {
    const categoryNames = Array.isArray(product.category) ? product.category : [product.category];

    if (categoryNames[0] && categoryNames.length === 1) {
      const categoryName = categoryNames[0];

      if (categorisedProducts[categoryName]) {
        if (categorisedProducts[categoryName].products) {
          categorisedProducts[categoryName].products.push(product);
        } else {
          categorisedProducts[categoryName].products = [product];
        }
      } else {
        categorisedProducts[categoryName] = {
          products: [product],
          subCategories: [],
        };
      }
    } else {
      categorisedProducts['Others'].products.push(product);
    }
  }
  console.log(categorisedProducts)
  return categorisedProducts;
}

export default convertProductsToStructure;
