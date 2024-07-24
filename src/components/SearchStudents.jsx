import React, { useState } from 'react';
import { Search, Download } from 'lucide-react';

const SearchStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Aquí normalmente harías una llamada a la API para buscar estudiantes
    // Por ahora, usaremos datos de ejemplo
    setTimeout(() => {
      const resultsExample = [
        {
          id: 1,
          numeroControl: '12345',
          nombre: 'Juan Pérez',
          examenes: [
            { fecha: '2024-05-15', calificacion: 85, nivel: 'B2' },
            { fecha: '2023-11-20', calificacion: 78, nivel: 'B1' },
          ]
        },
        // Más resultados de ejemplo...
      ];
      setSearchResults(resultsExample);
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadPDF = (studentId) => {
    // Aquí iría la lógica para generar y descargar el PDF
    console.log(`Descargando constancia para el estudiante con ID: ${studentId}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Búsqueda de Alumnos</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ingrese número de control"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {isLoading && <p>Cargando resultados...</p>}

      {searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Resultados de la búsqueda</h3>
          {searchResults.map((student) => (
            <div key={student.id} className="mb-6 border-b pb-4">
              <h4 className="text-lg font-medium">{student.nombre}</h4>
              <p>Número de Control: {student.numeroControl}</p>
              <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {student.examenes.map((examen, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{examen.fecha}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{examen.calificacion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{examen.nivel}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDownloadPDF(student.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {searchResults.length === 0 && !isLoading && (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default SearchStudents;