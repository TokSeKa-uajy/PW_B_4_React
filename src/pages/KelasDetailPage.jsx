import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import backgroundImage from "../assets/images/kelasBackground.jpg";

const KelasDetailPage = () => {
    const { id } = useParams(); // Ambil ID kelas dari parameter URL
    const [kelasDetail, setKelasDetail] = useState(null);
    const [isBooking, setIsBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [paymentType, setPaymentType] = useState("Kartu Kredit");
    const [selectedDuration, setSelectedDuration] = useState("1_month");
    const [durasiHarga, setDurasiHarga] = useState({});
    const [trainers, setTrainers] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson' },
        { id: 4, name: 'Emily Davis' },
    ]);

    // Simulasi fetch API untuk detail kelas berdasarkan ID
    useEffect(() => {
        const fetchKelasDetail = async () => {
            const dummyData = [
                {
                    id: 1,
                    nama_kelas: "Yoga for Beginners",
                    hari: "Senin",
                    jam_mulai: "08:00",
                    durasi: "60 mins",
                    kapasitas_kelas: 20,
                    deskripsi: "Kelas yoga untuk pemula untuk membantu fleksibilitas dan relaksasi.",
                    id_pelatih: 1
                },
                {
                    id: 2,
                    nama_kelas: "Advanced Pilates",
                    hari: "Rabu",
                    jam_mulai: "10:00",
                    durasi: "90 mins",
                    kapasitas_kelas: 15,
                    deskripsi: "Kelas pilates lanjutan untuk meningkatkan kekuatan inti.",
                    id_pelatih: 2
                },
                {
                    id: 3,
                    nama_kelas: "HIIT Training",
                    hari: "Senin",
                    jam_mulai: "07:00",
                    durasi: "45 mins",
                    kapasitas_kelas: 30,
                    deskripsi: "Latihan intensitas tinggi untuk membakar kalori secara maksimal.",
                    id_pelatih: 3
                },
            ];

            const kelas = dummyData.find((kelas) => kelas.id === parseInt(id));
            if (kelas) {
                const pelatih = trainers.find(trainer => trainer.id === kelas.id_pelatih);
                setKelasDetail({ ...kelas, pelatih: pelatih ? pelatih.name : "Unknown" });
            }
        };

        const fetchDurasiHarga = async () => {
            // Simulasi API untuk mengambil data Paket_kelas
            const dummyPaketKelas = [
                { durasi: "1_month", harga: 200000 },
                { durasi: "6_months", harga: 1000000 },
                { durasi: "1_year", harga: 1500000 },
            ];

            const hargaMap = {};
            dummyPaketKelas.forEach(paket => {
                hargaMap[paket.durasi] = paket.harga;
            });
            setDurasiHarga(hargaMap);
        };

        fetchKelasDetail();
        fetchDurasiHarga();
    }, [id, trainers]);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleBooking = async () => {
        setIsBooking(true);
        try {
            // Simulasi API booking kelas
            const payload = {
                id_user: 123, // Contoh ID user
                id_kelas: kelasDetail.id,
                durasi: selectedDuration,
                total_pembayaran: durasiHarga[selectedDuration],
                jenis_pembayaran: paymentType,
                tanggal_booking: new Date().toISOString().split("T")[0],
                status: "booked",
            };

            alert("Kelas berhasil dipesan!", payload);
            handleCloseModal();
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
                                    <strong>Pelatih:</strong> {kelasDetail.pelatih}
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

            {/* Modal untuk simulasi pembayaran */}
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
