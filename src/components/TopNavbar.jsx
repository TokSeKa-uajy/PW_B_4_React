import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Offcanvas, Button, Nav, Image, Dropdown } from "react-bootstrap";
import imgAH from "../assets/images/logoGym.png";
import profileImg from "../assets/images/photoProfileDummy.jpeg"; // Gambar profil

const SideNavbar = ({ routes, user }) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [data, setData] = useState({
        namaDepan: "123",
    });

    const toggleSidebar = () => setShow(!show);

    const logout = () => {
        navigate("/");
    };

    const goToProfile = () => {
        navigate("/user/profil"); // Pastikan rute profil sesuai dengan aplikasi Anda
    };

    const goToMembership = () => {
        navigate("/user/membership"); // Pastikan rute membership sesuai dengan aplikasi Anda
    };

    return (
        <>
            {/* Hamburger Menu */}
            {!show && (
                <Button
                    variant="light"
                    onClick={toggleSidebar}
                    className="hamburger-btn"
                    style={{
                        position: "fixed",
                        top: "15px",
                        left: "15px",
                        zIndex: 1050,
                        border: "none",
                        backgroundColor: "transparent",
                    }}
                >
                    <div className="hamburger-icon">
                        <div />
                        <div />
                        <div />
                    </div>
                </Button>
            )}

            {/* Profil Pengguna dengan Dropdown */}
            <div
                style={{
                    position: "fixed",
                    top: "15px",
                    right: "15px",
                    zIndex: 1050,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Dropdown>
                    <Dropdown.Toggle
                        variant="link"
                        id="dropdown-profile"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            border: "none",
                            backgroundColor: "transparent",
                            color: "#fff",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        {/* Foto Profil */}
                        <Image
                            src={profileImg}
                            alt="Profile"
                            roundedCircle
                            style={{
                                width: "40px",
                                height: "40px",
                                border: "2px solid #fff",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                marginRight: "10px",
                            }}
                        />
                        {/* Nama Pengguna */}
                        <span
                            style={{
                                fontWeight: "bold",
                                color: "#fff",
                                fontSize: "16px",
                            }}
                        >
                            {data?.namaDepan}
                        </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={goToProfile}>
                            Edit Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={goToMembership}>
                            Membership
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logout} className="text-danger">
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Sidebar */}
            <Offcanvas
                show={show}
                onHide={toggleSidebar}
                placement="start"
                style={{
                    width: "250px", // Lebar sidebar lebih kecil
                    maxWidth: "250px", // Batas maksimal lebar
                }}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Image
                            src={imgAH}
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        {routes?.map((route, index) => (
                            <Nav.Link
                                key={index}
                                onClick={() => {
                                    navigate(route.path);
                                    toggleSidebar();
                                }}
                            >
                                <Button
                                    variant={
                                        location.pathname === route.path
                                            ? "primary"
                                            : "light"
                                    }
                                    className="w-100 mb-2"
                                >
                                    {route.name}
                                </Button>
                            </Nav.Link>
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Optional CSS */}
            <style>
                {`
                .hamburger-icon {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 25px;
                    height: 20px;
                }
                .hamburger-icon div {
                    width: 100%;
                    height: 3px;
                    background-color: #fff;
                    border-radius: 2px;
                }
                `}
            </style>
        </>
    );
};

export default SideNavbar;