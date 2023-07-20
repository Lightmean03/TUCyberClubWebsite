import React, {useState} from 'react';
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

const handleCalendarClick = (value) => {
  setSelectedDate(value);
};


return (
  <div className="calendar-container">
    <h1 className="Header">News</h1>

    <div className="calendar-content">
      <Calendar onChange={setDate} value={date} onClickDay={handleCalendarClick} />
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
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Date: {event.date.toDateString()}</p>
        </div>
      ))}
    </div>
  </div>
);
}
