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
export const updatePharmacy = (formData, id) => API.patch(`/user/updatePharmacy/${id}`, formData);


// PRODUCTS
export const createProduct = (formData) => API.post('/products/pharmacy/add-product', formData);
export const getProducts = () => API.get('/products/pharmacy/productsList');
export const getProductsLebanon = () => API.get('/products/pharmacy/productsLebanon');
export const getProductDetails = (id) => API.get(`/products/${id}`);
export const getProductsbySearch = (search) => API.get(`/products/pharmacy/productsList/${search}`);
export const getPharmacyProducts = (id) => API.get(`/products/pharmacy/pharmacyProductsList/${id}`);
export const getPharmacyProductsbySearch = (id, search) => API.get(`/products/pharmacy/pharmacyProductsList/${id}/${search}`);
export const getSearchedProductsSuggestions = (search) => API.get(`/products/pharmacy/searchedProductsSuggestions/${search}`);
export const getProductbyName = (formData) => API.get('/products/pharmacy/prod-name', formData);
export const deleteProduct = (id) => API.delete(`/products/pharmacy/delete-product/${id}`);
export const productBulkUpload = (formData) => API.post('/products/pharmacy/bulk-upload', formData);


// REQUEST DRUG
export const requestDrug = (formData) => API.post('/products/request-drug', formData);
export const getPharmacyRequestedDrugs = (id) => API.get(`/products/pharmacy/requested-drug/${id}`);
export const getPharmacyNotifications = () => API.get('/products/pharmacy/notifications');
export const getPharmacyNotification = (id) => API.get(`/products/pharmacy/notification/${id}`);
export const updateIsReadNotif = (id) => API.patch(`/products/pharmacy-notif/${id}`);


// CARTS
export const createCart = (formData) => API.post('/carts/create-cart', formData);
export const getCustomerCart = (id) => API.get(`/carts/cart-items/${id}`);
export const getCustomerCartUnconfirmed = (id) => API.get(`/carts/cart-items-unconfirmed/${id}`);
export const deleteOrderItem = (id) => API.delete(`/carts/delete-order-item/${id}`);
export const updateCheckoutStatus = (formData, prescription) => API.patch('/carts/update-status-confirmation', {formData, prescription});
export const getLoggedPharmacyOrders = (pharmaId) => API.get(`/carts/pharmacy-orders/${pharmaId}`);
export const updateOrderStatus = (id, formData) => API.patch(`/carts/update-cart-status/${id}`, formData);

//LOGS
export const getPharmacyLogs = (id) => API.get(`/logs/pharmacy-logs/${id}`);
export const createRefillLog = (id, formData) => API.post(`/logs/refill-product-stock/${id}`, formData);

