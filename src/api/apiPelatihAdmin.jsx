import useAxios from ".";

export const GetAllPelatih = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/pelatih", {
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

export const createPelatih = async (data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post("/pelatih", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
};

export const updatePelatih = async (id, data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post(`/pelatih/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        // throw error.response;
        console.log("Error response:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error;
    }
};


export const hapusPelatih = async (id) => {
    try {
        const token = sessionStorage.getItem('token'); 
        const response = await useAxios.delete(`/pelatih/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        // throw error.response;
        console.log("Error response:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error;
    }
}