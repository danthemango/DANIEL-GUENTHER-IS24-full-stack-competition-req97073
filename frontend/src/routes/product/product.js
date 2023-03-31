import fakeNetwork from "../../fakenetwork";
import sortBy from "sort-by";
import staticProducts from './product_static.json';

export async function getProducts(query) {
  await fakeNetwork();
  let products = staticProducts;
  if (query) {
    products = matchSorter(products, query, { keys: ["first", "last"] });
  }
  return products.sort(sortBy("last", "createdAt"));
}

export async function createProduct(product) {
  let productId = Math.random().toString(36).substring(2, 9);
  product.productId = productId;
  let products = await getProducts();
  products.unshift(product);
  return product;
}

export async function getProduct(productId) {
  let products = await getProducts();
  let product = products.find(product => product.productId === productId);
  return product ?? null;
}

export async function updateProduct(productId, updates) {
  let products = await getProducts();
  let product = products.find(product => product.productId === productId);
  if (!product) throw new Error("No product found for", productId);
  Object.assign(product, updates);
  return product;
}

export async function deleteProduct(productId) {
  let products = await getProducts();
  let index = products.findIndex(product => product.productId === productId);
  if (index > -1) {
    products.splice(index, 1);
    return true;
  }
  return false;
}
