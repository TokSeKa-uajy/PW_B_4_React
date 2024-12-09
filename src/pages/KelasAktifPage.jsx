import React, { useState, useEffect } from 'react';
import { Image, Button, Row, Col, Container, Dropdown, Form } from 'react-bootstrap';
import { data, useNavigate } from 'react-router-dom';
import "./css/kelas.css";
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';
// TODO
// Catatan API:
/*
1. Aku butuh API untuk ambil semua data kelas yang user pernah pesan dari model pemesanan kelas. 
2. Aku butuh API untuk ambil semua pelatih untuk support nama pelatih di kelas
3. api untuk pastikan siapa usernya
*/
const KelasAktifPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [categories, setCategories] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Semua');
    const [trainer, setTrainer] = useState("Kosong");
    const [isActive, setIsActive] = useState(false);

    const [trainers, setTrainers] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson' },
        { id: 4, name: 'Emily Davis' },
    ]);

    // Function to handle checkbox change
    const handleCheckboxChange = () => {
        setIsActive(!isActive);
    };

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

            const dummy_pemesanan_kelas = [
                { id_pemesanan_kelas: 1, id_pengguna: 1001, id_kelas: 1, id_paket_kelas: 1, tanggal_pemesanan: '2024-11-01', status_pembayaran: 'lunas', jenis_pembayaran: 'transfer bank', tanggal_mulai: '2025-11-10', tanggal_selesai: '2025-11-10' },
                { id_pemesanan_kelas: 2, id_pengguna: 1001, id_kelas: 2, id_paket_kelas: 2, tanggal_pemesanan: '2024-11-02', status_pembayaran: 'belum lunas', jenis_pembayaran: 'e-wallet', tanggal_mulai: '2022-11-12', tanggal_selesai: '2022-11-12' },
                { id_pemesanan_kelas: 3, id_pengguna: 1001, id_kelas: 3, id_paket_kelas: 1, tanggal_pemesanan: '2024-11-03', status_pembayaran: 'lunas', jenis_pembayaran: 'transfer bank', tanggal_mulai: '2024-11-15', tanggal_selesai: '2024-11-15' },
                { id_pemesanan_kelas: 4, id_pengguna: 1001, id_kelas: 4, id_paket_kelas: 3, tanggal_pemesanan: '2024-11-04', status_pembayaran: 'lunas', jenis_pembayaran: 'kartu kredit', tanggal_mulai: '2024-11-17', tanggal_selesai: '2024-11-17' },
                // { id_pemesanan_kelas: 4, id_pengguna: 1001, id_kelas: 3, id_paket_kelas: 3, tanggal_pemesanan: '2024-11-04', status_pembayaran: 'lunas', jenis_pembayaran: 'kartu kredit', tanggal_mulai: '2024-11-17', tanggal_selesai: '2024-11-17' }
            ];

            // Fungsi untuk menggabungkan data kelas dan pemesanan kelas
            const mergeClassesAndOrders = (classes, orders) => {
                return orders.map(order => {
                    // Cari kelas berdasarkan id_kelas
                    const kelas = classes.find(o => o.id === order.id_kelas);

                    // Gabungkan data kelas dan pemesanan
                    return kelas ? { ...order, ...kelas } : order; // Jika ada order, gabungkan data, jika tidak, kembalikan hanya kelas
                });
            };

            // Gabungkan kelas dengan data pemesanan
            const mergedClasses = mergeClassesAndOrders(dummyClasses, dummy_pemesanan_kelas);

            setClasses(mergedClasses);
            setFilteredClasses(mergedClasses); // Initial data for all classes
            console.log(mergedClasses);
        };

        fetchClasses();
    }, []);

    // Fungsi untuk mencari pelatih berdasarkan ID
    const mencariPelatih = (kelas) => {
        return trainers.find(t => t.id === kelas.id_pelatih);
    };

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    };

    const filterActiveClasses = (classes) => {
        const today = getTodayDate();
        return classes.filter(c => c.tanggal_selesai >= today);
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

        // Filter by isActive checkbox
        if (isActive) {
            setFilteredClasses(filterActiveClasses(filtered));
        } else {
            setFilteredClasses(filtered); // Show all classes when not filtered
        }

        // Set filtered classes ke state
        setFilteredClasses(filtered);
    }, [selectedCategory, selectedDay, isActive, classes]);



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
                    <Col xs="auto" className="me-3 mt-1">
                        {/* Checkbox for toggling isActive */}
                        <Form.Check
                            type="checkbox"
                            id="is-active-checkbox"
                            label={`Tampilkan Hanya Kelas Aktif`}
                            checked={isActive}
                            onChange={handleCheckboxChange}
                        />
                    </Col>
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

                <h2 className="mb-4">Kelas Saya</h2>
                <Row>
                    {filteredClasses.map((kelas) => {
                        const trainer = mencariPelatih(kelas);
                        return (
                            <Col key={kelas.id} md={6} className="mb-4">
                                <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-dark bg-opacity-25">
                                    <Col xs={3} className="d-flex justify-content-center align-items-center">
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
                                        <p className="mb-1"><strong>Pelatih:</strong> {trainer ? trainer.name : 'Unknown'}</p>
                                        <p className="mb-1"><strong>Kelas Berakhir:</strong> {kelas.kapasitas_kelas} peserta</p>
                                    </div>
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate(`/kelas/${kelas.id}`)}
                                    >
                                        Status
                                    </Button>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>

    );
};

export default KelasAktifPage;
