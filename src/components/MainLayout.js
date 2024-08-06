import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="nk-body bg-lighter npc-general has-sidebar">
   
      <Sidebar />
      <div className="main-content">
 
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
