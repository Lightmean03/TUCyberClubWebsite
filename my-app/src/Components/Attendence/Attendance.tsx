import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../lib/constants';
import Cookies from 'js-cookie';

interface Attendee {
  id: number;
  name: string;
  timestamp: string;
}

const AttendanceTracker: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    const csrfToken = Cookies.get('csrftoken');
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(`${API_URL}/attendance/attendance/`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken,
        },
      });
      setAttendees(response.data); 
    } catch (error) {
      console.error('Error fetching attendees:', error);
      setAttendees([]);
    }
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    const csrfToken = Cookies.get('csrftoken');
    const accessToken = localStorage.getItem('accessToken');
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/attendance/attendance/create/`, { name },{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-CSRFToken': csrfToken,
        },
      });
      setName('');
      fetchAttendees();
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  
  const indexOfLastAttendee = currentPage * pageSize;
  const indexOfFirstAttendee = indexOfLastAttendee - pageSize;
  const currentAttendees = attendees.slice(indexOfFirstAttendee, indexOfLastAttendee);

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
        {currentAttendees.length > 0 ? (
          <>
            <ul className="divide-y divide-gray-200">
              {currentAttendees.map((attendee) => (
                <li key={attendee.id} className="py-3 flex justify-between items-center">
                  <span className="font-medium text-black">{attendee.name}</span>
                  <span className="text-black text-sm">
                    {new Date(attendee.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center mt-4">
              <button
                className="btn btn-secondary mr-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-black">
                Page {currentPage} of {Math.ceil(attendees.length / pageSize)}
              </span>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === Math.ceil(attendees.length / pageSize)}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No recent check-ins</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceTracker;
