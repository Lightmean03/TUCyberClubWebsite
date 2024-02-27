import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import html2canvas from "html2canvas";
import axios from "axios";
import jsPDF from "jspdf";
import { API_URL } from "../../lib/constants";
import Modal from "antd/es/modal/Modal";

const News = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/calendar/events`,
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const calendarElement = document.querySelector(".fc") as HTMLElement; 

    html2canvas(calendarElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.text("Calendar", 20, 20);
      pdf.save("calendar.pdf");
    });
  };

const handleAddEvent = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/calendar/events`,
      {
        title,
        start,
        end,
      }
    );
    console.log("response", response);
    setEvents([...events, response.data]);
    setShowModal(false);
  } catch (error) {
    console.error("Error adding event:", error);
  }
};





  
  return (
    <div
      className="relative pt-16 pb-32 flex content-center items-center justify-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="max-w-2xl mx-auto p-2 hover: cursor-pointer"
        style={{ height: "1000px", width: "1000px" }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={events}
          
        />
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleExport}
        >
          Export Calendar
        </button>
  <button 
    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700 transition-colors ml-4"
    onClick={() => setShowModal(true)}
  > Add Event</button>
</div>
      


    </div>
  );
};

export default News;
