import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import backgroundImage from "../assets/images/kelasBackground.jpg";
import { GetAllKategori, CreateKategori, EditKategori, DeleteKategori } from "../api/apiKategoriAdmin";

const KategoriPage = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add"); // "add", "edit", or "delete"
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [formData, setFormData] = useState({
        nama_kategori: "",
        deskripsi_kategori: "",
    });
    // Simualasi data kategori dari API

    // Panggil API GetAllKategori
    const fetchCategories = () => {
        GetAllKategori()
            .then(
                (data) => {
                    const updatedCategories = [
                        ...data
                    ];
                    setCategories(updatedCategories);
                    setFilteredCategories(updatedCategories);
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const filtered = categories.filter((category) =>
            category.nama_kategori.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchQuery, categories]);

    const handleShowModal = (type, category = null) => {
        setModalType(type);
        setSelectedCategory(category);
        if (type === "edit" && category) {
            setFormData({
                nama_kategori: category.nama_kategori,
                deskripsi_kategori: category.deskripsi_kategori,
            });
        } else {
            CreateKategori
            setFormData({ nama_kategori: "", deskripsi_kategori: "" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCategory(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        // disini simulasi API create kategori
        const newKategori = new FormData();
        newKategori.append("nama_kategori", formData.nama_kategori);
        newKategori.append("deskripsi_kategori", formData.deskripsi_kategori);
        if (modalType === "add") {
            CreateKategori(newKategori).then(
                () => {
                    alert("Kategori berhasil ditambahkan!");
                    fetchCategories();
                }
            ).catch(
                (error) => {
                    alert(error);
                }
            );
        } else if (modalType === "edit" && selectedCategory) {
            EditKategori(selectedCategory.id_kategori_kelas, formData).then(() => {
                alert("Kategori berhasil diubah!");
                fetchCategories();
            }
            ).catch(
                (error) => {
                    alert(error);
                }
            );
        }
        handleCloseModal();
    };

    const handleDelete = async () => {
        if (selectedCategory) {
            DeleteKategori(selectedCategory.id_kategori_kelas).then(() => {
                alert("Kategori berhasil dihapus!");
                fetchCategories();
            }).catch((error) => {
                alert(error);
            })
        }
        handleCloseModal();
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <Container>
                <h2 className="text-center text-white mb-b mt-4">Manajemen Kategori</h2>
                <Row className="mb-3">
                    <Col md={4} className="d-flex justify-content-start">
                        <Button variant="success" onClick={() => handleShowModal("add")}>Tambah Kategori</Button>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={4} className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Cari Nama Kategori"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    {filteredCategories.map((category) => (
                        <Col key={category.id} md={4} className="mb-4">
                            <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                                <Card.Body>
                                    <Card.Title>{category.nama_kategori}</Card.Title>
                                    <Card.Text>{category.deskripsi_kategori}</Card.Text>
                                    <Button
                                        variant="primary"
                                        className="me-2"
                                        onClick={() => handleShowModal("edit", category)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleShowModal("delete", category)}
                                    >
                                        Hapus
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalType === "add" ? "Tambah Kategori" : modalType === "edit" ? "Edit Kategori" : "Hapus Kategori"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === "delete" ? (
                        <p>Apakah Anda yakin ingin menghapus kategori {selectedCategory?.nama_kategori}?</p>
                    ) : (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama Kategori</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nama_kategori"
                                    value={formData.nama_kategori}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Deskripsi Kategori</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="deskripsi_kategori"
                                    value={formData.deskripsi_kategori}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Batal
                    </Button>
                    {modalType === "delete" ? (
                        <Button variant="danger" onClick={handleDelete}>
                            Hapus
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleSubmit}>
                            Simpan
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default KategoriPage;
