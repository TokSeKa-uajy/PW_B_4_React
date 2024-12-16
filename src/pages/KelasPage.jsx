import React, { useState, useEffect } from 'react';
import { Image, Button, Row, Col, Container, Dropdown, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./css/kelas.css";
import kelasBackgroundImage from '../assets/images/kelasBackground.jpg';

import { GetAllKelas } from "../api/apiKelasAdmin";
import { GetAllKategori } from "../api/apiKategoriAdmin";

const KelasPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [categories, setCategories] = useState([]);
    const [selectedDay, setSelectedDay] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        const fetchClasses = () => {
            GetAllKelas()
                .then(
                    (data) => {
                        console.log(data);
                        setClasses(data);
                        setFilteredClasses(data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        };

        const fetchCategories = () => {
            GetAllKategori()
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

                <h2 className="mb-4 mt-3">Kelas yang Tersedia</h2>
                <Row>
                    {currentClasses.map((kelas) => {
                        console.log(kelas);
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
                                        onClick={() => navigate(`/user/KelasDetail/${kelas.id_kelas}`)}
                                    >
                                        Detail
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
        </div>
    );
};

export default KelasPage;
