import { Calendar, dateFnsLocalizer, SlotInfo } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

interface Props {
  events: any[];
  onSelectSlot: (slotInfo: SlotInfo) => void;
  selectable: boolean;
}

const Scheduler = ({ events, onSelectSlot, selectable }: Props) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Handles clicking on an "available slot event"
  const handleSelectEvent = (event: any) => {
    if (selectable) {
      console.log('Selected event:', event);
      onSelectSlot({ start: event.start, end: event.end });
    }
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      date={currentDate}
      onNavigate={handleNavigate}
      defaultView="week"
      views={['week']}
      step={30}
      timeslots={1}
      selectable={selectable ? "ignoreEvents" : false}
      popup
      onSelectEvent={selectable ? handleSelectEvent : undefined}
      startAccessor="start"
      endAccessor="end"
      min={new Date(1970, 1, 1, 10, 0)}
      max={new Date(1970, 1, 1, 19, 0)}
      dayPropGetter={(date) => {
        const day = date.getDay();
        if (day === 0) return { className: 'rbc-day-hidden', style: { display: 'none' } };
        if (day === 6) return { style: { backgroundColor: '#fefefe' } };
        return {};
      }}
      style={{ height: '100%' }}
    />
  );
};

export default Scheduler;
