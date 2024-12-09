import React, { useState, useEffect } from 'react';
import { Image, Button, Row, Col, Container, Dropdown } from 'react-bootstrap';
import { data, useNavigate } from 'react-router-dom';
import "./css/kelas.css";
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';
const KelasPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [categories, setCategories] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Semua');

    const [trainers, setTrainers] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson' },
        { id: 4, name: 'Emily Davis' },
    ]);
    // TODO
    // Catatan API:
    // 1. Aku butuh API untuk mengambil data kelas dari server
    // 2. Aku butuh API untuk mengambil data kategori dari kelas kategori (nanti perlu bikin fungsi yang memasangkannya dengan id dari kelas ke kategori)
    // 3. Aku butuh API untuk mengambil data trainer dari kelas trainer (nanti perlu bikin fungsi yang memasangkannya dengan id dari kelas ke trainer)

    // Simulated API function to fetch categories
    useEffect(() => {
        const fetchCategories = () => {
            // Simulate fetching categories from an API
            const dummyCategories = ['Semua', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength'];
            setCategories(dummyCategories);
        };

        fetchCategories();
    }, []);

    // Simulated API function
    useEffect(() => {
        const fetchClasses = () => {
            const dummyClasses = [
                { id: 1, image: 'https://via.placeholder.com/150', nama_kelas: 'Yoga for Beginners', hari: 'Senin', jam_mulai: '08:00', durasi: '60 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Yoga' },
                { id: 2, image: 'https://via.placeholder.com/150', nama_kelas: 'Advanced Pilates', hari: 'Rabu', jam_mulai: '10:00', durasi: '90 mins', kapasitas_kelas: 15, id_pelatih: 2, category: 'Pilates' },
                { id: 3, image: 'https://via.placeholder.com/150', nama_kelas: 'HIIT Training', hari: 'Senin', jam_mulai: '07:00', durasi: '45 mins', kapasitas_kelas: 30, id_pelatih: 3, category: 'HIIT' },
                { id: 4, image: 'https://via.placeholder.com/150', nama_kelas: 'Cardio Workout', hari: 'Jumat', jam_mulai: '18:00', durasi: '60 mins', kapasitas_kelas: 25, id_pelatih: 4, category: 'Cardio' },
                { id: 5, image: 'https://via.placeholder.com/150', nama_kelas: 'Strength Training', hari: 'Selasa', jam_mulai: '09:00', durasi: '75 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Strength' },
                { id: 6, image: 'https://via.placeholder.com/150', nama_kelas: 'Strength Training', hari: 'Rabu', jam_mulai: '09:00', durasi: '75 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Strength' }
            ];

            setClasses(dummyClasses);
            setFilteredClasses(dummyClasses); // Initial data for all classes
        };

        fetchClasses();
    }, []);

    const mencariPelatih = (kelas) => {
        return trainers.find(trainer => trainer.id === kelas.id_pelatih);
    };

    // Handle category change
    // Filter classes based on selected category
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

        // Set filtered classes ke state
        setFilteredClasses(filtered);
    }, [selectedCategory, selectedDay, classes]);



    return (
        <div style={{
            backgroundImage: `url(${kelasBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <Container className="text-white ">
                {/* Dropdown untuk filter berdasarkan kategori */}
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

                    {/* Dropdown untuk memilih hari */}
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
                </Row>

                <h2 className="mt-4 mb-4">Kelas yang Tersedia</h2>
                <Row>
                    {filteredClasses.map((kelas) => (
                        <Col key={kelas.id} md={6} className="mb-4">
                            <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-dark bg-opacity-25">
                                <Col xs={2} className="d-flex justify-content-center align-items-center">
                                    <Image
                                        src={kelas.image}
                                        alt={kelas.name}
                                        className="kelas-image"
                                        fluid
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </Col>
                                <div className="flex-grow-1 ms-4">
                                    <h5 className="mb-1">{kelas.nama_kelas}</h5>
                                    <p className="mb-1"><strong>Hari:</strong> {kelas.hari}</p>
                                    <p className="mb-1"><strong>Jam Mulai:</strong> {kelas.jam_mulai}</p>
                                    <p className="mb-1"><strong>Durasi:</strong> {kelas.durasi}</p>
                                    {/* <p className="mb-1"><strong>Pelatih:</strong> {mencariPelatih(kelas) ? mencariPelatih(kelas) : 'Unknown'} peserta</p> */}
                                    <p className="mb-1"><strong>Tersedia:</strong> {kelas.kapasitas_kelas} peserta</p>
                                </div>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/kelas/${kelas.id}`)}
                                >
                                    Detail
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>

    );
};

export default KelasPage;
