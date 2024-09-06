import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const AsignarEve = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [nameEvent, setNameSelect] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    const [datesByMonth, setDatesByMonth] = useState({});
    const [loading, setLoading] = useState(true);


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
            const response = await axios.get('http://localhost:5000/NameEvent');
            const newEvents = response.data.docs || [];
            
            // Comprobar si hay nuevos eventos
            if (JSON.stringify(newEvents) !== JSON.stringify(nameEvent)) {
                setNameSelect(newEvents);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();

        // Establecer el intervalo para realizar la consulta cada cierto tiempo
        const intervalId = setInterval(fetchEvents, 5000); // Consultar cada 5 segundos

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, [nameEvent]); // Dependencia de efecto para que se ejecute cuando cambian los eventos existentes

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

        if (!selectedCliente || !selectedDates.length || !selectedEvent) {
            Swal.fire({
              icon: 'warning',
              title: 'Campos incompletos',
              text: 'Por favor, completa todos los campos.',
              showConfirmButton: false,
              timer: 1500,
            });
            return;
        }

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
                setSelectedCliente('');
                setSelectedEvent(null);
                setSelectedDates([]);
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
          
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col'>
                            <div className='inputForm'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <select className='inputF' onChange={handleClienteChange}>
                                    <option value=''>Seleccionar cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='inputForm'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
                                <input className='inputF' type='number' disabled readOnly value={selectedCliente ? selectedCliente.nit : ''} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='inputForm'>
                                <svg fill="none" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg" >
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#141B34" d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"></path>
                                    <path strokeLinejoin="round" strokeWidth="1.5" stroke="#141B34" d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"></path>
                                </svg>
                                <input className='inputF' type='email' disabled readOnly value={selectedCliente ? selectedCliente.email : ''} />
                            </div>
                        </div>
                    </div>
                    {selectedCliente && ( // Mostrar campos solo si se ha seleccionado un cliente
                        <div className='row'>
                            <div className='col'>
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
                                <div className='checkF'>
                                    {selectedEvent ? (
                                        Object.keys(datesByMonth).map(month => (
                                            <div key={month}>
                                                <p className='text-uppercase fw-bold pM'>{month}</p>
                                                {datesByMonth[month].map(dateTime => (
                                                    <label className='Lcheck' key={dateTime}>
                                                        <input
                                                            className='ui-checkbox'
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
                                        <p className="btn-shine">Elija una obligación.</p>

                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="btn-regis">
                        <button className="CartBtn" type="submit">
                            <span className="IconContainer">
                            <svg className='iconCalendar' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.512 8.72a2.46 2.46 0 0 1 3.479 0 2.461 2.461 0 0 1 0 3.479l-.004.005-1.094 1.08a.998.998 0 0 0-.194-.272l-3-3a1 1 0 0 0-.272-.193l1.085-1.1Zm-2.415 2.445L7.28 14.017a1 1 0 0 0-.289.702v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .703-.288l2.851-2.816a.995.995 0 0 1-.26-.189l-3-3a.998.998 0 0 1-.19-.26Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M7 3a1 1 0 0 1 1 1v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 1-1Zm10.67 8H19v8H5v-8h3.855l.53-.537a1 1 0 0 1 .87-.285c.097.015.233.13.277.087.045-.043-.073-.18-.09-.276a1 1 0 0 1 .274-.873l1.09-1.104a3.46 3.46 0 0 1 4.892 0l.001.002A3.461 3.461 0 0 1 17.67 11Z" clipRule="evenodd" />
                            </svg>
                            </span>
                            <p className="textoo">Asignar</p>
                        </button>
                    </div>
                </form>
        </>
    )
}

export default AsignarEve
