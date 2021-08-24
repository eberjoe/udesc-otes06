import axios from 'axios';

const db = axios.create({
    baseURL: 'http://192.168.0.149:3333',
});

export default db;