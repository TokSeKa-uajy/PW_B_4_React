import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../components/SideNavbar";

const UserLayout = ({ children }) => {
    const [role, setRole] = useState("");

    useEffect(() => {
        const userRole = sessionStorage.getItem("role");
        setRole(userRole);
    }, []);

    const routes = [
        {
            path: "/user",
            name: "Home",
            roles: ["user", "admin"],
        },
        {
            path: "/user/Kelas",
            name: "Kelas",
            roles: ["user", "admin"],
        },
        {
            path: "/user/Keanggotaan",
            name: "Keanggotaan",
            roles: ["user", "admin"],
        },
        {
            path: "/user/AdminKelas",
            name: "AdminKelas",
            roles: ["admin"],
        },
        {
            path: "/user/AdminKategori",
            name: "AdminKategori",
            roles: ["admin"],
        },
        {
            path: "/user/AdminPelatihPage",
            name: "AdminPelatihPage",
            roles: ["admin"],
        },
        {
            path: "/user/AdminLaporanPage",
            name: "AdminLaporanPage",
            roles: ["admin"],
        },
    ];

    const filteredRoutes = routes.filter((route) => route.roles.includes(role));

    return (
        <div className="">
            <TopNavbar routes={filteredRoutes} />
            {children ? children : <Outlet />}
        </div>
    );
};

export default UserLayout;
