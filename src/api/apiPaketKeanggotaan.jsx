import useAxios from ".";

export const GetAllPaketKeanggotaan = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/paket-keanggotaan", {
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

export const GetPaketKeanggotaanById = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get(`/paket-keanggotaan/${id}`, {
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

export const CreatePaketKeanggotaan = async (data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post("/paket-keanggotaan", data, {
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