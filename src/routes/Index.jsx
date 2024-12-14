import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../pages/auth/LoginPages";
import Signup from "../pages/auth/SignupPages";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLayout from "../layouts/UserLayout";
import ProfilPage from "../pages/profilePage";
import KelasPage from "../pages/KelasPage";
import KelasAktifPage from "../pages/KelasAktifPage";
import RiwayatKeanggotaanPage from "../pages/RiwayatKeanggotaanPage";
import KeanggotaanPesan from "../pages/KeanggotaanPesan";
import AdminKelasPage from "../pages/AdminKelasPage";
import KategoriPage from "../pages/KategoriPage";
import KelasDetailPage from "../pages/KelasDetailPage";
import AdminPelatihPage from "../pages/AdminPelatihPage";
import AdminLaporanPage from "../pages/AdminLaporanPage";
import AdminRiwayatKeanggotaan from "../pages/AdminRiwayatKeanggotaan";
import AdminRiwayatKelas from "../pages/AdminRiwayatKelas";
import HomePage from "../pages/HomePage";
const router = createBrowserRouter([
    {
        path: "*",
        element: <div>Routes Not Found!</div>,
    },
    {
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/user",
        element: (
            // <ProtectedRoutes>
                <UserLayout />
            // </ProtectedRoutes>
        ),
        children: [
            {
                path: "/user",
                element: <HomePage />
            },
            {
                path: "/user/profil",
                element: <ProfilPage />,
            },
            {
                path: "/user/kelas",
                element: <KelasPage />,
            },
            {
                path: "/user/kelas-aktif",
                element: <KelasAktifPage />,
            },
            {
                path: "/user/RiwayatKeanggotaanPage",
                element: <RiwayatKeanggotaanPage/>
            },
            {
                path: "/user/Keanggotaan",
                element: <KeanggotaanPesan/>
            },
            {
                path: "/user/AdminKelas",
                element: <AdminKelasPage/>
            },
            {
                path: "/user/AdminKategori",
                element: <KategoriPage/>
            },
            {
                path: "/user/KelasDetail/:id",
                element: <KelasDetailPage/>
            },
            {
                path: "/user/AdminPelatihPage",
                element: <AdminPelatihPage/>
            },
            {
                path: "/user/AdminLaporanPage",
                element: <AdminLaporanPage/>
            },
            {
                path: "/user/AdminLaporanPage/AdminRiwayatKeanggotaan",
                element: <AdminRiwayatKeanggotaan/>
            },
            {
                path: "/user/AdminLaporanPage/AdminRiwayatKelas",
                element: <AdminRiwayatKelas/>
            },
        ],
    },
]);

const AppRouter = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;
