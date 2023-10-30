import React from 'react';
import AppHeader from "../AppHeader/AppHeader";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <AppHeader/>
            <div>
                <Outlet/>
            </div>
        </>
    );
};

export default Layout;