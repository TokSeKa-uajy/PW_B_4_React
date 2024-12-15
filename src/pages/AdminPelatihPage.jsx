import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import backgroundImage from "../assets/images/kelasBackground.jpg";
import { GetAllPelatih, createPelatih, updatePelatih, hapusPelatih } from "../api/apiPelatihAdmin";
import { getFotoPelatih } from '../api';


const AdminPelatihPage = () => {
    // State untuk menyimpan daftar pelatih
    const [pelatihList, setPelatihList] = useState([]);
    const [filteredPelatih, setFilteredPelatih] = useState([]); // State untuk daftar pelatih setelah difilter
    const [searchQuery, setSearchQuery] = useState(""); // Query pencarian pelatih
    const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
    const [modalType, setModalType] = useState("add"); // Tipe modal, "add" untuk tambah, "edit" untuk edit
    const [selectedPelatih, setSelectedPelatih] = useState(null); // Pelatih yang dipilih untuk diedit

    // State untuk form data pelatih
    const [formData, setFormData] = useState({
        nama_depan: "",
        nama_belakang: "",
        jenis_kelamin: "",
        foto_profil: null,
    });
    const fetchPelatihData = () => {
        // Simulasi fetch data dummy pelatih
        GetAllPelatih().then((data) => {
            setPelatihList(data);
            setFilteredPelatih(data);
        }
        );
    };
    useEffect(() => {
        fetchPelatihData();
    }, []);

    // Menampilkan modal dengan tipe (add/edit) dan data pelatih
    const handleShowModal = (type, pelatih = null) => {
        setModalType(type);
        setSelectedPelatih(pelatih);

        // Jika mode edit, isi form dengan data pelatih yang dipilih
        if (type === "edit" && pelatih) {
            setFormData({
                nama_depan: pelatih.nama_depan,
                nama_belakang: pelatih.nama_belakang,
                jenis_kelamin: pelatih.jenis_kelamin,
                foto_profil: pelatih.foto_profil,
            });
        } else {
            // Reset form data jika mode tambah
            setFormData({ nama_depan: "", nama_belakang: "", jenis_kelamin: "", foto_profil: null });
        }
        setShowModal(true);
    };

    // Menutup modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPelatih(null);
    };

    // Mengatur perubahan input pada form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Mengatur perubahan file untuk foto profil
    const handleFileChange = (e) => {
        setFormData({ ...formData, foto_profil: e.target.files[0] });
    };

    // Menyimpan data pelatih baru atau memperbarui pelatih yang sudah ada
    const handleSubmit = () => {
        const newPelatih = new FormData();
        newPelatih.append("nama_depan", formData.nama_depan);
        newPelatih.append("nama_belakang", formData.nama_belakang);
        newPelatih.append("jenis_kelamin", formData.jenis_kelamin);
        if (formData.foto_profil instanceof File) {
            newPelatih.append("foto_profil", formData.foto_profil);
        }
        console.log(newPelatih.get("nama_depan"));
        if (modalType === "add") {
            // Create Pake API
            createPelatih(newPelatih)
                .then(() => {
                    fetchPelatihData();
                    handleCloseModal();
                })
        } else if (modalType === "edit" && selectedPelatih) {
            // Update Pake API
            updatePelatih(selectedPelatih.id_pelatih, newPelatih)
                .then((data) => {
                    fetchPelatihData();
                    handleCloseModal();
                })
        }
    };

    // Menghapus pelatih
    const handleDelete = (id) => {
        hapusPelatih(id).then(() => {
            fetchPelatihData();
            handleCloseModal();
        })
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
                <h2 className="text-center text-white mb-4">Manajemen Pelatih</h2>

                {/* Tombol untuk menambah pelatih */}
                <div className="d-flex justify-content-end">
                    <Button variant="success" onClick={() => handleShowModal("add")}>Tambah Pelatih</Button>
                </div>

                {/* Daftar pelatih yang difilter */}
                <Row>
                    {filteredPelatih.map((pelatih) => (
                        <Col key={pelatih.id} md={4} className="mb-4 mt-4">
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={pelatih.foto_profil ? getFotoPelatih(pelatih.foto_profil) : "https://via.placeholder.com/200x200?text=No+Image"}
                                    alt="Foto Profil"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />

                                <Card.Body>
                                    <Card.Title>{pelatih.nama_depan} {pelatih.nama_belakang}</Card.Title>
                                    <Card.Text>
                                        Jenis Kelamin: {pelatih.jenis_kelamin}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleShowModal("edit", pelatih)}>Edit</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => handleDelete(pelatih.id_pelatih)}>Hapus</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal untuk tambah/edit pelatih */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === "add" ? "Tambah Pelatih" : "Edit Pelatih"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Depan</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama_depan"
                                value={formData.nama_depan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Belakang</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama_belakang"
                                value={formData.nama_belakang}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Select
                                name="jenis_kelamin"
                                value={formData.jenis_kelamin}
                                onChange={handleInputChange}
                            >
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value={"pria"}>Pria</option>
                                <option value={"wanita"}>Wanita</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Foto Profil</Form.Label>
                            <Form.Control
                                type="file"
                                name="foto_profil"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Batal</Button>
                    <Button variant="primary" onClick={handleSubmit}>Simpan</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminPelatihPage;
