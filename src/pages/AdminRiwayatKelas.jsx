import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';
import { GetAllPemesananAdmin } from '../api/apiPemesananKelas';
import { GetAllPaketKelas } from '../api/apiPaketKelasAdmin';
import axios from 'axios';
const AdminRiwayatKelas = () => {
    const navigate = useNavigate();
    const [pemesananKelas, setPemesananKelas] = useState([]);
    const [paketKelas, setPaketKelas] = useState([]);
    const [paketKelasList, setPaketKelasList] = useState([]);

    const fetchDataPesanan = async () => {
        try {
            const data = await GetAllPemesananAdmin();
            setPemesananKelas(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchPaketKelas = async () => {
        try {
            const data = await GetAllPaketKelas();
            setPaketKelasList(data);
            console.log("Paket Kelas:", data);
        } catch (error) {
            console.error("Error fetching paket kelas:", error);
        }
    };

    const dataPaket = [
        { id_paket_kelas: 1, durasi: '5_days', harga: 500000 },
        { id_paket_kelas: 2, durasi: '10_days', harga: 1000000 },
        { id_paket_kelas: 3, durasi: '15_days', harga: 1500000 },
    ];

    useEffect(() => {
        fetchDataPesanan();
        fetchPaketKelas();
    }, []);

    const getDurasiById = (id_paket_kelas) => {
        const paket = paketKelasList.find((item) => item.id_paket_kelas === id_paket_kelas);
        return paket ? paket.durasi : "N/A";
    };

    const getHargaById = (id_paket_kelas) => {
        const paket = paketKelasList.find((item) => item.id_paket_kelas === id_paket_kelas);
        return paket ? paket.harga : 0;
    };

    return (
        <div
            className="text-white"
            style={{
                backgroundImage: `url(${kelasBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
            }}
        >
            <Container className="py-4">
                <h3 className="text-center mb-4">Riwayat Pemesanan Kelas</h3>
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    variant="dark"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tanggal Pemesanan</th>
                            <th>Tanggal Mulai</th>
                            <th>Tanggal Selesai</th>
                            <th>Durasi</th>
                            <th>Jenis Pembayaran</th>
                            <th>Total (Rp)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pemesananKelas.map((item, index) => (
                            <tr key={item.id_pemesanan_kelas}>
                                <td>{index + 1}</td>
                                <td>{item.tanggal_pemesanan}</td>
                                <td>{item.tanggal_mulai}</td>
                                <td>{item.tanggal_selesai}</td>
                                <td>{getDurasiById(item.id_paket_kelas)}</td>
                                <td>{item.jenis_pembayaran}</td>
                                <td>{getHargaById(item.id_paket_kelas).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default AdminRiwayatKelas;
