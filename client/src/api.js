import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_SERVER || 'http://localhost:4000/api' });
export default API;
