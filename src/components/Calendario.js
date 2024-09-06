import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import './StylesC.css';
import { useBesitz } from '../Context/BesitzContext';
import listPlugin from '@fullcalendar/list';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import esLocale from "@fullcalendar/core/locales/es"
import multiMonthPlugin from '@fullcalendar/multimonth'

function Calendario() {
  const [events, setEvents] = useState([]);
  const [ClientNit, setClientNit] = useState(""); // Estado para almacenar el NIT del cliente
  const { authToken } = useBesitz();

  useEffect(() => {
    const fetchClientNit = async () => {
      const nit = authToken.Besitz.nit; 
      setClientNit(nit);
    };

    fetchClientNit();
  }, [authToken.Besitz.nit]);

  useEffect(() => {
    const fetchEventsByClient = async () => {
      try {
        if (ClientNit) {
          const response = await axios.post('http://localhost:5000/GetEventByClient', { ClientNit });
          if (response.data && response.data.length > 0) {
            const mappedEvents = response.data.flatMap(event => (
              event.dateTime.map(dateTime => ({
                id: event._id,
                title: event.name,  
                start: new Date(dateTime).toISOString().split('T')[0], 
                allDay: true 
              })) 
            ));
            setEvents(mappedEvents);
          } else {
            console.log('No se encontraron eventos para el cliente.');
          }
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    fetchEventsByClient();
  }, [ClientNit]);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listMonth,multiMonthYear'
        }}
        locale={esLocale}
        initialView="dayGridMonth"
        events={events}
        eventColor='#020013'
        
        eventDidMount={(info)=>{
          return new bootstrap.Popover(info.el,{
            title: "¡Aviso importante!",
            content: `Recuerda presentar tu ${info.event.title}`,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle"
          })
        }}
      />
    </div>
  );
}

export default Calendario;
