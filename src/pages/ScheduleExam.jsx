import React, { useState } from 'react';
import CustomCalendar from '../components/Calendar';
import ExamForm from '../components/ExamForm';
import ConfirmationPage from '../components/ConfirmationPage';

const ScheduleExam = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [examDetails, setExamDetails] = useState(null);

  const handleDateChange = (date) => {
    // Convertir el objeto de fecha a un formato legible
    const formattedDate = `${date.year}-${date.month}-${date.day}`;
    setSelectedDate(formattedDate);
  };

  const handleFormSubmit = (formData) => {
    const examDetailsWithDate = { ...formData, fecha: selectedDate, horario: '10:00 AM' };
    setExamDetails(examDetailsWithDate);

    // Aquí puedes implementar una llamada a la API para enviar los datos al backend
  };

  return (
    <div>
      <CustomCalendar availableDates={[]} onDateChange={handleDateChange} />
      {selectedDate && !examDetails && (
        <ExamForm onSubmit={handleFormSubmit} />
      )}
      {examDetails && (
        <ConfirmationPage examDetails={examDetails} />
      )}
    </div>
  );
};

export default ScheduleExam;