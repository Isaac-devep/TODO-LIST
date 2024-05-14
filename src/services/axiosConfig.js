import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.251.189:8080', // Asegúrate de que esta URL sea accesible desde tu dispositivo/emulador
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;