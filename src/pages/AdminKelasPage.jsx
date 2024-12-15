import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Dropdown } from "react-bootstrap";
import backgroundImage from "../assets/images/kelasBackground.jpg";
import { GetAllKelas, CreateKelas, UpdateKelas, DeleteKelas } from "../api/apiKelasAdmin";
import { GetAllKategori } from "../api/apiKategoriAdmin";
import { GetAllPelatih } from "../api/apiPelatihAdmin";
import { createPaketKelas, GetAllPaketKelasById, updatePaketKelas } from "../api/apiPaketKelasAdmin";

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
    id_pelatih: "",
    id_kategori_kelas: "",
    nama_kelas: "",
    deskripsi: "",
    hari: "",
    jam_mulai: "",
    durasi: "",
    kapasitas_kelas: "",
  });

  const fetchClasses = () => {
    GetAllKelas()
      .then(
        (data) => {
          setKelasList(data);
          setFilteredClasses(data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // Panggil API GetAllKategori
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

  const fetchTrainers = () => {
    GetAllPelatih()
      .then(
        (data) => {
          setTrainers(data);
        },
        (error) => {
          console.log(error);
        }
      )
  };

  useEffect(() => {
    fetchClasses();
    fetchCategories();
    fetchTrainers();
  }, []);

  const [customPrices, setCustomPrices] = useState({
    // default
    "1_bulan": 200000,
    "6_bulan": 1000000,
    "1_tahun": 1500000,
  });

  useEffect(() => {
    let filtered = kelasList;

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
        id_kategori_kelas: kelas.id_kategori_kelas,
        deskripsi: kelas.deskripsi,
      });
      GetAllPaketKelasById(kelas.id_kelas)
        .then((data) => {
          const updatedPrices = {
            "1_bulan": data.find((p) => p.durasi === "1_bulan")?.harga || 200000,
            "6_bulan": data.find((p) => p.durasi === "6_bulan")?.harga || 1000000,
            "1_tahun": data.find((p) => p.durasi === "1_tahun")?.harga || 1500000,
          };
          setCustomPrices(updatedPrices);
        })
        .catch((error) => {
          console.error("Gagal memuat paket kelas:", error);
        });
    } else {
      setFormData({ nama_kelas: "", hari: "", jam_mulai: "", durasi: "", kapasitas_kelas: "", id_pelatih: "", id_kategori_kelas: "", deskripsi: "" });
      setCustomPrices({
        "1_bulan": 200000,
        "6_bulan": 1000000,
        "1_tahun": 1500000,
      });
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

  // Mengatur perubahan harga custom
  const handlePriceChange = (durasi, value) => {
    setCustomPrices(prevPrices => ({
      ...prevPrices,
      [durasi]: parseInt(value) || 0,
    }));
  };

  const formatTime = (time) => {
    if (!time) return ""; // Jika waktu kosong, kembalikan string kosong
    const [hours, minutes] = time.split(":");
    return `${parseInt(hours, 10)}:${minutes}`; // Menghapus leading zero dari jam
  };

  const handleSubmit = async () => {
    const newKelas = new FormData();
    newKelas.append("id_pelatih", formData.id_pelatih);
    newKelas.append("id_kategori_kelas", formData.id_kategori_kelas);
    newKelas.append("nama_kelas", formData.nama_kelas);
    newKelas.append("deskripsi", formData.deskripsi || ""); // Handle deskripsi nullable
    newKelas.append("hari", formData.hari);
    newKelas.append("kapasitas_kelas", formData.kapasitas_kelas);
    // Format waktu sebelum dikirim
    newKelas.append("jam_mulai", formatTime(formData.jam_mulai));
    newKelas.append("durasi", formatTime(formData.durasi));
    if (modalType === "add") {
      // api
      CreateKelas(newKelas)
        .then((data) => {
          // Panggil API untuk membuat data paket kelas berdasarkan id_kelas
          const paketDurasi = [
            { durasi: "1_bulan", harga: customPrices["1_bulan"] },
            { durasi: "6_bulan", harga: customPrices["6_bulan"] },
            { durasi: "1_tahun", harga: customPrices["1_tahun"] },
          ];

          // Array promises untuk panggilan API
          const paketPromises = paketDurasi.map((paket) =>
            createPaketKelas({
              id_kelas: data.id_kelas, // ID kelas dari hasil CreateKelas
              durasi: paket.durasi,
              harga: paket.harga,
            })
          );

          // Panggil API untuk membuat data paket kelas berdasarkan id_kelas
          // Jalankan semua promise secara paralel
          Promise.all(paketPromises)
            .then(() => {
              console.log("Semua paket kelas berhasil dibuat.");
              fetchClasses(); // Refresh daftar kelas
            })
            .catch((err) => {
              console.error("Gagal membuat paket kelas:", err);
            });

          fetchClasses();
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (modalType === "edit" && selectedKelas) {
      UpdateKelas(selectedKelas.id_kelas, newKelas)
        .then(() => {
        })
        .catch((err) => {
          console.error(err);
        });
      GetAllPaketKelasById(selectedKelas.id_kelas)
        .then((existingPaket) => {
          const paketDurasi = [
            { durasi: "1_bulan", harga: customPrices["1_bulan"] },
            { durasi: "6_bulan", harga: customPrices["6_bulan"] },
            { durasi: "1_tahun", harga: customPrices["1_tahun"] },
          ];

          const paketPromises = paketDurasi.map((paket) => {
            // Cek apakah paket sudah ada
            const existing = existingPaket.find((p) => p.durasi === paket.durasi);

            if (existing) {
              // Update paket yang sudah ada
              return updatePaketKelas(existing.id_paket_kelas, {
                id_kelas: selectedKelas.id_kelas,
                durasi: paket.durasi,
                harga: paket.harga,
              });
            } else {
              // Buat paket baru jika belum ada
              return createPaketKelas({
                id_kelas: selectedKelas.id_kelas,
                durasi: paket.durasi,
                harga: paket.harga,
              });
            }
          });

          // Jalankan semua update dan create secara paralel
          Promise.all(paketPromises)
            .then(() => {
              console.log("Paket kelas berhasil diperbarui.");
              fetchClasses();
            })
            .catch((err) => {
              console.error("Gagal memperbarui paket kelas:", err);
            });
        })
        .catch((err) => {
          console.error("Gagal mengambil data paket kelas:", err);
        });
    }
    handleCloseModal();
  };

  const handleDelete = async () => {
    if (selectedKelas) {
      DeleteKelas(selectedKelas.id_kelas)
        .then(() => {
          fetchClasses();
        })
        .catch((err) => {
          console.error(err);
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
        <h2 className="text-center text-white mb-4">Manajemen Kelas</h2>
        <Row className="mb-3 justify-content-end">
          <Col xs="auto" className="ms-3">
            <Button variant="success" className="mb-3" onClick={() => handleShowModal("add")}>Tambah Kelas</Button>
          </Col>
          <Col></Col>
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

        </Row>
        <Row>
          {filteredClasses.map((kelas) => (
            <Col key={kelas.id} md={4} className="mb-4">
              <Card style={{ backgroundColor: "rgba(245, 255, 255, 0.47)" }}>
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
                  type="time"
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
                  name="id_kategori_kelas"
                  value={formData.id_kategori_kelas}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id_kategori_kelas}>{category.nama_kategori}</option>
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
                    <option key={trainer.id_pelatih} value={trainer.id_pelatih}>{trainer.nama_depan} {trainer.nama_belakang}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              {/* Input untuk harga custom berdasarkan durasi */}
              <Form.Group className="mb-3">
                <Form.Label>Custom Harga untuk Durasi</Form.Label>
                {Object.entries(customPrices).map(([durasi, harga]) => (
                  <Form.Group key={durasi} className="mb-2">
                    <Form.Label>{durasi.replace("_", " ")}</Form.Label>
                    <Form.Control
                      type="number"
                      value={harga}
                      onChange={(e) => handlePriceChange(durasi, e.target.value)}
                    />
                  </Form.Group>
                ))}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Masukkan deskripsi kelas"
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

export default AdminKelasPage;
