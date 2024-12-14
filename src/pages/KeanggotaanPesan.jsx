import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import backgroundImage from "../assets/images/kelasBackground.jpg";
import keanggotaanController from "../controllers/keanggotaanController";

const KeanggotaanPesan = () => {
    const [membershipPackages, setMembershipPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [paymentType, setPaymentType] = useState("Kartu Kredit");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMember, setIsMember] = useState(false);

    // Simulasi API untuk mengecek status keanggotaan cek di tabel keanggotaan
    const checkMembershipStatus = async () => {
        // Simulate API response
        const dummyResponse = { isMember: false }; // Ganti dengan false untuk tes
        setIsMember(dummyResponse.isMember);
    };

    // Simulasi fetch data API untuk paket keanggotaan
    useEffect(() => {
        const fetchData = () => {
            const dummyData = [
                { id: 1, durasi: "1_month", harga: 200000.0 },
                { id: 2, durasi: "6_months", harga: 1000000.0 },
                { id: 3, durasi: "1_year", harga: 1500000.0 },
            ];
            setMembershipPackages(dummyData);
        };

        fetchData();
        checkMembershipStatus();
    }, []);

    const handleShowModal = (packageData) => {
        setSelectedPackage(packageData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedPackage(null);
        setShowModal(false);
    };

    const handlePayment = async () => {
        if (!selectedPackage) return;

        setIsSubmitting(true);
        try {
            const payload = {
                id_user: 123, // Contoh ID user
                id_paket_keanggotaan: selectedPackage.id,
                tanggal_pembayaran: new Date().toISOString().split("T")[0],
                total_pembayaran: selectedPackage.harga,
                status_pembayaran: "paid",
                jenis_pembayaran: paymentType,
            };

            const response = await keanggotaanController.registerMembership(payload);
            alert("Pembayaran berhasil!", response);
            handleCloseModal();
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat memproses pembayaran.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                {isMember ? (
                    <h2 className="mb-4">Anda sudah menjadi Anggota! Nikmati fasilitas kami</h2>
                ) : (
                    <>
                        <h2 className="mb-4">Pilih Keanggotaan yang sesuai dengan Anda</h2>
                        <p>
                            Nikmati akses ke seluruh area GYM serta diskon untuk kelas GYM lainnya
                        </p>
                        <Row className="justify-content-center">
                            {membershipPackages.map((item) => (
                                <Col key={item.id} md={4} className="mb-4">
                                    <Card className="shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                                        <Card.Body>
                                            <Card.Title className="fw-bold">
                                                Keanggotaan {item.durasi.replace("_", " ")}
                                            </Card.Title>
                                            <Card.Text>
                                                <strong>Total Harga</strong>
                                                <br />
                                                Rp {item.harga.toLocaleString("id-ID")}
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleShowModal(item)}
                                            >
                                                Pesan
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Container>

            {/* Modal untuk simulasi pembayaran */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Pembayaran</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPackage && (
                        <div>
                            <p>
                                Anda akan memesan paket keanggotaan selama {selectedPackage.durasi.replace("_", " ")}.
                            </p>
                            <p>
                                Total yang harus dibayar: Rp {selectedPackage.harga.toLocaleString("id-ID")}.
                            </p>
                            <Form.Group>
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
                    <Button variant="secondary" onClick={handleCloseModal} disabled={isSubmitting}>
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handlePayment}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default KeanggotaanPesan;
