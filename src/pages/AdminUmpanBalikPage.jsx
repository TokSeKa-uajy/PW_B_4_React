import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { GetAllUmpanBalik } from "../api/apiUmpanBalik"; // Import API
import umpanBalikBackgroundImage from "../assets/images/kelasBackground.jpg";

const AdminUmpanBalikPage = () => {
    const [umpanBalik, setUmpanBalik] = useState([]); // State untuk umpan balik

    // Fetch data umpan balik
    const fetchUmpanBalik = async () => {
        try {
            const response = await GetAllUmpanBalik();
            setUmpanBalik(response); // Set state dengan data dari API
            console.log("Data Umpan Balik:", response);
        } catch (error) {
            console.error(
                "Error fetching umpan balik:",
                error.response ? error.response.data : error.message
            );
        }
    };

    // useEffect untuk memanggil fetchUmpanBalik saat pertama kali page dimuat
    useEffect(() => {
        fetchUmpanBalik();
    }, []);

    return (
        <div
            className="text-white text-center"
            style={{
                backgroundImage: `url(${umpanBalikBackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <h3 className="mt-5 mb-4">Daftar Umpan Balik Pengguna</h3>
            <Container>
                <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    responsive
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparan putih
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <thead>
                        <tr>
                            <th>ID Umpan Balik</th>
                            <th>Kelas</th>
                            <th>Rating</th>
                            <th>Komentar</th>
                            <th>Tanggal Umpan Balik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {umpanBalik.map((item) => (
                            <tr key={item.id_umpan_balik}>
                                <td>{item.id_umpan_balik}</td>
                                <td>{item.pemesanan_kelas.paket_kelas.kelas.nama_kelas}</td>
                                <td>{item.rating}</td>
                                <td>{item.komentar}</td>
                                <td>{item.tanggal_umpan_balik}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default AdminUmpanBalikPage;
