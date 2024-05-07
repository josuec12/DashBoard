import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

const CalendarioA = () => {
    return (
        <>
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listMonth'
        }}
        initialView="dayGridMonth"
        events={[
            { title: 'event 1', date: '2024-05-10' },
            { title: 'event 2', date: '2019-04-02' }
          ]}
      />
        </>
    )
}

export default CalendarioA
