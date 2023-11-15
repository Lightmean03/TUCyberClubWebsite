import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import html2canvas from 'html2canvas';
import axios from 'axios';

const News = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/calendar/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const calendarElement = document.querySelector('.fc');
    html2canvas(calendarElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'calendar.png';
      link.click();
    });
  };

  const handleUpdates = (update, changed, deleted) => {
    if (changed) {
      const id = Object.keys(changed)[0];
      const updates = changed[id];
      axios
        .put(`/api/events/${id}`, updates)
        .catch((error) => {
          console.log(error);
        });
    } else if (deleted) {
      axios
        .delete(`/api/events/${deleted._id}`)
        .catch((error) => {
          console.log(error);
        });
    } else if (update) {
      axios
        .post('/api/events/createEvent', update)
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: "100vh" }}>
      <div className="max-w-2xl mx-auto p-2" style={{ height: "1000px", width: "1000px"}}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
          onClick={(info) => {
            alert(`Event clicked: ${info.event.title}`);
          }}
        />
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleExport}
        >
          Export Calendar
        </button>
      </div>
    </div>
  );
};

export default News;
