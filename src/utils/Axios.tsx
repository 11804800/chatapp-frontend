import axios from "axios";

export  const AxiosVite=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL
})