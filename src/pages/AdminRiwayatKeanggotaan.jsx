import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';;
import { GetAllPaketKeanggotaan } from '../api/apiPaketKeanggotaan';
import { GetAllRegistrasiKeanggotaan } from '../api/apiRegistrasiKeanggotaan';
// Simulasi API dengan data dummy
const AdminRiwayatKeanggotaan = () => {
    const navigate = useNavigate();

    // Data dummy untuk riwayat pembayaran
    const [riwayatPembayaran, setRiwayatPembayaran] = useState([]);
    const [paketKeanggotaan, setPaketKeanggotaan] = useState([]);

    const fetchAllRegistrasi = async () => {
        try {
            const response = await GetAllRegistrasiKeanggotaan();
            setRiwayatPembayaran(response);
            console.log("Data Registrasi:", response);
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
        }
    };

    const fetchAllPaket = async () => {
        try {
            const response = await GetAllPaketKeanggotaan();
            setPaketKeanggotaan(response);
            console.log("Data Paket:", response);
        } catch (error) {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
        }
    }
    // Simulasi data riwayat pembayaran
    const dataRiwayat = [
        {
            id_registrasi: 1,
            id_pengguna: 101,
            id_paket: 1, // ID Paket yang sesuai dengan paket
            tanggal_pembayaran: '2024-10-01',
            total_pembayaran: 100.00,
            jenis_pembayaran: 'Kartu Kredit',
        },
        {
            id_registrasi: 2,
            id_pengguna: 102,
            id_paket: 2,
            tanggal_pembayaran: '2024-09-15',
            total_pembayaran: 150.00,
            jenis_pembayaran: 'E Wallet',
        },
        {
            id_registrasi: 3,
            id_pengguna: 103,
            id_paket: 3,
            tanggal_pembayaran: '2024-08-10',
            total_pembayaran: 200.00,
            jenis_pembayaran: 'Kartu Debit',
        },
    ];

    // Simulasi data paket keanggotaan
    const dataPaket = [
        { id_paket: 1, durasi: '1_month', harga: 100.00 },
        { id_paket: 2, durasi: '6_months', harga: 150.00 },
        { id_paket: 3, durasi: '1_year', harga: 200.00 },
    ];

    // Menggunakan useEffect untuk mensimulasikan pemanggilan API dan mengatur state
    useEffect(() => {
        // Simulasi fetch data riwayat pembayaran dan paket keanggotaan
        fetchAllRegistrasi();
        fetchAllPaket();
        // setRiwayatPembayaran(dataRiwayat);
        // setPaketKeanggotaan(dataPaket);
    }, []);

    // Fungsi untuk mendapatkan nama paket berdasarkan ID paket
    const getPaketById = (id) => {
        const paket = paketKeanggotaan.find(p => p.id_paket === id);
        return paket ? paket.durasi : 'Tidak diketahui';
    };

    return (
        <div
            className='text-white text-center'
            style={{
                backgroundImage: `url(${kelasBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                padding: '20px'
            }}
        >
            <h3 className='mt-5 mb-4'>Riwayat Pembayaran Keanggotaan</h3>
            <Table
                striped
                bordered
                hover
                variant="dark"
                responsive
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparan putih
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <thead>
                    <tr>
                        <th>Tanggal Pembayaran</th>
                        <th>Total Pembayaran</th>
                        <th>Jenis Pembayaran</th>
                        <th>Durasi</th>
                    </tr>
                </thead>
                <tbody>
                    {riwayatPembayaran.map((item) => (
                        <tr key={item.id_registrasi}>
                            <td>{item.tanggal_pembayaran}</td>
                            <td>{item.total_pembayaran}</td>
                            <td>{item.jenis_pembayaran}</td>
                            <td>{getPaketById(item.id_paket)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    );
};

export default AdminRiwayatKeanggotaan;
