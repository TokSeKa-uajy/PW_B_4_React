import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "../pages/auth/LoginPages";
import Signup from "../pages/auth/SignupPages";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLayout from "../layouts/UserLayout";
import ProfilPage from "../pages/profilePage";
import KelasPage from "../pages/KelasPage";
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
                element: <HomePage />,
            },
            {
                path: "/user/profil",
                element: <ProfilPage />,
            },
            {
                path: "/user/kelas",
                element: <KelasPage />,
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
