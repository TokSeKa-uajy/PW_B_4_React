import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import backgroundImage from '../assets/images/kelasBackground.jpg';
import {GetAllTotalRegistrasiKeanggotaan, getTotalKeuntungan} from "../api/apiLaporanAdmin";

const AdminLaporan = () => {
    const navigate = useNavigate();

    const [laporan, setLaporan] = useState({
        totalPendapatanKelas: 0,
        totalPendapatanKeanggotaan: 0,
        totalKelasDipesan: 0,
        totalKeanggotaan: 0,
    });

    // Fetching data dummy dengan simulasi API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetAllTotalRegistrasiKeanggotaan();
                const keuntungan = await getTotalKeuntungan(); 
                console.log("Data Registrasi:", response);
                console.log("Data keuntungan:", keuntungan);

                setLaporan({
                    totalPendapatanKelas: keuntungan.keuntungan_pemesanan_kelas,
                    totalPendapatanKeanggotaan: keuntungan.keuntungan_registrasi_keanggotaan,
                    totalKelasDipesan: response.jumlah_pemesanan_kelas,
                    totalKeanggotaan: response.jumlah_registrasi_keanggotaan,
                });
            } catch (error) {
                console.error("Error fetching laporan data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <Container className="py-4 text-white">
                <h2 className="text-center mb-4">Laporan Pendapatan dan Statistik</h2>

                {/* Kartu Total Pendapatan */}
                <Row className="gy-4">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Total Pendapatan dari Kelas</Card.Title>
                                <Card.Text>
                                    <h3>Rp {laporan.totalPendapatanKelas}</h3>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Total Pendapatan dari Keanggotaan</Card.Title>
                                <Card.Text>
                                    <h3>Rp {laporan.totalPendapatanKeanggotaan}</h3>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Kartu Statistik */}
                <Row className="gy-4 mt-4">
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Total Kelas yang Pernah Dipesan</Card.Title>
                                <Card.Text>
                                    <h3>{laporan.totalKelasDipesan} Kelas</h3>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>Total Registrasi Keanggotaan</Card.Title>
                                <Card.Text>
                                    <h3>{laporan.totalKeanggotaan} Keanggotaan</h3>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Tabel Data Pendapatan */}
                <Row className="mt-5">
                    <Col>
                        <h4 className="text-center mb-4">Detail Pendapatan</h4>
                        <Table striped bordered hover responsive variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Jenis Pendapatan</th>
                                    <th>Total (Rp)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Total Pendapatan Kelas</td>
                                    <td>{laporan.totalPendapatanKelas}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Total Pendapatan Keanggotaan</td>
                                    <td>{laporan.totalPendapatanKeanggotaan}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Tombol Navigasi */}
                <Row className="mt-5 d-flex justify-content-center">
                    <Col md={6} className="text-center">
                        <Button
                            variant="primary"
                            className="me-3"
                            onClick={() => navigate("/user/AdminLaporanPage/AdminRiwayatKelas")}
                        >
                            Lihat History Transaksi Kelas
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => navigate("/user/AdminLaporanPage/AdminRiwayatKeanggotaan")}
                        >
                            Lihat History Transaksi Keanggotaan
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => navigate("/user/AdminLaporanPage/umpan-balik")}
                        >
                            Lihat Umpan Balik
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminLaporan;
