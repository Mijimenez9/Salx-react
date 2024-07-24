import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, BarChart2, Menu } from 'lucide-react';
import CreateExam from './CreateExam';
import CaptureGrades from './CaptureGrades';
import SearchStudents from './SearchStudents';
import Statistics from './Statistics';

const AdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('crear');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const modules = [
    { id: 'crear', name: 'Crear/Agendar Exámenes', icon: Calendar },
    { id: 'calificaciones', name: 'Captura de Calificaciones', icon: Users },
    { id: 'busqueda', name: 'Búsqueda de Alumnos', icon: Search },
    { id: 'estadisticas', name: 'Estadísticas', icon: BarChart2 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="flex h-screen bg-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sidebar */}
      <div className={`bg-blue-600 text-white ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          <h2 className={`font-bold text-xl ${sidebarOpen ? 'block' : 'hidden'}`}>Admin Panel</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-blue-700 transition">
            <Menu size={24} />
          </button>
        </div>
        <nav className="flex-1">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center p-4 hover:bg-blue-700 transition ${activeModule === module.id ? 'bg-blue-700' : ''}`}
            >
              <module.icon size={24} className="mr-4" />
              {sidebarOpen && <span>{module.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {modules.find(m => m.id === activeModule)?.name}
          </h1>
        </header>
        <main className="p-6">
          {activeModule === 'crear' && <CreateExam />}
          {activeModule === 'calificaciones' && <CaptureGrades />}
          {activeModule === 'busqueda' && <SearchStudents />}
          {activeModule === 'estadisticas' && <Statistics />}
        </main>
      </div>
    </motion.div>
  );
};

// Subcomponentes (implementaciones básicas, se expandirán según sea necesario)

const CapturaCalificaciones = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Captura de Calificaciones</h2>
    {/* Aquí irá la interfaz para capturar calificaciones */}
  </div>
);

const BusquedaAlumnos = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Búsqueda de Alumnos</h2>
    {/* Aquí irá el buscador de alumnos */}
  </div>
);

const Estadisticas = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
    {/* Aquí irán las gráficas y tablas de estadísticas */}
  </div>
);

export default AdminDashboard;