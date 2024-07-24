import React, { useState } from 'react';

const ExamForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombres: '',
    genero: '',
    folioPago: '',
    carrera: '',
    numeroControl: '',
    email: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">Registro para Examen</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="apellidoPaterno"
          placeholder="Apellido Paterno"
          className="input-field"
          onChange={handleChange}
        />
        <input
          name="apellidoMaterno"
          placeholder="Apellido Materno"
          className="input-field"
          onChange={handleChange}
        />
        <input
          name="nombres"
          placeholder="Nombres"
          className="input-field"
          onChange={handleChange}
        />
        <select
          name="genero"
          className="input-field"
          onChange={handleChange}
        >
          <option value="" disabled selected>Género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
        <input
          name="folioPago"
          placeholder="Folio de Pago"
          className="input-field"
          onChange={handleChange}
        />
        <input
          name="carrera"
          placeholder="Carrera"
          className="input-field"
          onChange={handleChange}
        />
        <input
          name="numeroControl"
          placeholder="Número de Control"
          className="input-field"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Correo Electrónico"
          className="input-field"
          onChange={handleChange}
        />
        <input
          name="telefono"
          placeholder="Número Telefónico"
          className="input-field"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Confirmar Cita
      </button>
    </form>
  );
};

export default ExamForm;