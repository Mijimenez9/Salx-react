import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const RescheduleExam = () => {
  const [examInfo, setExamInfo] = useState(null);
  const [canReschedule, setCanReschedule] = useState(false);
  const [newDate, setNewDate] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simula una llamada a la API para obtener la información del examen
    const fetchExamInfo = async () => {
      try {
        // En una implementación real, esto sería una llamada a tu backend
        const response = await fetch('/api/exam-info');
        const data = await response.json();
        setExamInfo(data);
        setCanReschedule(data.canReschedule);
      } catch (error) {
        setError('No se pudo obtener la información del examen');
      }
    };

    fetchExamInfo();
  }, []);

  const handleReschedule = async () => {
    if (!newDate) {
      setError('Por favor, selecciona una nueva fecha');
      return;
    }

    try {
      // Simula una llamada a la API para reagendar el examen
      const response = await fetch('/api/reschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newDate })
      });

      if (response.ok) {
        navigate('/confirmation', { state: { message: 'Examen reagendado con éxito' } });
      } else {
        setError('No se pudo reagendar el examen');
      }
    } catch (error) {
      setError('Ocurrió un error al intentar reagendar');
    }
  };

  if (!examInfo) {
    return <p>Cargando información del examen...</p>;
  }

  if (!examInfo.hasActiveExam) {
    return (
      <div>
        <p>No tienes un examen activo para reagendar.</p>
        <button onClick={() => navigate('/schedule-exam')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Agendar un nuevo examen
        </button>
      </div>
    );
  }

  if (!canReschedule) {
    return (
      <div>
        <p>Lo siento, no puedes reagendar tu examen en este momento.</p>
        <p>Razones posibles:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Ya has reagendado este examen una vez.</li>
          <li>Tu examen está programado para dentro de menos de 3 días.</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Reagendar Examen</h2>
      <div className="mb-6">
        <h3 className="font-semibold">Detalles del examen actual:</h3>
        <p>Fecha: {examInfo.currentDate}</p>
        <p>Hora: {examInfo.currentTime}</p>
        <p>Lugar: {examInfo.location}</p>
      </div>
      <div className="mb-6">
        <label htmlFor="newDate" className="block mb-2">Selecciona una nueva fecha:</label>
        <DatePicker
          selected={newDate}
          onChange={date => setNewDate(date)}
          minDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} // 3 días desde hoy
          className="w-full p-2 border rounded"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button 
        onClick={handleReschedule}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Confirmar Reagendamiento
      </button>
    </div>
  );
};

export default RescheduleExam;