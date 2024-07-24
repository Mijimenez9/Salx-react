import React, { useState } from 'react';
import { Calendar, Clock, Users, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExam = () => {
  const [fecha, setFecha] = useState(new Date());
  const [horario, setHorario] = useState('');
  const [cupo, setCupo] = useState(20);
  const [fechasBloqueadas, setFechasBloqueadas] = useState([]);
  const [motivo, setMotivo] = useState('');

  const horarios = ['09:00', '11:00', '13:00', '15:00', '17:00'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el examen en la base de datos
    console.log('Examen creado:', { fecha, horario, cupo });
    // Resetear el formulario
    setFecha(new Date());
    setHorario('');
    setCupo(20);
  };

  const handleBloquearFecha = () => {
    setFechasBloqueadas([...fechasBloqueadas, { fecha, motivo }]);
    setMotivo('');
  };

  const handleDesbloquearFecha = (index) => {
    const nuevasFechasBloqueadas = fechasBloqueadas.filter((_, i) => i !== index);
    setFechasBloqueadas(nuevasFechasBloqueadas);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Crear/Agendar Examen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha del Examen</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <DatePicker
              selected={fecha}
              onChange={(date) => setFecha(date)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Horario</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            >
              <option value="">Seleccione un horario</option>
              {horarios.map((h) => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cupo Máximo</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={cupo}
              onChange={(e) => setCupo(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              min="1"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Examen
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Bloquear Fechas</h3>
        <div className="flex space-x-4 mb-4">
          <DatePicker
            selected={fecha}
            onChange={(date) => setFecha(date)}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo del bloqueo"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          <button
            onClick={handleBloquearFecha}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Bloquear
          </button>
        </div>
        <div className="space-y-2">
          {fechasBloqueadas.map((fb, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{fb.fecha.toLocaleDateString()} - {fb.motivo}</span>
              <button
                onClick={() => handleDesbloquearFecha(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateExam;