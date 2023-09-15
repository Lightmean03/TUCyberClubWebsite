import React, { useState, useEffect } from 'react';

const API_KEY = 'AIzaSyC_sDWIIAjuguAzqj5LtJEZBhCA55tQlf8';
const CALENDAR_ID = 'towsoncyberclub0@gmail.com'; 

export default function News() {
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Error fetching events');
      }

      const eventData = await response.json();
      setEvents(eventData.items || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    try {
      const event = {
        summary: eventTitle,
        description: eventDescription,
        start: {
          dateTime: '2023-09-08T10:00:00', // Set the start date and time
        },
        end: {
          dateTime: '2023-09-08T12:00:00', // Set the end date and time
        },
      };

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error('Error adding event');
      }

      fetchEvents(); // Refresh events after adding a new one
      setEventTitle('');
      setEventDescription('');
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleRemoveEvent = async (eventId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${eventId}?key=${API_KEY}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Error removing event');
      }

      fetchEvents(); // Refresh events after removing one
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
      />
      <textarea
        placeholder="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <button onClick={handleAddEvent}>Add Event</button>

      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.summary}</h3>
            <p>{event.description}</p>
            <button onClick={() => handleRemoveEvent(event.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
