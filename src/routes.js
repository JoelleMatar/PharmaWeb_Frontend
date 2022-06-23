import * as React from "react";
import {Navigate, useRoutes } from "react-router-dom";
import PharmacyProducts from "./components/pharmacy/pharmcyProducts.js/PharmacyProducts";
import ProductDetails from "./components/productDetails/ProductDetails";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import PharmaciesList from "./pages/pharmaciesList/pharmaciesList";
import PharmacyDashboard from "./pages/pharmacyDashboard/PharmacyDashboard";
import ProductsList from "./pages/productsList/ProductsList";
import RequestDrug from "./pages/requestDrug/RequestDrug";
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
                },
                {
                    path: "pharmacies",
                    element: <PharmaciesList />,
                },
                {
                    path: "products",
                    element: <ProductsList />,
                },
                {
                    path: "request-drug",
                    element: <RequestDrug />,
                },
                {
                    path: "product/:id",
                    element: <ProductDetails />,
                },
                {
                    path: "cart",
                    element: <Cart />,
                },
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
                },
                {
                    path: "products",
                    element: <PharmacyDashboard />,
                },
                {
                    path: "add-product",
                    element: <PharmacyDashboard />,
                },
                {
                    path: "notifications",
                    element: <PharmacyDashboard />,
                },
                {
                    path: "profile",
                    element: <PharmacyDashboard />,
                },
                {
                    path: "orders",
                    element: <PharmacyDashboard />,
                },
                {
                    path: "logs",
                    element: <PharmacyDashboard />,
                }
            ],
        },
    ]);

    return element;
}

export default Routing;