import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:3001"
    baseURL: "https://gadalka-back.vercel.app"
    
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config
})

export default instance; 