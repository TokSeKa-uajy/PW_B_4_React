import React, { useState, useEffect } from 'react';
import { Image, Button, Row, Col, Container, Dropdown, Form, Pagination, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./css/kelas.css";
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';

import { GetAllKelasUser } from "../api/apiPemesananKelas";
import { GetAllKategoriUser } from "../api/apiKategoriAdmin";
import {createUmpanBalik} from "../api/apiUmpanBalik";

const KelasPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [categories, setCategories] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [feedbackForm, setFeedbackForm] = useState({
        id_pemesanan_kelas: "",
        rating: 0,
        komentar: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const fetchClasses = () => {
            GetAllKelasUser()
                .then(
                    (response) => {
                        const pemesananData = response.data;
                        const kelasData = pemesananData.map((item) => ({
                            ...item.kelas,
                            id_pemesanan_kelas: item.id_pemesanan_kelas,
                        }));    

                        setClasses(kelasData);
                        setFilteredClasses(kelasData);
                        console.log(response);
                        console.log("kelas");
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        };
        const fetchCategories = () => {
            GetAllKategoriUser()
                .then(
                    (data) => {
                        const updatedCategories = [
                            { id_kategori_kelas: 0, nama_kategori: "Semua", deskripsi_kategori: "Semua kategori" },
                            ...data
                        ];
                        setCategories(updatedCategories);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        };

        fetchClasses();
        fetchCategories();

    }, []);

    useEffect(() => {
        let filtered = classes;

        if (selectedCategory !== 'Semua') {
            filtered = filtered.filter(c => c.kategori.nama_kategori === selectedCategory);
        }

        if (selectedDay !== 'Semua') {
            filtered = filtered.filter(c => c.hari === selectedDay);
        }

        if (searchQuery) {
            filtered = filtered.filter(cls =>
                cls.nama_kelas.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredClasses(filtered);
    }, [selectedCategory, selectedDay, searchQuery, classes]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClasses = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    useEffect(()=> {
        if (selectedClass) {
            setFeedbackForm({
                id_pemesanan_kelas: selectedClass.id_pemesanan_kelas,
                rating: 0,
                komentar: "",
            });
        }
    }, [selectedClass]);

    const handleShowModal = (kelas) => {
        setSelectedClass(kelas);
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setSelectedClass(null);
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedbackForm({ ...feedbackForm, [name]: value });
    };
    const handleSubmitFeedback = async () => {
        const payload = new FormData();
        payload.append("id_pemesanan_kelas", feedbackForm.id_pemesanan_kelas);
        payload.append("rating", feedbackForm.rating);
        payload.append("komentar", feedbackForm.komentar);
        try {
            createUmpanBalik(payload);
            alert('Feedback berhasil disimpan!');
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Terjadi kesalahan saat menyimpan feedback.');
        }
    };


    return (
        <div style={{
            backgroundImage: `url(${kelasBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <Container className="text-white mt-5">
                <Row className="mt-2 d-flex justify-content-end">
                    <Col xs="auto" className="me-3">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Filter berdasarkan kategori: {selectedCategory}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="scrollable-dropdown">
                                {categories.map((category, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={() => setSelectedCategory(category.nama_kategori)}
                                    >
                                        {category.nama_kategori}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs="auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-day">
                                Filter berdasarkan Hari: {selectedDay}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={() => setSelectedDay(day)}
                                    >
                                        {day}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col xs="auto" className="ms-3">
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Cari Kelas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto" className="ms-3">
                        <Form.Group>
                            <Form.Select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                <option value={6}>6 items per page</option>
                                <option value={8}>8 items per page</option>
                                <option value={12}>12 items per page</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <h2 className="mb-4">Kelas Saya</h2>
                <Row>
                    {currentClasses.map((kelas) => {
                        return (
                            <Col key={kelas.id_kelas} md={6} className="mb-4">
                                <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-dark bg-opacity-25">
                                    <div className="flex-grow-1 ms-4">
                                        <h5 className="mb-1">{kelas.nama_kelas}</h5>
                                        <p className="mb-1"><strong>Hari:</strong> {kelas.hari}</p>
                                        <p className="mb-1"><strong>Jam Mulai:</strong> {kelas.jam_mulai}</p>
                                        <p className="mb-1"><strong>Durasi:</strong> {kelas.durasi}</p>
                                        <p className="mb-1"><strong>Pelatih:</strong> {kelas.pelatih?.nama_depan} {kelas.pelatih?.nama_belakang}</p>
                                        <p className="mb-1"><strong>Kapasitas Kelas:</strong> {kelas.kapasitas_kelas} peserta</p>
                                    </div>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowModal(kelas)}
                                    >
                                        Ulas
                                    </Button>
                                </div>
                            </Col>
                        )
                    })}
                </Row>

                <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(filteredClasses.length / itemsPerPage)).keys()].map((number) => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => paginate(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Umpan Balik untuk {selectedClass?.nama_kelas}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Select
                                name="rating"
                                value={feedbackForm.rating}
                                onChange={handleInputChange}
                            >
                                {[...Array(6).keys()].map((rating) => (
                                    <option key={rating} value={rating}>{rating}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Komentar</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="komentar"
                                value={feedbackForm.komentar}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
                    <Button variant="primary" onClick={handleSubmitFeedback}>Kirim</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default KelasPage;
