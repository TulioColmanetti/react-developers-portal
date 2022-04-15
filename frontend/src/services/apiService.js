import axios from 'axios';

export async function apiGetAllProducts() {
  const { data } = await axios.get('http://localhost:3001/products');
  return data;
}

export async function apiGetProductFrom(productId) {
  const { data } = await axios.get(`http://localhost:3001/products?id=${productId}`);
  return data;
}

export async function apiGetAllServices() {
  const { data } = await axios.get('http://localhost:3001/services');
  return data;
}

export async function apiGetServiceFrom(serviceId) {
  const { data } = await axios.get(`http://localhost:3001/services?id=${serviceId}`);
  return data;
}
