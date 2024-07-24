import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Search, Save, Send } from 'lucide-react';

const CaptureGrades = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    const fechasEjemplo = ['2024-07-01', '2024-07-15', '2024-07-30'];
    setSelectedDate(fechasEjemplo[0]);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const estudiantesEjemplo = [
        { id: 1, nombre: 'Juan Pérez', numeroControl: '12345' },
        { id: 2, nombre: 'María García', numeroControl: '67890' },
        { id: 3, nombre: 'Carlos López', numeroControl: '54321' },
      ];
      setStudents(estudiantesEjemplo);
    }
  }, [selectedDate]);

  const onSubmit = (data) => {
    console.log(data);
    // Aquí irías la lógica para guardar las calificaciones en la base de datos
  };

  const calcularNivelCEFR = (calificacion) => {
    if (calificacion === '' || isNaN(calificacion) || calificacion < 0) return 'N/A';
    if (calificacion >= 90) return 'C1';
    if (calificacion >= 80) return 'B2';
    if (calificacion >= 70) return 'B1';
    if (calificacion >= 60) return 'A2';
    return 'A1';
  };

  const numeroALetras = (numero) => {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    
    if (numero === 100) return 'cien';
    if (numero < 0 || numero > 100) return 'Número fuera de rango';
    
    if (numero < 10) return unidades[numero];
    if (numero < 20) return especiales[numero - 10];
    
    const unidad = numero % 10;
    const decena = Math.floor(numero / 10);
    
    if (unidad === 0) return decenas[decena];
    if (decena === 2) return 'veinti' + unidades[unidad];
    return decenas[decena] + ' y ' + unidades[unidad];
  };

  const enviarConstancia = (studentId) => {
    console.log(`Enviando constancia al estudiante con ID: ${studentId}`);
    // Aquí iría la lógica para enviar la constancia por correo electrónico
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Captura de Calificaciones</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha del Examen</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="2024-07-01">1 de Julio, 2024</option>
          <option value="2024-07-15">15 de Julio, 2024</option>
          <option value="2024-07-30">30 de Julio, 2024</option>
        </select>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Control</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación en Letras</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel CEFR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.numeroControl}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    {...register(`calificaciones.${student.id}`, { 
                      min: 0, 
                      max: 100,
                      valueAsNumber: true,
                      validate: (value) => value >= 0 || "La calificación no puede ser menor a 0"
                    })}
                    className="w-20 p-1 border border-gray-300 rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {numeroALetras(watch(`calificaciones.${student.id}`) || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {calcularNivelCEFR(watch(`calificaciones.${student.id}`))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {watch(`calificaciones.${student.id}`) >= 70 && (
                    <button
                      type="button"
                      onClick={() => enviarConstancia(student.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Send size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Guardar Calificaciones
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaptureGrades;