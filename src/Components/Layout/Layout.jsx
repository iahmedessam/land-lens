import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <div className='min-h-screen flex flex-col'>
                <Navbar />
                <Outlet />
            </div> 
        </>
    );
}
