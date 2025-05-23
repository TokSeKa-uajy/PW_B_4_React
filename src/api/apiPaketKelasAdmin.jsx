import useAxios from ".";

export const GetAllPaketKelas = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get(`/paket-kelas-admin`, {
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

export const GetAllPaketKelasById = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get(`/paket-kelas/${id}`, {
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

export const createPaketKelas = async (data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post("/paket-kelas", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
}

export const updatePaketKelas = async (id, data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.put(`/paket-kelas/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
}

export const GetPaketKelasByKelasId = async (id_kelas) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get(`/paket-kelas/cari/${id_kelas}`, {
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
