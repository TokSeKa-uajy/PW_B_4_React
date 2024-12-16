import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import './css/homePage.css';
import homeVideo from '../assets/backgroundVideo/authVideo.mp4';

const HomePage = () => {
  const navigate = useNavigate();  

  return (
    <Container>
      <div className="container-content">
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
            onClick={() => navigate(`/user/Keanggotaan`)}
          >
            Coba Membership
          </Button>
        </main>
      </div>
      <div className="container-carousel2 mt-5">
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