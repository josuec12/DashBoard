import React, { useState } from 'react';
import NavSideA from '../components/NavSideA'
import NavA from '../components/NavA'
import Explorador from './Explorador';
import Dispositivo from './Dispositivo';
import Footer from '../components/Footer';
import MapView from '../components/Map';

const Location = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
            <div className={`main ${isSidebarOpen && 'active'}`}>
                <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
                <div className='contentT'>
                    <div className='dash'>
                                <div className='card shadow'>
                                    <div className='cardHeader'>
                                        <h2>Location</h2>
                                    </div>
                                    <MapView/>
                                </div>
                                <Dispositivo/>
                                <Explorador/>
                    </div>
                </div>
                <Footer/>
            </div>

        </>
    )   
}

export default Location
