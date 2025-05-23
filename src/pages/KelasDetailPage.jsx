import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/images/kelasBackground.jpg";

import { GetKelasById } from '../api/apiKelasAdmin';
import { GetPaketKelasByKelasId } from '../api/apiPaketKelasAdmin';
import { PesanKelas } from "../api/apiPemesananKelas";

const KelasDetailPage = () => {
    const { id } = useParams();
    const [kelasDetail, setKelasDetail] = useState(null);
    const [isBooking, setIsBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [paymentType, setPaymentType] = useState("Kartu Kredit");
    const [selectedDuration, setSelectedDuration] = useState("1_month");
    const [durasiHarga, setDurasiHarga] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKelasDetail = async () => {
            try {
                const detail = await GetKelasById(id);
                setKelasDetail(detail);

                try {
                    const paketKelas = await GetPaketKelasByKelasId(id);

                    if (paketKelas && paketKelas.length > 0) {
                        const hargaMap = {};
                        paketKelas.map((paket) => {
                            console.log("Paket:", paket.durasi, paket.harga);
                            hargaMap[paket.durasi] = paket.harga;
                        });
                        setDurasiHarga(hargaMap);
                        setSelectedDuration(Object.keys(hargaMap)[0]);
                    } else {
                        console.warn("Paket kelas tidak ditemukan.");
                        setDurasiHarga({});
                    }
                } catch (error) {
                    console.error("Gagal memuat paket kelas:", error);
                    setDurasiHarga({});
                }
            } catch (error) {
                console.error("Gagal memuat detail kelas:", error);
                alert("Detail kelas tidak ditemukan.");
                navigate("/user/KelasPage");
            }
        };


        fetchKelasDetail();
    }, [id]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBooking = async () => {
        setIsBooking(true);
        try {
            const paketKelas = await GetPaketKelasByKelasId(id);

            const paketTerpilih = paketKelas.find((paket) => paket.durasi === selectedDuration);
            
            if (!paketTerpilih) {
                alert("Paket kelas tidak ditemukan untuk durasi ini!");
                return;
            }

            const payload = {
                id_paket_kelas: paketTerpilih.id_paket_kelas,
                tanggal_mulai: new Date().toISOString().split("T")[0],
                jenis_pembayaran: paymentType,
            };

            const response = await PesanKelas(payload);
            alert("Pemesanan berhasil dilakukan!");
            handleCloseModal();
            navigate("/user/Kelas");
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat memesan kelas.");
        } finally {
            setIsBooking(false);
        }
    };


    if (!kelasDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <Container className="text-center text-white">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow-lg border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "15px" }}>
                            <Card.Body>
                                <Card.Title className="fw-bold display-6 text-primary">{kelasDetail.nama_kelas}</Card.Title>
                                <Card.Text className="text-muted fs-5">
                                    <strong>Hari:</strong> {kelasDetail.hari}
                                    <br />
                                    <strong>Jam Mulai:</strong> {kelasDetail.jam_mulai}
                                    <br />
                                    <strong>Durasi:</strong> {kelasDetail.durasi}
                                    <br />
                                    <strong>Kapasitas:</strong> {kelasDetail.kapasitas_kelas} orang
                                    <br />
                                    <strong>Pelatih:</strong> {kelasDetail.pelatih.nama_depan} {kelasDetail.pelatih.nama_belakang}
                                    <br />
                                    <strong>Deskripsi:</strong> {kelasDetail.deskripsi}
                                </Card.Text>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={handleShowModal}
                                        style={{ borderRadius: "30px" }}
                                    >
                                        Pesan Kelas
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Pembayaran</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {kelasDetail && (
                        <div>
                            <p>
                                Anda akan memesan kelas {kelasDetail.nama_kelas}.
                            </p>
                            <Form.Group className="mb-3">
                                <Form.Label>Pilih Durasi</Form.Label>
                                <Form.Select
                                    value={selectedDuration}
                                    onChange={(e) => setSelectedDuration(e.target.value)}
                                >
                                    {Object.entries(durasiHarga).map(([durasi, harga]) => (
                                        <option key={durasi} value={durasi}>
                                            {durasi.replace("_", " ")} - Rp {harga.toLocaleString("id-ID")}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Pilih Jenis Pembayaran</Form.Label>
                                <Form.Select
                                    value={paymentType}
                                    onChange={(e) => setPaymentType(e.target.value)}
                                >
                                    <option value="Kartu Kredit">Kartu Kredit</option>
                                    <option value="Kartu Debit">Kartu Debit</option>
                                    <option value="E Wallet">E Wallet</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleBooking} disabled={isBooking}>
                        {isBooking ? "Memproses..." : "Bayar Sekarang"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default KelasDetailPage;
