import axios from 'axios';

const api = axios.create({
    baseURL: (process.env.HOST ||'http://localhost:3333/api/')
})

export default api;
