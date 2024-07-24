import React from 'react';

const ConfirmationPage = ({ examDetails }) => {
  return (
    <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">Confirmación de Cita</h2>
      <div className="space-y-4">
        <p><strong>Fecha del Examen:</strong> {examDetails.fecha}</p>
        <p><strong>Horario:</strong> {examDetails.horario}</p>
        <p><strong>Apellido Paterno:</strong> {examDetails.apellidoPaterno}</p>
        <p><strong>Apellido Materno:</strong> {examDetails.apellidoMaterno}</p>
        <p><strong>Nombres:</strong> {examDetails.nombres}</p>
        <p><strong>Género:</strong> {examDetails.genero}</p>
        <p><strong>Folio de Pago:</strong> {examDetails.folioPago}</p>
        <p><strong>Carrera:</strong> {examDetails.carrera}</p>
        <p><strong>Número de Control:</strong> {examDetails.numeroControl}</p>
        <p><strong>Correo Electrónico:</strong> {examDetails.email}</p>
        <p><strong>Número Telefónico:</strong> {examDetails.telefono}</p>
      </div>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => window.print()}
      >
        Imprimir Confirmación
      </button>
    </div>
  );
};

export default ConfirmationPage;