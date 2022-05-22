import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

// USERS
export const login = (formData) => API.post('/user/login', formData);
export const signUpBuyer = (formData) => API.post('/user/signup/buyer', formData);
export const signUpPharmacy = (formData) => API.post('/user/signup/pharmacy', formData);
export const getPharmaciesList = () => API.get('/user/pharmaciesList');
export const getUser = (id) => API.get(`/user/${id}`);
export const getUsers = () => API.get('/user');


// PRODUCTS
export const createProduct = (formData) => API.post('/products/pharmacy/add-product', formData);
export const getProducts = () => API.get('/products/pharmacy/productsList');
export const getProductsbySearch = (search) => API.get(`/products/pharmacy/productsList/${search}`);
export const getPharmacyProducts = (id) => API.get(`/products/pharmacy/pharmacyProductsList/${id}`);
export const getPharmacyProductsbySearch = (id, search) => API.get(`/products/pharmacy/pharmacyProductsList/${id}/${search}`);
export const getSearchedProductsSuggestions = (search) => API.get(`/products/pharmacy/searchedProductsSuggestions/${search}`);


//REQUEST DRUG
export const requestDrug = (formData) => API.post('/products/request-drug', formData);
export const getPharmacyRequestedDrugs = () => API.get('/products/pharmacy/requested-drug');
export const getPharmacyNotifications = () => API.get('/products/pharmacy/notifications');