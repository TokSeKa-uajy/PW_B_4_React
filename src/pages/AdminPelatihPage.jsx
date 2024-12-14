import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import backgroundImage from "../assets/images/kelasBackground.jpg";
import axios from "axios";

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

    useEffect(() => {
        // Simulasi fetch data dummy pelatih
        const fetchPelatihData = () => {
            const dummyPelatih = [
                { id: 1, nama_depan: "John", nama_belakang: "Doe", jenis_kelamin: 0, foto_profil: "https://via.placeholder.com/150" },
                { id: 2, nama_depan: "Jane", nama_belakang: "Smith", jenis_kelamin: 1, foto_profil: "https://via.placeholder.com/150" },
            ];
            setPelatihList(dummyPelatih);
            setFilteredPelatih(dummyPelatih);
        };

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
    const handleSubmit = async () => {
        if (modalType === "add") {
            const newPelatih = { ...formData, id: pelatihList.length + 1, foto_profil: URL.createObjectURL(formData.foto_profil) };
            setPelatihList([...pelatihList, newPelatih]);
        } else if (modalType === "edit" && selectedPelatih) {
            const updatedList = pelatihList.map(pelatih => pelatih.id === selectedPelatih.id ? { ...pelatih, ...formData, foto_profil: URL.createObjectURL(formData.foto_profil) } : pelatih);
            setPelatihList(updatedList);
        }
        handleCloseModal();
    };

    // Menghapus pelatih
    const handleDelete = (id) => {
        const updatedList = pelatihList.filter(pelatih => pelatih.id !== id);
        setPelatihList(updatedList);
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
                        <Col key={pelatih.id} md={4} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={pelatih.foto_profil} alt="Foto Profil" style={{ height: "200px", objectFit: "cover" }} />
                                <Card.Body>
                                    <Card.Title>{pelatih.nama_depan} {pelatih.nama_belakang}</Card.Title>
                                    <Card.Text>
                                        Jenis Kelamin: {pelatih.jenis_kelamin === 0 ? "Laki-laki" : "Perempuan"}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleShowModal("edit", pelatih)}>Edit</Button>
                                    <Button variant="danger" className="ms-2" onClick={() => handleDelete(pelatih.id)}>Hapus</Button>
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
                                <option value={0}>Laki-laki</option>
                                <option value={1}>Perempuan</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Foto Profil</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".png, .jpg, .jpeg"
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
