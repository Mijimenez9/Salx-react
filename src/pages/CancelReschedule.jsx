import React, { useState } from 'react';

const CancelReschedule = ({ onCancel, onReschedule }) => {
  const [numeroControl, setNumeroControl] = useState('');
  const [folioPago, setFolioPago] = useState('');
  const [action, setAction] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'numeroControl') setNumeroControl(value);
    if (name === 'folioPago') setFolioPago(value);
    if (name === 'action') setAction(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === 'cancel') {
      onCancel({ numeroControl, folioPago });
    } else if (action === 'reschedule') {
      onReschedule({ numeroControl, folioPago });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">Cancelar/Reagendar Examen</h2>
      <div className="space-y-4">
        <input
          name="numeroControl"
          placeholder="Número de Control"
          className="input-field"
          value={numeroControl}
          onChange={handleChange}
        />
        <input
          name="folioPago"
          placeholder="Folio de Pago"
          className="input-field"
          value={folioPago}
          onChange={handleChange}
        />
        <select
          name="action"
          className="input-field"
          value={action}
          onChange={handleChange}
        >
          <option value="" disabled selected>Seleccionar Acción</option>
          <option value="cancel">Cancelar Examen</option>
          <option value="reschedule">Reagendar Examen</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Confirmar Acción
      </button>
    </form>
  );
};

export default CancelReschedule;