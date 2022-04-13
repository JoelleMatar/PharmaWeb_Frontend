import * as React from "react";
import { useRoutes } from "react-router-dom";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

function Routing() {
    let element = useRoutes([
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
    ]);

    return element;
}

export default Routing;