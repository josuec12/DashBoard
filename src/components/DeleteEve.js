import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteEve = () => {
    const [nameEvent, setNameSelect] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/NameEvent');
            const newEvents = response.data.docs || [];

            // Comprobar si hay nuevos eventos
            if (JSON.stringify(newEvents) !== JSON.stringify(nameEvent)) {
                setNameSelect(newEvents);
            }

        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }, [nameEvent]); // Ahora depende de nameEvent

    useEffect(() => {
        fetchEvents();

        // Establecer el intervalo para realizar la consulta cada cierto tiempo
        const intervalId = setInterval(fetchEvents, 5000); // Consultar cada 5 segundos

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, [fetchEvents]); // Agregamos fetchEvents como dependencia

    const handleEventChange = (event) => {
        const eventId = event.target.value;
        const selected = nameEvent.find(eventItem => eventItem._id === eventId);
        setSelectedEvent(selected);
    };

    const handleEliminar = async () => {
        if (!selectedEvent) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'No has seleccionado ninguna obligación',
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmacion.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/NameEvent/${selectedEvent._id}`);

                // Filtrar el registro eliminado de la lista de registros
                const updatedEvento = nameEvent.filter((Evento) => Evento._id !== selectedEvent._id);
                setNameSelect(updatedEvento);
                setSelectedEvent(null); // Deseleccionar el evento eliminado

                Swal.fire({
                    icon: 'success',
                    title: 'Registro eliminado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });

            } catch (error) {
                console.error('Error al eliminar el registro', error);
            }
        }
    };

    return (
        <>
            <div className=''>
                <div className='inputForm'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 576 512"><path d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z" /></svg>
                    <select className='inputF' onChange={handleEventChange}>
                        <option value="">Selecciona una obligación</option>
                        {nameEvent.map(nameEvents => (
                            <option key={nameEvents._id} value={nameEvents._id}>{nameEvents.name}</option>
                        ))}
                    </select>
                    <button className="button-delete" onClick={handleEliminar}>
                        <svg viewBox="0 0 448 512" className="svgIcon-D"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeleteEve;
