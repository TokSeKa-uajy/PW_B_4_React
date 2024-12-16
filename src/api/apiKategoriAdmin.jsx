import useAxios from ".";

export const GetAllKategori = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/kategori-kelas", {
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

export const GetAllKategoriUser = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/kategori-kelas-user", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
};

export const CreateKategori = async (data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post("/kategori-kelas", data,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
}

export const EditKategori = async (id, data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.put(`/kategori-kelas/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
}

export const DeleteKategori = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.delete(`/kategori-kelas/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
}