import useAxios from ".";

export const Register = async (userData) => {
    try {
        const response = await useAxios.post('/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const Login = async (userData) => {
    try {
        const response = await useAxios.post('/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const Logout = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await useAxios.post('/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// export const getProtectedData = async () => {
//     try {
//         const token = sessionStorage.getItem("token");

//         const response = await useAxios.get("/admin/data", {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         return response.data;
//     } catch (error) {
//         if (error.response && error.response.status === 403) {
//             throw new Error("Access denied: You do not have admin privileges.");
//         }
//         if (error.response && error.response.status === 401) {
//             throw new Error("Unauthorized: Please login.");
//         }
//         throw new Error("An unexpected error occurred.");
//     }
// };


