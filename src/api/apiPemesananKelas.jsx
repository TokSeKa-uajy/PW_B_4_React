import useAxios from '.';

export const FindPemesananById = async (id) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get(`/pemesanan-kelas/cari/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
};

export const GetAllPemesanan = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get("/pemesanan-kelas", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
};

export const PesanKelas = async (data) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.post("/pemesanan-kelas", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
};

export const GetPemesananDetail = async (id) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get(`/pemesanan-kelas/{id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
};