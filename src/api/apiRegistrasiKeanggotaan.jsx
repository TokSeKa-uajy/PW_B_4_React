import useAxios from ".";

export const createRegistrasiKeanggotaan = async (data) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post("/registrasi-keanggotaan", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Full Response:", response);
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

// Fungsi untuk mengecek status keanggotaan user

export const checkMembershipStatus = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/registrasi-keanggotaan-checkStatus", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        // Mengembalikan status true/false
        return response.data.status;
    } catch (error) {
        console.error("Error:", error);
        return false; // Jika error, asumsikan status false
    }
};

export const GetAllRegistrasiKeanggotaan = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/registrasi-keanggotaan-admin", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

export const getAllRegistrasiKeanggotaanByID = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get('registrasi-keanggotaan-user', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Full Response:", response);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error.response;
    }
};

