import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, GraduationCap, Calendar } from 'lucide-react';
import logo_tec from '../assets/logo_tec.png'; // Asegúrate de que la ruta sea correcta
import logo_sep from '../assets/logo_sep.png'; // Si tienes un logo secundario


const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <Icon className="w-12 h-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo_tec} alt="Logo Principal" className="h-20 mr-4" />
          </div>
          <img src={logo_sep} alt="Logo Secundario" className="h-12" />
        </div>
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-600">Division de Estudios Profesionales</h1>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Coordinación de Lenguas Extranjeras
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Mejora tus habilidades en inglés y certifica tu nivel con nuestro sistema de exámenes.
          </p>
          <Link
            to="/schedule-exam"
            className="inline-block text-xl bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Agendar Examen Ahora
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Globe}
            title="Exámenes de Inglés"
            description="Evalúa tu nivel de inglés con nuestros exámenes estandarizados."
          />
          <FeatureCard
            icon={Calendar}
            title="Agenda Flexible"
            description="Elige la fecha y hora que mejor se adapte a tu horario."
          />
          <FeatureCard
            icon={GraduationCap}
            title="Certificación CEFR"
            description="Obtén una certificación reconocida internacionalmente."
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-6 py-4 text-center">
          <p>&copy; 2024 Sistema de Coordinación de Lenguas Extranjeras. Todos los derechos reservados.</p>
          <img src={logo_tec} alt="Logo Principal" className="h-10" />
          <img src={logo_sep} alt="Logo Principal" className="h-10" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;