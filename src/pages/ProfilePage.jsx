import {
    Form,
    Image,
    Button,
    ButtonGroup,
} from "react-bootstrap";

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { GetUserProfile, UpdateUserProfile } from "../api/apiUser";

import profileVideo from '../assets/backgroundVideo/profileVideo.mp4';
import photoProfileDummy from '../assets/images/photoProfileDummy.jpeg';

import DropdownFloatingForm from '../components/auth/DropdownFloatingForm';
import InputFloatingForm from '../components/auth/inputField';

const ProfilPage = () => {
    const [data, setData] = useState({
        namaDepan: '',
        namaBelakang: '',
        email: "",
        nomorTelepon: '',
        jenisKelamin: '',
        password: '',
        fotoProfil: '',
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

    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const userData = await GetUserProfile();
            console.log("User Data Foto Profil:", userData.foto_profil);
            const profilePicUrl = userData.foto_profil ? `http://localhost:8000/storage/user/${userData.foto_profil}` : photoProfileDummy;
            console.log("User Data Foto Profil:", profilePicUrl);
            setData({
                namaDepan: userData.nama_depan,
                namaBelakang: userData.nama_belakang,
                email: userData.email,
                nomorTelepon: userData.nomor_telepon,
                jenisKelamin: userData.jenis_kelamin,
                fotoProfil: profilePicUrl,
            });
        } catch (err) {
            console.error("Gagal memuat profil:", err);
            setError("Gagal memuat data profil.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                setProfilePic(file);
            } else {
                alert("Silakan pilih file gambar yang valid.");
            }
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("nama_depan", data.namaDepan);
            formData.append("nama_belakang", data.namaBelakang);
            formData.append("email", data.email);
            formData.append("nomor_telepon", data.nomorTelepon);
            formData.append("jenis_kelamin", data.jenisKelamin);
            if (data.password) {
                formData.append("password", data.password);
                formData.append("password_confirmation", data.password);
            }
            if (profilePic) {
                formData.append("foto_profil", profilePic);
            }

            const response = await UpdateUserProfile(formData);
            alert("Profil berhasil diperbarui!");
            setIsEdit(false);
            setData({
                ...data,
                ...response.data,
            });
            fetchProfile();
        } catch (err) {
            console.error(err);
            alert("Gagal memperbarui profil.");
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
                                src={data.fotoProfil}
                                roundedCircle
                                alt="Profile"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        </div>

                        {isEdit && (
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Unggah Foto Profil Baru</Form.Label>
                                <Form.Control type="file" accept="image/*"
                                onChange={handleFileChange} 
                                />
                            </Form.Group>
                        )}

                        <div className="mb-3">
                            <InputFloatingForm
                                label="Nama Depan"
                                placeholder="Masukkan Nama Depan"
                                name="namaDepan"
                                type="text"
                                value={data.namaDepan}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        </div>

                        <div className="mb-3">
                            <InputFloatingForm
                                label="Nama Belakang"
                                placeholder="Masukkan Nama Belakang"
                                name="namaBelakang"
                                type="text"
                                value={data.namaBelakang}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        </div>

                        <div className="mb-3">
                            <InputFloatingForm
                                label="Email"
                                placeholder="Masukkan email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        </div>

                        <div className="mb-3">
                            <InputFloatingForm
                                label="Nomor Telepon"
                                placeholder="Masukkan Nomor Telepon"
                                name="nomorTelepon"
                                type="text"
                                value={data.nomorTelepon}
                                onChange={handleChange}
                                disabled={!isEdit}
                            />
                        </div>

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
                                disabled={!isEdit}
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
                                        onClick={() => navigate(route.path)}
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