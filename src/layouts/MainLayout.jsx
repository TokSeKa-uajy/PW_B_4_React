import { Outlet } from "react-router-dom";
// import component
import TopNavbar from "../components/SideNavbar";
//mengatur route yang akan ditampilkan di navbar
const routes = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/signup",
        name: "Signup",
    },
];
/* eslint-disable react/prop-types */
const MainLayout = ({ children }) => {
    return (
        <div className="mt-4 pt-5">
            <TopNavbar routes={routes} />
            {children ? children : <Outlet />}
        </div>
    );
};
export default MainLayout;