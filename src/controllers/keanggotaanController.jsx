import axios from 'axios';

const API_URL = 'https://api.example.com'; // Ganti dengan URL API yang sebenarnya

const keanggotaanController = {
    registerMembership: async (payload) => {
        try {
            const response = await axios.post(`${API_URL}/registrasi_keanggotaan`, payload);
            return response.data;
        } catch (error) {
            console.error('Error registering membership:', error);
            throw error;
        }
    },
};

export default keanggotaanController;