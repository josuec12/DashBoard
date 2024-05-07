import React, { useState, useEffect } from 'react';
import NavSideA from '../components/NavSideA';
import NavA from '../components/NavA';
import axios from 'axios';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';

const Ccalendario = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [nameEvent, setNameSelect] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [datesByMonth, setDatesByMonth] = useState({});


    const toggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchClientes = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/Besitz`);
            setClientes(response.data.docs);
        } catch (error) {
            console.error('Error fetching clientes:', error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/NameEvent`);
            setNameSelect(response.data.docs);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleClienteChange = (event) => {
        const clienteId = event.target.value;
        const selected = clientes.find(cliente => cliente._id === clienteId);
        setSelectedCliente(selected);
    };

    const handleEventChange = (event) => {
        const eventId = event.target.value;
        const selected = nameEvent.find(eventItem => eventItem._id === eventId);
        setSelectedEvent(selected);
        // Reset selected dates when event changes
        setSelectedDates([]);
    };

    const handleCheckboxChange = (dateTime) => {
        // Obtener el mes de la fecha seleccionada
        const selectedDateMonth = new Date(dateTime).toLocaleString('default', { month: 'long' });

        // Desmarcar todas las fechas seleccionadas en el mismo mes
        const updatedSelectedDates = selectedDates.filter(date => {
            const dateMonth = new Date(date).toLocaleString('default', { month: 'long' });
            return dateMonth !== selectedDateMonth;
        });

        // Agregar la nueva fecha seleccionada
        setSelectedDates([...updatedSelectedDates, dateTime]);
    };

    useEffect(() => {
        const organizeDatesByMonth = () => {
            const datesByMonthObj = {};

            selectedEvent.dateTime.forEach(dateTime => {
                const date = new Date(dateTime);
                const month = date.toLocaleString('default', { month: 'long' });
                if (!datesByMonthObj[month]) {
                    datesByMonthObj[month] = [];
                }
                datesByMonthObj[month].push(dateTime);
            });

            setDatesByMonth(datesByMonthObj);
        };

        if (selectedEvent && selectedEvent.dateTime.length > 0) {
            organizeDatesByMonth();
        }
    }, [selectedEvent]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/Event', {
                cliente: selectedCliente.nombre,
                nit: selectedCliente.nit,
                name: selectedEvent.name,
                dateTime: selectedDates,
                email: selectedCliente.email
            });
            if (response.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Evento enviado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        } catch (error) {
            console.error('Error al guardar el evento:', error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error al guardar el evento. Inténtalo de nuevo.',
                showConfirmButton: false,
                timer: 1500
              });
        }
    };

    return (
        <>
            <NavSideA isOpen={isSidebarOpen} toggleSidebar={toggle} />
            <div className={`main ${isSidebarOpen ? 'active' : ''}`}>
                <NavA isOpen={isSidebarOpen} toggleSidebar={toggle} />
                <div className="contentT">
                    <div className="dash">
                        <div className='card shadow'>
                            <div className='cardHeader'>
                                <h2>Registrar evento</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col'>
                                        <label>
                                            Cliente
                                        </label>
                                        <div className='inputForm'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <select className='inputF' onChange={handleClienteChange}>
                                                <option value="">Seleccionar cliente</option>
                                                {clientes.map(cliente => (
                                                    <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <label>
                                            NIT
                                        </label>
                                        <div className='inputForm'>
                                            <input className='inputF' type='number' disabled readOnly value={selectedCliente ? selectedCliente.nit : ''} />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <label>
                                            email
                                        </label>
                                        <div className='inputForm'>
                                            <input className='inputF' type='email' disabled readOnly value={selectedCliente ? selectedCliente.email : ''} />
                                        </div>
                                    </div>
                                </div>
                                {selectedCliente && ( // Mostrar campos solo si se ha seleccionado un cliente
                                    <div className='row'>
                                        <div className='col'>
                                            <label>Obligaciones</label>
                                            <div className='inputForm'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 576 512"><path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" /></svg>
                                                <select className='inputF' onChange={handleEventChange}>
                                                    <option value="">Selecciona una obligación</option>
                                                    {nameEvent.map(nameEvents => (
                                                        <option key={nameEvents._id} value={nameEvents._id}>{nameEvents.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <label>
                                                Fechas
                                            </label>
                                            <div className='checkF'>
                                                {selectedEvent ? (
                                                    Object.keys(datesByMonth).map(month => (
                                                        <div key={month}>
                                                            <p className='text-uppercase fw-bold pM'>{month}</p>
                                                            {datesByMonth[month].map(dateTime => (
                                                                <label className='' key={dateTime}>
                                                                    <input
                                                                        type="checkbox"
                                                                        value={dateTime}
                                                                        checked={selectedDates.includes(dateTime)}
                                                                        onChange={() => handleCheckboxChange(dateTime)}
                                                                    />
                                                                    {dateTime}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="loader2"></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="btn-regis">
                                    <button className="CartBtn" type="submit">
                                        <span className="IconContainer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><g strokeWidth="2" strokeLinecap="round" stroke="#fff"><rect y="5" x="4" width="16" rx="2" height="16"></rect><path d="m8 3v4"></path><path d="m16 3v4"></path><path d="m4 11h16"></path></g></svg>
                                        </span>
                                        <p className="textoo">Registrar</p>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Ccalendario;
