import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../lib/constants';

interface Attendee {
  id: number;
  name: string;
  timestamp: string;
}

const AttendanceTracker: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get(`${API_URL}/attendance/attendance/`);
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
      setAttendees([]);
    }
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/attendance/attendance/create/`, { name });
      setName('');
      fetchAttendees();
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md container mx-auto px-4 py-8 min-h-screen flex flex-col min-w-min">
      <h3 className="text-3xl font-bold mb-6 text-center text-black">Attendance</h3>
      <form onSubmit={handleCheckIn} className="mb-6 flex justify-center items-center bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="input input-bordered w-full max-w-xs mr-2 bg-white text-black"
        />
        <button type="submit" className="btn btn-primary">Check In</button>
      </form>
      <div>
        <h4 className="text-2xl font-semibold mb-4 text-center">Recent Check-ins</h4>
        {attendees.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {attendees.slice(0, 5).map((attendee) => (
              <li key={attendee.id} className="py-3 flex justify-between items-center">
                <span className="font-medium text-black">{attendee.name}</span>
                <span className="text-black text-sm">
                  {new Date(attendee.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No recent check-ins</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;