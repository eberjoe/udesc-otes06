import axios from 'axios';

const neo = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1',
  params: {
    api_key: process.env.NASA_API_KEY
  }
});

export default neo;