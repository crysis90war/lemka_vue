import axios from 'axios';
import authHeader from "./auth-header";

const baseDomain = process.env.VUE_APP_NODE_END === 'development' ? 'http://127.0.0.1:8000' : 'https://lemka-api.herokuapp.com';
const baseUrl = `${baseDomain}`;

export default axios.create({
    baseURL: baseUrl,
    headers: authHeader()
});