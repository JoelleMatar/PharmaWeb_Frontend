import * as React from "react";
import {Navigate, useRoutes } from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import PharmacyDashboard from "./pages/pharmacyDashboard/PharmacyDashboard";
import SignUp from "./pages/signup/SignUp";

function Routing() {
    let element = useRoutes([
        {
            path: "/",
            children: [
                { path: '/', element: <Navigate to="/home" replace /> }
            ]
        },
        // AUTH
        {
            path: "/auth",
            // element: <LogoOnlyLayout />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "signup",
                    element: <SignUp />,
                }
            ],
        },
        // HOME
        {
            path: "/home",
            // element: <LogoOnlyLayout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                }
            ],
        },
        // PHAMRACY
        {
            path: "/pharmacy",
            // element: <LogoOnlyLayout />,
            children: [
                {
                    path: "dashboard",
                    element: <PharmacyDashboard />,
                }
            ],
        },
    ]);

    return element;
}

export default Routing;