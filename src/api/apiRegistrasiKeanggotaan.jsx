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

// export const showRegistrasiKeanggotaanByUser = async () => {
//     try {
//         const token = sessionStorage.getItem('token');
//         const response = await useAxios.get("/registrasi-keanggotaan", {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         // console.log(response.data.data);
//         return response.data.data;
//     } catch (error) {
//         throw error.response;
//     }
// }

// Fungsi untuk mengecek status keanggotaan user

export const checkMembershipStatus = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.get("/registrasi-keanggotaan", {
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
