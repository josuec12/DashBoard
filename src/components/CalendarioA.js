import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from "@fullcalendar/core/locales/es";
import axios from 'axios';
import multiMonthPlugin from '@fullcalendar/multimonth';
import * as bootstrap from "bootstrap";

const CalendarioA = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventsClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Event');

        if (response.data && Array.isArray(response.data.docs)) {
          const groupedEvents = {};

          response.data.docs.forEach(event => {
            event.dateTime.forEach(dateTime => {
              const dateStr = new Date(dateTime).toISOString().split('T')[0];
              const key = `${dateStr}-${event.cliente}`;

              if (!groupedEvents[key]) {
                groupedEvents[key] = {
                  id: key,
                  title: event.cliente,
                  start: new Date(dateTime),
                  allDay: true,
                  eventos: []
                };
              }

              groupedEvents[key].eventos.push(event.name);
            });
          });

          const mappedEvents = Object.values(groupedEvents);

          setEvents(mappedEvents);
        } else {
          console.error('La respuesta no contiene un array de documentos:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };
    fetchEventsClients();
  }, []); 

  return (
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
      eventColor='#020013   '
      eventDidMount={(info) => {
        const eventosContent = `<ul>${info.event.extendedProps.eventos.map(evento => `<li>${evento}</li>`).join('')}</ul>`;
        return new bootstrap.Popover(info.el, {
          title: `${info.event.title}`,
          content: eventosContent,
          placement: "auto",
          trigger: "hover",
          html: true, 
          customClass: "popoverStyle"
        });
      }}
    />
  );
};

export default CalendarioA;
