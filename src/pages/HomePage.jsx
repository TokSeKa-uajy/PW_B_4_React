import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import './css/homePage.css';
import homeVideo from '../assets/backgroundVideo/authVideo.mp4'; // Pastikan file ini berada di path yang benar

const HomePage = () => {
  const { id } = useParams();
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const navigate = useNavigate();

  const groupClasses = (classes, groupSize) => {
    const grouped = [];
    for (let i = 0; i < classes.length; i += groupSize) {
      grouped.push(classes.slice(i, i + groupSize));
    }
    return grouped;
  };  

  useEffect(() => {
    const dummyClasses = [
      { id: 1, image: 'https://via.placeholder.com/150', nama_kelas: 'Yoga for Beginners', hari: 'Senin', jam_mulai: '08:00', durasi: '60 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Yoga' },
      { id: 2, image: 'https://via.placeholder.com/150', nama_kelas: 'Advanced Pilates', hari: 'Rabu', jam_mulai: '10:00', durasi: '90 mins', kapasitas_kelas: 15, id_pelatih: 2, category: 'Pilates' },
      { id: 3, image: 'https://via.placeholder.com/150', nama_kelas: 'HIIT Training', hari: 'Senin', jam_mulai: '07:00', durasi: '45 mins', kapasitas_kelas: 30, id_pelatih: 3, category: 'HIIT' },
      { id: 4, image: 'https://via.placeholder.com/150', nama_kelas: 'Cardio Workout', hari: 'Jumat', jam_mulai: '18:00', durasi: '60 mins', kapasitas_kelas: 25, id_pelatih: 4, category: 'Cardio' },
      { id: 5, image: 'https://via.placeholder.com/150', nama_kelas: 'Strength Training', hari: 'Selasa', jam_mulai: '09:00', durasi: '75 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Strength' },
      { id: 6, image: 'https://via.placeholder.com/150', nama_kelas: 'Strength Training', hari: 'Rabu', jam_mulai: '09:00', durasi: '75 mins', kapasitas_kelas: 20, id_pelatih: 1, category: 'Strength' }
  ];
    setClasses(dummyClasses);
    setFilteredClasses(groupClasses(dummyClasses, 2));
  }, []);  

  return (
    <Container>
      <div className="container-content">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          preload="auto"
          className="background-video"
        >
          <source src={homeVideo} type="video/mp4" />
        </video>
        <main>
          <h1>JADILAH MEMBER UNTUK MENEMUKAN POTENSIMU</h1>
          <p>
            Latihan lebih dari sekadar fisik, ini tentang menemukan potensi diri. Wujudkan bersama ATMA SPORT.
          </p>
          <Button className="member-btn"
            onClick={() => navigate(`/user/kelas`)}
          >
            Coba Membership
          </Button>
        </main>
      </div>
      <div className="container-carousel1">
        <h1 className='mb-5'>KELAS</h1>
        {/* Carousel */}
        {filteredClasses.length > 0 && (
        <Carousel style={{ width: '100%', 
          margin: '0 auto', 
          zIndex: '1'}}>
          {filteredClasses.map((group, index) => (
            <Carousel.Item key={index}>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '50px',
                  marginLeft: '10%',
                  marginRight: '10%',
                  color: 'white',
                  gap: '50px'
                }}
              >
                {group.map((dummyClass) => (
                  <Col key={dummyClass.id} md={5} style={{borderRadius: '20px', border: '2px solid white', boxShadow: '0px 4px 10px rgba(255, 255, 255, 0.2)'}}>
                    <Row>
                      {/* Kolom Gambar */}
                      <Row>
                        <Image
                          src={dummyClass.image}
                          alt={dummyClass.nama_kelas}
                          fluid
                          className="kelas-image"
                          style={{
                            marginTop: '50px',
                            marginLeft: '20%',
                          }}
                        />
                      </Row>

                      {/* Kolom Detail Data */}
                      <Col md={8} style={{marginTop: '50px', marginBottom: '50px', marginLeft: '18%'}}>
                        <h3>{dummyClass.nama_kelas}</h3>
                        <p>
                          <strong>Jadwal:</strong> {dummyClass.hari}
                        </p>
                        <p>
                          <strong>Jam Mulai:</strong> {dummyClass.jam_mulai}
                        </p>
                        <p>
                          <strong>Kapasitas:</strong> {dummyClass.kapasitas_kelas}
                        </p>
                        <Button
                          variant="primary"
                          onClick={() => navigate(`/user/kelas`)}
                        >
                          Detail
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
        )}
        </div>
      <div className="container-carousel2">
        <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <span style={{color: 'white'}}>© 2024 by Gym Atma</span>
            </div>
        </footer>
      </div>
    </Container>
  );
};

export default HomePage;