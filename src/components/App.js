import React from "react";
import { ZealProvider } from "@zeal-ui/core";
import ProductProvider from "../context/ProductProvider";
import Router from "../router/Router";

const App = () => {
    return (
        <ZealProvider>
            <ProductProvider>
                <Router />
            </ProductProvider>
        </ZealProvider>
    );
};

export default App;
