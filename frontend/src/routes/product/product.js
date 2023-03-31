const API_ENDPOINT = 'http://localhost:3000/api'

export async function getProducts() {
  const response = await fetch(`${API_ENDPOINT}/product`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const products = await response.json();
  return products;
}

export async function createProduct(product) {
  return fetch(`${API_ENDPOINT}/product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
}

export async function getProduct(productId) {
  const response = await fetch(`${API_ENDPOINT}/product/${productId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const products = await response.json();
  return products;
}

export async function updateProduct(productId, product) {
  return fetch(`${API_ENDPOINT}/product/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
}

export async function deleteProduct(productId) {
  return fetch(`${API_ENDPOINT}/product/${productId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
}
