import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const login = (formData) => API.post('/user/login', formData);
export const signUpBuyer = (formData) => API.post('/user/signup/buyer', formData);
export const signUpPharmacy = (formData) => API.post('/user/signup/pharmacy', formData);
export const getPharmaciesList = () => API.get('/user/pharmaciesList');