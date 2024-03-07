export const getAllProducts = async () => {
  const responseProducts = await fetch(
    "https://dummyjson.com/products?limit=95"
  );
  const productsData = await responseProducts.json();
  return productsData.products;
};

export const getProductsByCategory = async (category) => {
  const responseProductByCategory = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const productsByCategory = await responseProductByCategory.json();
  return productsByCategory.products;
};
