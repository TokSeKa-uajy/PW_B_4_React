import useAxios from ".";

export const GetAllTotalRegistrasiKeanggotaan = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get("/admin/total", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching total data:", error.response ? error.response.data : error.message);
        throw error.response;
    }
};

export const getTotalKeuntungan = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get("/admin/keuntungan", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching total data:", error.response ? error.response.data : error.message);
        throw error.response;
    }
};
