import {
    Form,
    Image,
    Button,
    ButtonGroup,
} from "react-bootstrap";

// import { useMutation } from "@tanstack/react-query";
// import { GetMyContents, DeleteContent } from "../api/apiContent";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import profileVideo from '../assets/backgroundVideo/profileVideo.mp4';
import photoProfileDummy from '../assets/images/photoProfileDummy.jpeg';

import DropdownFloatingForm from '../components/auth/DropdownFloatingForm';
import InputFloatingForm from '../components/auth/inputField';

// TODO
// logika API yang krusial : 
// 1. Kalau data kosong gak usah kirim ke server
// 2. Kalau data ada diisi, lakukan update ke server tapi, kalau data lama sama dengan data baru, gak usah kirim ke server
// 3. Aku butuh API untuk mengambil data profile dari server
// 4. Aku butuh API khusus untuk Foto Profil update dan read

const ProfilPage = () => {
    const [data, setData] = useState({
        namaDepan: '123',
        namaBelakang: '1234',
        email: "123@123.com",
        nomorTelepon: '123',
        jenisKelamin: '123',
        password: '',
    });

    const genderOptions = [
        { label: 'Pria', value: 'pria' },
        { label: 'Wanita', value: 'wanita' },
    ];

    const routes = [
        {
            path: "/user/kelas-aktif",
            name: "Kelas Aktif",
        },
        {
            path: "/user/RiwayatKeanggotaanPage",
            name: "Keanggotaan Saya",
        },
    ];

    const navigate = useNavigate(); // React Router's hook for navigation
    const location = useLocation(); // Get current location/pathname

    // const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false); // Toggle for edit mode

    // Handle file selection
    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         // Check if the file is an image
    //         if (file.type.startsWith("image/")) {
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 setProfilePic(reader.result); // Set the image preview
    //             };
    //             reader.readAsDataURL(file); // Read the file as a data URL
    //         } else {
    //             toast.error("Please select a valid image file");
    //         }
    //     }
    // };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // Simulate profile update action (API call or other logic)
            // const res = await updateProfile(data); // Use your API call here
            toast.success('Profile updated successfully');
            setIsEdit(false); // Exit edit mode after submission
        } catch (err) {
            console.error(err);
            toast.error(err.message || "An error occurred while updating the profile");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='video-background'>
            <video autoPlay="autoplay" loop="loop" muted playsInline className="video">
                <source src={profileVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-75'>
                <div className='form_container p-5 rounded bg-white shadow text-dark bg-opacity-50'>
                    <h3 className='text-center mb-2 fw-bold'>Profil Anda</h3>
                    <form onSubmit={handleSubmit}>
                        <div className={`d-flex justify-content-center ${isEdit ? "mb-2" : "mb-4"}`}>
                            <Image
                                src={photoProfileDummy}
                                roundedCircle
                                alt="Profile"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        </div>

                        {isEdit && (
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Unggah Foto Profil Baru</Form.Label>
                                <Form.Control type="file" accept="image/*"
                                // onChange={handleFileChange} 
                                />
                            </Form.Group>
                        )}

                        {/* Nama Depan */}
                        <div className="mb-3">
                            <InputFloatingForm
                                label="Nama Depan"
                                placeholder="Masukkan Nama Depan"
                                name="namaDepan"
                                type="text"
                                value={data.namaDepan}
                                onChange={handleChange}
                                disabled={!isEdit} // Disable when not in edit mode
                            />
                        </div>

                        {/* Nama Belakang */}
                        <div className="mb-3">
                            <InputFloatingForm
                                label="Nama Belakang"
                                placeholder="Masukkan Nama Belakang"
                                name="namaBelakang"
                                type="text"
                                value={data.namaBelakang}
                                onChange={handleChange}
                                disabled={!isEdit} // Disable when not in edit mode
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <InputFloatingForm
                                label="Email"
                                placeholder="Masukkan email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                disabled={!isEdit} // Disable when not in edit mode
                            />
                        </div>

                        {/* Nomor Telepon */}
                        <div className="mb-3">
                            <InputFloatingForm
                                label="Nomor Telepon"
                                placeholder="Masukkan Nomor Telepon"
                                name="nomorTelepon"
                                type="text"
                                value={data.nomorTelepon}
                                onChange={handleChange}
                                disabled={!isEdit} // Disable when not in edit mode
                            />
                        </div>

                        {/* Jenis Kelamin (Dropdown) */}
                        <div className="mb-3">
                            <DropdownFloatingForm
                                label="Jenis Kelamin"
                                name="jenisKelamin"
                                options={[
                                    { label: "Pria", value: "pria" },
                                    { label: "Wanita", value: "wanita" },
                                ]}
                                value={data.jenisKelamin}
                                onChange={handleChange}
                                disabled={!isEdit} // Disable when not in edit mode
                            />
                        </div>

                        {isEdit && (
                            <InputFloatingForm
                                label="Password Baru"
                                placeholder="Masukkan password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                        )}

                        {!isEdit && (
                            <ButtonGroup horizontal className="w-100 mt-2">
                                <Button className="w-100" onClick={() => setIsEdit(!isEdit)}> Edit Profil </Button>
                                {routes?.map((route, index) => (
                                    <Button
                                        key={index}
                                        className="w-100 ms-2"
                                        onClick={() => navigate(route.path)} // Using navigate directly
                                    >
                                        {route.name}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        )}
                        {isEdit && (
                            <ButtonGroup horizontal className="w-100 mt-2">
                                <Button className="w-100" onClick={() => setIsEdit(!isEdit)}> Batal </Button>
                                <Button className="w-100 ms-2" type="submit"> Simpan </Button>
                            </ButtonGroup>
                        )}
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ProfilPage;