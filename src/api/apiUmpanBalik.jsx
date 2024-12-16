import useAxios from ".";

export const GetAllUmpanBalik = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/umpan-balik", {
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

export const createUmpanBalik = async (data) => {    
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post("/umpan-balik", data, {
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