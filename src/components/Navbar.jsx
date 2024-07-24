import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Calendar, UserCog, GraduationCap, RefreshCw } from 'lucide-react';

const NavLink = ({ to, icon, text, mobile }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-2 ${mobile ? 'py-2 px-3 hover:bg-blue-700 rounded-md transition-colors duration-200' : 'hover:text-blue-200 transition-colors duration-200'}`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const AdminLink = ({ mobile }) => (
  <Link 
    to="/admin" 
    className={`flex items-center space-x-2 bg-white text-blue-600 rounded-md transition-all duration-200 ${
      mobile ? 'py-2 px-3 hover:bg-blue-100' : 'px-4 py-2 hover:bg-blue-100 hover:shadow-md'
    }`}
  >
    <UserCog size={20} />
    <span className="font-semibold">Admin</span>
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap size={28} />
            <span className="text-xl font-semibold">SALEX</span>
          </div>
          
          {/* Enlaces para pantallas grandes */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" icon={<Home size={20} />} text="Inicio" />
            <NavLink to="/schedule-exam" icon={<Calendar size={20} />} text="Agendar Examen" />
            <NavLink to="/reschedule-exam" icon={<RefreshCw size={20} />} text="Reagendar Examen" />
            <AdminLink />
          </div>

          {/* Botón de menú para móviles */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú desplegable para móviles */}
        {isMenuOpen && (
          <div className="mt-4 md:hidden space-y-2">
            <NavLink to="/" icon={<Home size={20} />} text="Inicio" mobile />
            <NavLink to="/schedule-exam" icon={<Calendar size={20} />} text="Agendar Examen" mobile />
            <NavLink to="/reschedule-exam" icon={<RefreshCw size={20} />} text="Reagendar Examen" />
            <AdminLink mobile />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;