import React from 'react';
import Footer from './Footer';
import HeaderFixed from './HeaderFixed';
import SidebarMenu from './SidebarMenu';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="nk-app-root">
            <div className="nk-main">
                <SidebarMenu />
                <div className="nk-wrap">
                    <HeaderFixed />
                    <div className="nk-content">
                        <Outlet />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
