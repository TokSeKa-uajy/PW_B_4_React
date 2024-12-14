import api from "./api";

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
        const response = await api.post("/upload-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
