
import axios from 'axios';

// Must match API base URL/port
export const api = axios.create({
  baseURL: 'https://localhost:7075/api',
});
