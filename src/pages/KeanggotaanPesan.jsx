import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import backgroundImage from "../assets/images/kelasBackground.jpg";
import { GetAllPaketKeanggotaan } from "../api/apiPaketKeanggotaan";
import { createRegistrasiKeanggotaan, checkMembershipStatus } from "../api/apiRegistrasiKeanggotaan";

const KeanggotaanPesan = () => {
    const [membershipPackages, setMembershipPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [paymentType, setPaymentType] = useState("Kartu Kredit");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMember, setIsMember] = useState(false);
    
    const fetchMembershipStatus = async () => {
        const status = await checkMembershipStatus();
        setIsMember(status);
    };

    const fetchData = () => {
        GetAllPaketKeanggotaan().then((data) => {
            setMembershipPackages(data);
        })
    };

    useEffect(() => {
        fetchData();
        fetchMembershipStatus();
    }, []);

    const handleShowModal = (packageData) => {
        setSelectedPackage(packageData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedPackage(null);
        setShowModal(false);
    };

    const handlePayment = () => {
        if (!selectedPackage) return;

        setIsSubmitting(true);
        try {
            const newAnggota = {
                id_paket_keanggotaan: selectedPackage.id_paket_keanggotaan,
                jenis_pembayaran: paymentType,
            };
            
            createRegistrasiKeanggotaan(newAnggota);
            alert("Pembayaran berhasil!!!");
                handleCloseModal();
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat memproses pembayaran.");
        } finally {
            setIsSubmitting(false);
            fetchMembershipStatus();
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
