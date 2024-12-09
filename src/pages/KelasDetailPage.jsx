import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Image, Modal } from 'react-bootstrap';
import './css/kelasDetail.css';

const KelasDetailPage = () => {
    const { id } = useParams(); // Mendapatkan id kelas dari URL
    const [kelas, setKelas] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Simulated API call to fetch class details
    useEffect(() => {
        const fetchClassDetails = () => {
            const dummyClassDetails = {
                1: {
                    id: 1,
                    image: 'https://via.placeholder.com/150',
                    name: 'Yoga for Beginners',
                    schedule: 'Senin, 08:00 - 09:00',
                    duration: '60 menit',
                    capacity: 30,
                    available: 15,
                    description: 'Yoga is a mind-body practice that combines physical postures, breathing exercises, and meditation.',
                },
                2: {
                    id: 2,
                    image: 'https://via.placeholder.com/150',
                    name: 'Advanced Pilates',
                    schedule: 'Selasa, 10:00 - 11:30',
                    duration: '90 menit',
                    capacity: 20,
                    available: 5,
                    description: 'An advanced Pilates class to strengthen your core and improve flexibility.',
                },
                // Add other dummy classes here
            };
            setKelas(dummyClassDetails[id]);
        };

        fetchClassDetails();
    }, [id]);

    // Toggle modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="mt-4">
            {kelas ? (
                <Row>
                    <Col md={6}>
                        <Image src={kelas.image} alt={kelas.name} rounded fluid />
                    </Col>
                    <Col md={6}>
                        <h3>{kelas.name}</h3>
                        <p><strong>Jadwal:</strong> {kelas.schedule}</p>
                        <p><strong>Durasi:</strong> {kelas.duration}</p>
                        <p><strong>Kapasitas:</strong> {kelas.capacity} - <strong>Tersedia:</strong> {kelas.available}</p>
                        <p>{kelas.description}</p>
                        <Button variant="primary" onClick={handleShowModal}>Pesan Kelas</Button>
                    </Col>
                </Row>
            ) : (
                <p>Loading...</p>
            )}

            {/* Modal Pembayaran */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Pembayaran Kelas: {kelas?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Metode Pembayaran:</p>
                    {/* Form Pembayaran (contoh) */}
                    <select className="form-select">
                        <option value="credit-card">Kartu Kredit</option>
                        <option value="transfer">Transfer Bank</option>
                        {/* Tambahkan pilihan lain sesuai kebutuhan */}
                    </select>
                    <div className="mt-3">
                        <Button variant="success" onClick={handleCloseModal}>Konfirmasi Pembayaran</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default KelasDetailPage;
