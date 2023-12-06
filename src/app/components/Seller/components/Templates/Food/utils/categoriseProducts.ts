import { IProductFood } from "app/interfaces";

interface ICategory {
  products: IProductFood[];
  subCategories: Record<string, ICategory>;
}

const MAX_CATEGORY_DEPTH = 3;

function categoriseProducts(products: IProductFood[]): Record<string, ICategory> {
  const rootCategories: Record<string, ICategory> = {};

  for (const product of products) {
    let currentCategories: Record<string, ICategory> = rootCategories;

    const categoryNames = (!product.category ? ["Others"] : product.category.split("/")).map((cat) => cat.toLowerCase());

    if (categoryNames.length > MAX_CATEGORY_DEPTH) {
      throw new Error("Category depth exceeded the maximum allowed depth.");
    }

    categoryNames.forEach((catName, index) => {
      if (!currentCategories[catName]) {
        currentCategories[catName] = { products: [], subCategories: {} };
      }
      if (index === categoryNames.length - 1) {
        currentCategories[catName].products.push(product);
      } else {
        currentCategories = currentCategories[catName].subCategories;
      }
    });
  }
  const sortedCategoriesArray = Object.entries(rootCategories).sort((a, b) => {
    return a[0].localeCompare(b[0]);
  });

  const sortedRootCategories: Record<string, ICategory> = {};
  for (const [key, value] of sortedCategoriesArray) {
    sortedRootCategories[key] = value;
  }

  return sortedRootCategories;
}

export default categoriseProducts;
