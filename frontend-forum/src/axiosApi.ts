import axios from 'axios';
import { mainApiUrl } from './globalConstants.ts';

const axiosApi = axios.create({
  baseURL: mainApiUrl,
});

export default axiosApi;