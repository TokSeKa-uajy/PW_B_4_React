import axios from "axios";

// Buat instance axios dengan konfigurasi dasar
const api = axios.create({
    baseURL: "http://your-backend-domain/api", // Ganti dengan URL backend Anda
    headers: {
        "Content-Type": "application/json",
    },
});

// Tambahkan token autentikasi jika menggunakan Sanctum
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token"); // Ganti sesuai penyimpanan token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
