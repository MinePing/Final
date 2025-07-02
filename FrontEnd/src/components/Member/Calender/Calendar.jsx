// components/WorcationCalendar.jsx
import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';

const locales = { ko };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

const memberCalendar = ({ events, onEventDrop }) => {
  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      onEventDrop={onEventDrop}
      startAccessor="start"
      endAccessor="end"
      draggableAccessor={() => true}
      style={{ height: '300px', width: '90%', borderRadius: '10px' }}
      toolbar={false}
    />
  );
};

export default memberCalendar;
