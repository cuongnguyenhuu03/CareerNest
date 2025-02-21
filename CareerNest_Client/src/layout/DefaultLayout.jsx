import React from 'react';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default DefaultLayout;