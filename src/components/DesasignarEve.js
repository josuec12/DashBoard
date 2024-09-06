import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DesasignarEve = () => {
  const [Event, setEvent] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/Event');
      const newEvents = response.data.docs || [];
      setEvent(newEvents);

      // Filtrar eventos en base al cliente seleccionado
      if (selectedClient) {
        setFilteredEvents(newEvents.filter(event => event.cliente === selectedClient));
      } else {
        setFilteredEvents(newEvents);
      }

    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [selectedClient]); // Ahora fetchEvents depende de selectedClient

  useEffect(() => {
    fetchEvents();

    const intervalId = setInterval(fetchEvents, 5000);

    return () => clearInterval(intervalId);
  }, [fetchEvents]); // Añadimos fetchEvents como dependencia

  const handleClientChange = (event) => {
    const client = event.target.value;
    setSelectedClient(client);

    const filtered = Event.filter(eventItem => eventItem.cliente === client);
    setFilteredEvents(filtered);
  };

  const handleEventChange = (event) => {
    const eventId = event.target.value;
    const selected = filteredEvents.find(eventItem => eventItem._id === eventId);
    setSelectedEvent(selected);
  };

  const handleEliminar = async () => {
    if (!selectedEvent || !selectedClient) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa los campos.',
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
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/Event/${selectedEvent._id}`);

        const updatedEvents = Event.filter((Evento) => Evento._id !== selectedEvent._id);
        setEvent(updatedEvents);
        setFilteredEvents(updatedEvents.filter(event => event.cliente === selectedClient));
        setSelectedEvent(null);

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
      <div className='row'>
        <div className='col'>
          <div className='inputForm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <select className='inputF' onChange={handleClientChange}>
              <option value="">Selecciona un cliente</option>
              {Array.from(new Set(Event.map(event => event.cliente))).map((cliente, index) => (
                <option key={index} value={cliente}>{cliente}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='col'>
          <div className='inputForm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="26" height="26">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <select className='inputF' onChange={handleEventChange}>
              <option value="">Selecciona un evento</option>
              {filteredEvents.map(event => (
                <option key={event._id} value={event._id}>{event.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='btn-regis'>
          <button className="button-delete" onClick={handleEliminar}>
            <svg viewBox="0 0 448 512" className="svgIcon-D"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default DesasignarEve;
