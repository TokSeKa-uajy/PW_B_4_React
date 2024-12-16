import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';;
import { GetAllPaketKeanggotaan } from '../api/apiPaketKeanggotaan';
import { GetAllRegistrasiKeanggotaan } from '../api/apiRegistrasiKeanggotaan';
const AdminRiwayatKeanggotaan = () => {
    const navigate = useNavigate();

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

    useEffect(() => {
        fetchAllRegistrasi();
        fetchAllPaket();
    }, []);

    const getPaketById = (id) => {
        const paket = paketKeanggotaan.find(p => p.id_paket_keanggotaan === id);
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
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
                            <td>{getPaketById(item.id_paket_keanggotaan)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    );
};

export default AdminRiwayatKeanggotaan;
