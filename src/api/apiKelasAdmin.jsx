import useAxios from ".";

export const GetAllKelas = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/kelas", {
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
};

export const GetKelasById = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get(`/kelas/${id}`, {
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
};

export const CreateKelas = async (data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post("/kelas", data, {
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

export const UpdateKelas = async (id, data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.put(`/kelas/${id}`, data, {
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