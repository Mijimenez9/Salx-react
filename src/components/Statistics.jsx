import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download } from 'lucide-react';

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedPeriod, setSelectedPeriod] = useState('enero-junio');

  useEffect(() => {
    fetchStatistics();
  }, [timePeriod, selectedYear, selectedPeriod]);

  const fetchStatistics = () => {
    setIsLoading(true);
    // Aquí normalmente harías una llamada a la API para obtener los datos estadísticos
    // Por ahora, usaremos datos de ejemplo
    setTimeout(() => {
      const exampleData = {
        genderStats: [
          { name: 'Masculino', aprobados: 150, reprobados: 50 },
          { name: 'Femenino', aprobados: 180, reprobados: 40 },
        ],
        careerStats: [
          { name: 'Ingeniería', value: 200 },
          { name: 'Ciencias', value: 150 },
          { name: 'Humanidades', value: 100 },
          { name: 'Negocios', value: 180 },
        ],
        monthlyStats: [
          { name: 'Ene', aprobados: 40, reprobados: 10, total: 50 },
          { name: 'Feb', aprobados: 45, reprobados: 15, total: 60 },
          { name: 'Mar', aprobados: 50, reprobados: 12, total: 62 },
          { name: 'Abr', aprobados: 55, reprobados: 8, total: 63 },
          { name: 'May', aprobados: 60, reprobados: 10, total: 70 },
          { name: 'Jun', aprobados: 58, reprobados: 11, total: 69 },
          { name: 'Jul', aprobados: 20, reprobados: 5, total: 25 },
          { name: 'Ago', aprobados: 65, reprobados: 15, total: 80 },
          { name: 'Sep', aprobados: 70, reprobados: 10, total: 80 },
          { name: 'Oct', aprobados: 68, reprobados: 12, total: 80 },
          { name: 'Nov', aprobados: 72, reprobados: 8, total: 80 },
          { name: 'Dic', aprobados: 45, reprobados: 5, total: 50 },
        ],
        genderCareerStats: [
          { name: 'Ingeniería', masculino: 120, femenino: 80 },
          { name: 'Ciencias', masculino: 70, femenino: 80 },
          { name: 'Humanidades', masculino: 40, femenino: 60 },
          { name: 'Negocios', masculino: 90, femenino: 90 },
        ],
        totalExams: 769,
      };
      setStatisticsData(exampleData);
      setIsLoading(false);
    }, 1000);
  };

  const handleExportExcel = () => {
    console.log('Exportando datos a Excel...');
    // Aquí iría la lógica para exportar los datos a Excel
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (isLoading) {
    return <div>Cargando estadísticas...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Estadísticas de Exámenes</h2>
        <div className="flex items-center space-x-4">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="month">Mes</option>
            <option value="period">Período</option>
            <option value="year">Año</option>
          </select>
          {timePeriod === 'year' && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {[...Array(5)].map((_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          )}
          {timePeriod === 'period' && (
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="enero-junio">Enero-Junio</option>
              <option value="agosto-diciembre">Agosto-Diciembre</option>
            </select>
          )}
          <button
            onClick={handleExportExcel}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            <Download size={20} className="mr-2" />
            Exportar a Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Estadísticas por Género</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statisticsData.genderStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="aprobados" fill="#8884d8" />
              <Bar dataKey="reprobados" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Estadísticas por Carrera</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statisticsData.careerStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statisticsData.careerStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Estadísticas Mensuales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statisticsData.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="aprobados" stroke="#8884d8" />
              <Line type="monotone" dataKey="reprobados" stroke="#82ca9d" />
              <Line type="monotone" dataKey="total" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Género por Carrera</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statisticsData.genderCareerStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="masculino" fill="#8884d8" />
              <Bar dataKey="femenino" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Resumen</h3>
        <p>Total de exámenes realizados: {statisticsData.totalExams}</p>
        <p>Período: {
          timePeriod === 'month' ? 'Último mes' : 
          timePeriod === 'period' ? selectedPeriod : 
          `Año ${selectedYear}`
        }</p>
      </div>
    </div>
  );
};

export default Statistics;