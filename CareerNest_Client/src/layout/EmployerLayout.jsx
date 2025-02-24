import React from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import { FloatButton } from 'antd';
import Footer from '../components/footer/Footer';

//cho nhà tuyển dụng
const EmployerLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <FloatButton.BackTop tooltip={<div>Scrolling to Top</div>} />
        </>
    );
};

export default EmployerLayout;