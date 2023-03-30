import fakeNetwork from "../../fakenetwork";
import localforage from "localforage";
import sortBy from "sort-by";
import staticProducts from './product_static.json';

export async function getProducts(query) {
  await fakeNetwork(`getProducts:${query}`);
  let products = await localforage.getItem("products");
  if (!products) products = staticProducts;
  if (query) {
    products = matchSorter(products, query, { keys: ["first", "last"] });
  }
  return products.sort(sortBy("last", "createdAt"));
}

export async function createProduct() {
  await fakeNetwork();
  let productId = Math.random().toString(36).substring(2, 9);
  let product = { productId, createdAt: Date.now() };
  let products = await getProducts();
  products.unshift(products);
  await set(products);
  return product;
}

export async function getProduct(productId) {
  await fakeNetwork(`product:${productId}`);
  let products = await getProducts();
  let product = products.find(product => product.productId === productId);
  return product ?? null;
}

export async function updateProduct(productId, updates) {
  await fakeNetwork();
  let products = await localforage.getItem("products");
  let product = products.find(product => product.productId === productId);
  if (!product) throw new Error("No product found for", productId);
  Object.assign(product, updates);
  await set(products);
  return product;
}

export async function deleteProduct(productId) {
  let products = await localforage.getItem("products");
  let index = products.findIndex(product => product.productId === productId);
  if (index > -1) {
    products.splice(index, 1);
    await set(products);
    return true;
  }
  return false;
}

function set(products) {
  return localforage.setItem("products", products);
}