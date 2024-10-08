import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { createEvents } from 'ics';
import { API_URL } from "../../lib/constants";
import { useAuth } from "../../utils/authContext";
import Cookies from 'js-cookie';

const News = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const csrfToken = Cookies.get('csrftoken');
      try {
        const response = await axios.get(`${API_URL}/calendar/calendar/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken,
          },
        });
        setEvents(response.data);
      } catch (error) {
        setError("Error fetching events. Please try again later.");
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const icsEvents = events.map(event => ({
      start: new Date(event.start),
      end: new Date(event.end),
      title: event.title,
      description: event.description || '',
    }));

    createEvents(icsEvents.map(event => ({
      ...event,
      start: [event.start.getFullYear(), event.start.getMonth() + 1, event.start.getDate()],
      end: [event.end.getFullYear(), event.end.getMonth() + 1, event.end.getDate()]
    })), (error, value) => {
      if (error) {
        setError("Error creating ICS events. Please try again.");
        console.error("Error creating ICS events:", error);
        return;
      }
      const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'events.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleAddEvent = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const csrfToken = Cookies.get('csrftoken');
    if (user.role !== 'admin') {
      setError("You are not authorized to add events.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/calendar/calendar/create`, {
        title,
        start,
        end,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken,
        },
      });
      setEvents([...events, response.data]);
      setShowModal(false);
      setError(null); 
    } catch (error) {
      setError("Error adding event. Please try again.");
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16 pb-32">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">Club Calendar</h1>
        <div className="card bg-white shadow-xl">
          <div className="card-body text-black">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={false}
              events={events}
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth',
              }}
              eventClassNames={() => ['md:w-1/4 w-full']}
              height="auto"
              contentHeight="auto"
              aspectRatio={1.2}
            />
            <div className="card-actions justify-end mt-4 flex flex-col md:flex-row">
              <button className="btn btn-primary mb-2 md:mb-0 md:mr-2 w-full md:w-auto" onClick={handleExport}>Export to Calendar</button>
              {user.role === 'admin' && (
                <button className="btn btn-primary w-full md:w-auto" onClick={() => setShowModal(true)}>Add Event</button>
              )}
            </div>
            {error && (
              <div className="text-red-500 text-xl mt-4">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open text-black flex items-center justify-center p-4">
          <div className="modal-box bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-4">Add New Event</h3>
            <input
              type="text"
              placeholder="Event Title"
              className="input w-full mt-4 text-black bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              className="input w-full mt-4 text-black bg-white"
              value={start || ''}
              onChange={(e) => setStart(e.target.value)}
            />
            <input
              type="date"
              className="input w-full mt-4 text-black bg-white"
              value={end || ''}
              onChange={(e) => setEnd(e.target.value)}
            />
            <div className="modal-action mt-6 flex flex-col md:flex-row gap-4 items-center">
              <button
                className="btn btn-primary w-full md:w-auto"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary w-full md:w-auto"
                onClick={handleAddEvent}
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
