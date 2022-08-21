import * as React from "react";
import {Navigate, useRoutes } from "react-router-dom";
import PharmacyProducts from "./components/pharmacy/pharmcyProducts.js/PharmacyProducts";
import ProductDetails from "./components/productDetails/ProductDetails";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import BuyerNotifications from "./pages/buyer/buyerNotifications/BuyerNotifications";
import BuyerOrders from "./pages/buyer/buyerOrders/BuyerOrders";
import BuyerProfile from "./pages/buyer/buyerProfile/BuyerProfile";
import Cart from "./pages/cart/Cart";
import CartPharmacies from "./pages/cart/CartPharmacies";
import PayProductOnline from "./pages/cart/PayProductOnline";
import DonateMedication from "./pages/donateMedication/DonateMedication";
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
                    path: "donate-medication",
                    element: <DonateMedication />,
                },
                {
                    path: "product/:id",
                    element: <ProductDetails />,
                },
                {
                    path: "cart",
                    element: <CartPharmacies />,
                },
                {
                    path: "pay-online",
                    element: <PayProductOnline />,
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
        // BUYER
        {
            path: "/buyer",
            // element: <LogoOnlyLayout />,
            children: [
                {
                    path: "profile",
                    element: <BuyerProfile />,
                },
                {
                    path: "orders",
                    element: <BuyerOrders />,
                },
                {
                    path: "notifications",
                    element: <BuyerNotifications />,
                },
            ],
        },
    ]);

    return element;
}

export default Routing;