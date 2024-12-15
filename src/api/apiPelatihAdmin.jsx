import useAxios from ".";

export const GetAllPelatih= async () => {
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