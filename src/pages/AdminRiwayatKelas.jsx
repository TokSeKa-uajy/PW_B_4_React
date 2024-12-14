import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';

const AdminRiwayatKelas = () => {
    const navigate = useNavigate();

    // Data dummy untuk pemesanan kelas
    const [pemesananKelas, setPemesananKelas] = useState([]);
    const [paketKelas, setPaketKelas] = useState([]);

    // Simulasi data pemesanan kelas
    const dataPemesanan = [
        {
            id_pemesanan_kelas: 1,
            id_user: 101,
            id_paket_kelas: 1,
            tanggal_pemesanan: '2024-10-01',
            jenis_pembayaran: 'Kartu Kredit',
            tanggal_mulai: '2024-10-05',
            tanggal_selesai: '2024-10-10',
        },
        {
            id_pemesanan_kelas: 2,
            id_user: 102,
            id_paket_kelas: 2,
            tanggal_pemesanan: '2024-09-15',
            jenis_pembayaran: 'E Wallet',
            tanggal_mulai: '2024-09-20',
            tanggal_selesai: '2024-09-25',
        },
        {
            id_pemesanan_kelas: 3,
            id_user: 103,
            id_paket_kelas: 3,
            tanggal_pemesanan: '2024-08-10',
            jenis_pembayaran: 'Kartu Debit',
            tanggal_mulai: '2024-08-15',
            tanggal_selesai: '2024-08-20',
        },
    ];

    // Simulasi data paket kelas
    const dataPaket = [
        { id_paket_kelas: 1, durasi: '5_days', harga: 500000 },
        { id_paket_kelas: 2, durasi: '10_days', harga: 1000000 },
        { id_paket_kelas: 3, durasi: '15_days', harga: 1500000 },
    ];

    // Menggunakan useEffect untuk mensimulasikan pemanggilan API dan mengatur state
    useEffect(() => {
        // Simulasi fetch data pemesanan kelas dan paket kelas
        setPemesananKelas(dataPemesanan);
        setPaketKelas(dataPaket);
    }, []);

    // Fungsi untuk mendapatkan harga paket berdasarkan ID paket
    const getHargaById = (id) => {
        const paket = paketKelas.find((p) => p.id_paket_kelas === id);
        return paket ? paket.harga : 0;
    };

    // Fungsi untuk mendapatkan durasi paket berdasarkan ID paket
    const getDurasiById = (id) => {
        const paket = paketKelas.find((p) => p.id_paket_kelas === id);
        return paket ? paket.durasi : 'Tidak diketahui';
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
                        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparan putih
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
