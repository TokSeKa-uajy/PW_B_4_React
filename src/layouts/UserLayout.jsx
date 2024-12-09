import { Outlet } from "react-router-dom";
// import component
import TopNavbar from "../components/TopNavbar";
//mengatur route yang akan ditampilkan di navbar
const routes = [
    {
        path: "/user",
        name: "Home",
    },
    {
        path: "/user/Kelas",
        name: "Kelas",
    },
    {
        path: "/user/Keanggotaan",
        name: "Keanggotaan",
    }
];
const UserLayout = ({ children }) => {
    return (
        <div className="">
            <TopNavbar routes={routes} />
            {children ? children : <Outlet />}
        </div>
    );
};
export default UserLayout;