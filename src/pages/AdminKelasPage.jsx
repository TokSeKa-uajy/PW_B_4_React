import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import backgroundImage from "../assets/images/kelasBackground.jpg";
import axios from "axios";

const AdminKelasPage = () => {
  const [kelasList, setKelasList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedDay, setSelectedDay] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit" or "delete"
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [formData, setFormData] = useState({
    nama_kelas: "",
    hari: "",
    jam_mulai: "",
    durasi: "",
    kapasitas_kelas: "",
    id_pelatih: "",
    category: "",
  });

  useEffect(() => {
    const fetchData = () => {
      const dummyClasses = [
        { id: 1, image: 'https://via.placeholder.com/150', nama_kelas: 'Yoga for Beginners', hari: 'Senin', jam_mulai: '08:00', durasi: '60 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Yoga' },
        { id: 2, image: 'https://via.placeholder.com/150', nama_kelas: 'Advanced Pilates', hari: 'Rabu', jam_mulai: '10:00', durasi: '90 mins', kapasitas_kelas: 15, id_pelatih: 2, category: 'Pilates' },
        { id: 3, image: 'https://via.placeholder.com/150', nama_kelas: 'HIIT Training', hari: 'Senin', jam_mulai: '07:00', durasi: '45 mins', kapasitas_kelas: 30, id_pelatih: 3, category: 'HIIT' },
        { id: 4, image: 'https://via.placeholder.com/150', nama_kelas: 'Cardio Workout', hari: 'Jumat', jam_mulai: '18:00', durasi: '60 mins', kapasitas_kelas: 25, id_pelatih: 4, category: 'Cardio' },
        { id: 5, image: 'https://via.placeholder.com/150', nama_kelas: 'Strength Training', hari: 'Selasa', jam_mulai: '09:00', durasi: '75 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Strength' },
        { id: 6, image: 'https://via.placeholder.com/150', nama_kelas: 'Strength Training', hari: 'Rabu', jam_mulai: '09:00', durasi: '75 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Strength' }
      ];
      setKelasList(dummyClasses);
      setFilteredClasses(dummyClasses);
    };

    const fetchCategories = () => {
      const dummyCategories = ['Semua', 'Yoga', 'Pilates', 'HIIT', 'Cardio', 'Strength'];
      setCategories(dummyCategories);
    };

    const fetchTrainers = () => {
      const dummyTrainers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson' },
        { id: 4, name: 'Emily Davis' },
      ];
      setTrainers(dummyTrainers);
    };

    fetchData();
    fetchCategories();
    fetchTrainers();
  }, []);

  useEffect(() => {
    let filtered = kelasList;

    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    if (selectedDay !== 'Semua') {
      filtered = filtered.filter((c) => c.hari === selectedDay);
    }

    if (searchQuery) {
      filtered = filtered.filter((cls) =>
        cls.nama_kelas.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClasses(filtered);
  }, [selectedCategory, selectedDay, searchQuery, kelasList]);

  const handleShowModal = (type, kelas = null) => {
    setModalType(type);
    setSelectedKelas(kelas);
    if (type === "edit" && kelas) {
      setFormData({
        nama_kelas: kelas.nama_kelas,
        hari: kelas.hari,
        jam_mulai: kelas.jam_mulai,
        durasi: kelas.durasi,
        kapasitas_kelas: kelas.kapasitas_kelas,
        id_pelatih: kelas.id_pelatih,
        category: kelas.category,
      });
    } else {
      setFormData({ nama_kelas: "", hari: "", jam_mulai: "", durasi: "", kapasitas_kelas: "", id_pelatih: "", category: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedKelas(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (modalType === "add") {
      const newKelas = { ...formData, id: kelasList.length + 1 };
      setKelasList([...kelasList, newKelas]);
    } else if (modalType === "edit" && selectedKelas) {
      const updatedList = kelasList.map((kelas) =>
        kelas.id === selectedKelas.id ? { ...selectedKelas, ...formData } : kelas
      );
      setKelasList(updatedList);
    }
    handleCloseModal();
  };

  const handleDelete = async () => {
    if (selectedKelas) {
      const updatedList = kelasList.filter((kelas) => kelas.id !== selectedKelas.id);
      setKelasList(updatedList);
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
        <h2 className="text-center text-white mb-4">Manajemen Kelas</h2>
        <Row className="mb-3">
          <Col md={4} className="mb-2">
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4} className="mb-2">
            <Form.Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
              <option value="Minggu">Minggu</option>
            </Form.Select>
          </Col>
          <Col md={4} className="mb-2">
            <Form.Control
              type="text"
              placeholder="Cari Nama Kelas"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <Button variant="success" className="mb-3" onClick={() => handleShowModal("add")}>Tambah Kelas</Button>
        </div>
        <Row>
          {filteredClasses.map((kelas) => (
            <Col key={kelas.id} md={4} className="mb-4">
              <Card style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <Card.Body>
                  <Card.Title>{kelas.nama_kelas}</Card.Title>
                  <Card.Text>
                    Hari: {kelas.hari}
                    <br />
                    Jam Mulai: {kelas.jam_mulai}
                    <br />
                    Durasi: {kelas.durasi}
                    <br />
                    Kapasitas: {kelas.kapasitas_kelas} orang
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleShowModal("edit", kelas)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal("delete", kelas)}
                  >
                    Delete
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
            {modalType === "add" ? "Tambah Kelas" : modalType === "edit" ? "Edit Kelas" : "Hapus Kelas"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>Apakah Anda yakin ingin menghapus kelas {selectedKelas?.nama_kelas}?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama Kelas</Form.Label>
                <Form.Control
                  type="text"
                  name="nama_kelas"
                  value={formData.nama_kelas}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hari</Form.Label>
                <Form.Select
                  name="hari"
                  value={formData.hari}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Hari</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                  <option value="Minggu">Minggu</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jam Mulai</Form.Label>
                <Form.Control
                  type="time"
                  name="jam_mulai"
                  value={formData.jam_mulai}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Durasi</Form.Label>
                <Form.Control
                  type="text"
                  name="durasi"
                  value={formData.durasi}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kapasitas Kelas</Form.Label>
                <Form.Control
                  type="number"
                  name="kapasitas_kelas"
                  value={formData.kapasitas_kelas}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kategori</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pelatih</Form.Label>
                <Form.Select
                  name="id_pelatih"
                  value={formData.id_pelatih}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Pelatih</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                  ))}
                </Form.Select>
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

export default AdminKelasPage;
