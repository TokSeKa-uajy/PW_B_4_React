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
export const GetAllPemesananAdmin = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get("/pemesanan-all-kelas", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
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

export const GetAllKelasUser = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get('/pemesanan-kelas-user', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching kelas user:', error);
        throw error;
    }
};
