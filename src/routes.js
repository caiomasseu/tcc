import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { HomePage as Home } from "./pages/Home/Home";


const Routes = () => {
    return (
        <BrowserRouter>
                <Route path="/" element={<Home />} />
        </BrowserRouter>
    )
}

export default Routes;