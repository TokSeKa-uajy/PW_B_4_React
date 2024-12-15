import useAxios from ".";

export const GetUserProfile = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.get(`/user/profile`, {
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

export const UpdateUserProfile = async (formData) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await useAxios.post("/user/update-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response;
    }
};