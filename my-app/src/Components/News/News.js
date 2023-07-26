import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './New.css';

export default function News() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const handleAddEvent = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const newEvent = { title, description, date };
    setEvents([...events, newEvent]);
  };

  const handleRemoveEvent = (index) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents];
      updatedEvents.splice(index, 1);
      return updatedEvents;
    });
  };

  const handleCalendarClick = (value) => {
    setSelectedDate(value);
  };

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const eventsForDate = events.filter(
        (event) => event.date.toDateString() === date.toDateString()
      );
      return (
        <div>
          {eventsForDate.map((event, index) => (
            <div key={index}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h1 className="Header">News</h1>

      <div className="calendar-content">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={handleCalendarClick}
          tileContent={getTileContent}
        />
      </div>

      {selectedDate && (
        <div>
          <h2>Add Event for {selectedDate.toDateString()}</h2>
          <form onSubmit={handleAddEvent}>
            <input type="text" name="title" placeholder="Event Title" required />
            <textarea
              name="description"
              placeholder="Event Description"
              required
            ></textarea>
            <button type="submit">Add Event</button>
          </form>
        </div>
      )}

      <div className="events-list">
        <h2>Events</h2>
        {events.map((event, index) => (
          <div key={index}>
            <h3 className="">{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date.toDateString()}</p>
            <button type="reset" onClick={() => handleRemoveEvent(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}