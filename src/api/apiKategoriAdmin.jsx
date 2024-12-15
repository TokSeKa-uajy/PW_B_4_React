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
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response;
    }
};