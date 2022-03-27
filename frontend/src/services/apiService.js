import axios from 'axios';

export async function apiGetAllProducts() {
  const { data } = await axios.get('http://localhost:3001/products');
  return data;
}

export async function apiGetProductFrom(productId) {
  const { data } = await axios.get(`http://localhost:3001/products?id=${productId}`);
  return data;
}
