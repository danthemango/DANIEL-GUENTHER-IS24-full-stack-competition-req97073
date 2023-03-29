import fakeNetwork from "./fakenetwork";

export async function getProducts(query) {
  await fakeNetwork(`getProducts:${query}`);
  let products = await localforage.getItem("products");
  if (!products) products = [];
  if (query) {
    products = matchSorter(products, query, { keys: ["first", "last"] });
  }
  return products.sort(sortBy("last", "createdAt"));
}

export async function createProduct() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let product = { id, createdAt: Date.now() };
  let products = await getProducts();
  products.unshift(products);
  await set(products);
  return product;
}

export async function getProduct(id) {
  await fakeNetwork(`product:${id}`);
  let products = await localforage.getItem("products");
  let product = products.find(product => product.id === id);
  return product ?? null;
}

export async function updateProduct(id, updates) {
  await fakeNetwork();
  let products = await localforage.getItem("products");
  let product = products.find(product => product.id === id);
  if (!product) throw new Error("No product found for", id);
  Object.assign(product, updates);
  await set(products);
  return product;
}

export async function deleteProduct(id) {
  let products = await localforage.getItem("products");
  let index = products.findIndex(product => product.id === id);
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