import React, { useState, useEffect } from 'react';
import { Image, Button, Row, Col, Container, Dropdown, Form, Modal, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/kelas.css";
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';

const KelasAktifPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [categories, setCategories] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState("");
    const [trainers, setTrainers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [feedbackForm, setFeedbackForm] = useState({
        rating: 0,
        komentar: "",
        tanggal_umpan_balik: new Date().toISOString().split('T')[0], // Automatically today's date
    });

    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [itemsPerPage, setItemsPerPage] = useState(6); // Number of items per page, dynamic

    useEffect(() => {
        const fetchCategoriesAndTrainers = () => {
            const dummyCategories = ['Semua', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength'];
            setCategories(dummyCategories);

            const dummyTrainers = [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Smith' },
                { id: 3, name: 'Michael Johnson' },
                { id: 4, name: 'Emily Davis' },
            ];
            setTrainers(dummyTrainers);
        };

        fetchCategoriesAndTrainers();
    }, []);

    useEffect(() => {
        const fetchClasses = () => {
            const dummyClasses = [
                { id: 1, image: 'https://via.placeholder.com/150', nama_kelas: 'Yoga for Beginners', hari: 'Senin', jam_mulai: '08:00', durasi: '60 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Yoga', tanggal_selesai: '2025-11-10' },
                { id: 2, image: 'https://via.placeholder.com/150', nama_kelas: 'Advanced Pilates', hari: 'Rabu', jam_mulai: '10:00', durasi: '90 mins', kapasitas_kelas: 15, id_pelatih: 2, category: 'Pilates', tanggal_selesai: '2024-12-01' },
                { id: 3, image: 'https://via.placeholder.com/150', nama_kelas: 'HIIT Training', hari: 'Senin', jam_mulai: '07:00', durasi: '45 mins', kapasitas_kelas: 30, id_pelatih: 3, category: 'HIIT', tanggal_selesai: '2025-10-01' },
                { id: 4, image: 'https://via.placeholder.com/150', nama_kelas: 'Cardio Workout', hari: 'Jumat', jam_mulai: '18:00', durasi: '60 mins', kapasitas_kelas: 25, id_pelatih: 4, category: 'Cardio', tanggal_selesai: '2025-09-15' },
                { id: 5, image: 'https://via.placeholder.com/150', nama_kelas: 'Strength Training', hari: 'Selasa', jam_mulai: '09:00', durasi: '75 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Strength', tanggal_selesai: '2025-08-20' },
            ];

            setClasses(dummyClasses);
            setFilteredClasses(dummyClasses);
        };

        fetchClasses();
    }, []);

    const handleShowModal = (kelas) => {
        setSelectedClass(kelas);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedClass(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedbackForm({ ...feedbackForm, [name]: value });
    };

    const handleSubmitFeedback = async () => {
        const payload = {
            id_user: 1001, // Example user ID
            id_pemesanan_kelas: selectedClass?.id, // ID of the selected class
            ...feedbackForm,
        };

        try {
            // Simulate API call
            await axios.post('/api/feedback', payload);
            alert('Feedback berhasil disimpan!');
            handleCloseModal();
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Terjadi kesalahan saat menyimpan feedback.');
        }
    };

    // Filter and pagination logic
    useEffect(() => {
        let filtered = classes;

        // Filter berdasarkan kategori
        if (selectedCategory !== 'Semua') {
            filtered = filtered.filter(c => c.category === selectedCategory);
        }

        // Filter berdasarkan hari
        if (selectedDay !== 'Semua') {
            filtered = filtered.filter(c => c.hari === selectedDay);
        }

        // Filter berdasarkan pencarian
        if (searchQuery) {
            filtered = filtered.filter(cls =>
                cls.nama_kelas.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Set filtered classes ke state
        setFilteredClasses(filtered);
    }, [selectedCategory, selectedDay, searchQuery, classes]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClasses = filteredClasses.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    return (
        <div style={{
            backgroundImage: `url(${kelasBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <Container className="text-white ">
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
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
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
                        const trainer = trainers.find(t => t.id === kelas.id_pelatih);
                        return (
                            <Col key={kelas.id} md={6} className="mb-4">
                                <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-dark bg-opacity-25">
                                    <Col xs={3} className="d-flex justify-content-center align-items-center">
                                        <Image
                                            src={kelas.image}
                                            alt={kelas.nama_kelas}
                                            className="kelas-image"
                                            fluid
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '10%',
                                            }}
                                        />
                                    </Col>
                                    <div className="flex-grow-1 ms-4">
                                        <h5 className="mb-1">{kelas.nama_kelas}</h5>
                                        <p className="mb-1"><strong>Hari:</strong> {kelas.hari}</p>
                                        <p className="mb-1"><strong>Jam Mulai:</strong> {kelas.jam_mulai}</p>
                                        <p className="mb-1"><strong>Durasi:</strong> {kelas.durasi}</p>
                                        <p className="mb-1"><strong>Pelatih:</strong> {trainer ? trainer.name : 'Unknown'}</p>
                                        <p className="mb-1"><strong>Tanggal Berakhir:</strong> {kelas.tanggal_selesai}</p>
                                    </div>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShowModal(kelas)}
                                    >
                                        Umpan Balik
                                    </Button>
                                </div>
                            </Col>
                        );
                    })}
                </Row>

                <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(filteredClasses.length / itemsPerPage)).keys()].map(number => (
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

                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control
                                type="text"
                                value={feedbackForm.tanggal_umpan_balik}
                                disabled
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

export default KelasAktifPage;
