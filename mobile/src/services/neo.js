import axios from 'axios';
import { NASA_API_KEY } from '@env';

const neo = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1',
  params: {
    api_key: NASA_API_KEY
  }
});

export default neo;