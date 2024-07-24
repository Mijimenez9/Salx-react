import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, User, Mail, Phone, Book, FileText, Hash } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ExamSchedulingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
  ];

  const careers = [
    "Arquitectura", "Lic. en Administración", "Contador Público", "Ing. Ambiental",
    "Ing. Biomédica", "Ing. Civil", "Ing. en Diseño Industrial", "Ing. Electrónica",
    "Ing. en Gestión Empresarial", "Ing. en Logística", "Ing. en Nanotecnología",
    "Ing. Química", "Ing. Aeronáutica", "Ing. Bioquímica", "Ing. Electromecánica",
    "Ing. Informática", "Ing. en Sistemas Computacionales",
    "Ing. en Tecnologías de la Información y Comunicaciones", "Ing. Industrial", "Ing. Mecánica"
  ];

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
            isSelected 
              ? 'bg-blue-600 text-white' 
              : 'hover:bg-blue-100'
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const onSubmit = (data) => {
    const bookingInfo = {
      ...data,
      fechaExamen: selectedDate.toLocaleDateString(),
      horaExamen: selectedTime,
    };
    setBookingDetails(bookingInfo);
    setShowForm(false);
    setShowConfirmation(true);
    // Aquí iría la lógica para enviar el correo electrónico
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Agenda tu Examen de Inglés</h2>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h3 className="text-xl font-semibold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="font-medium text-gray-500">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {renderCalendar()}
        </div>
      </div>

      {selectedDate && (
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Horarios Disponibles para {selectedDate.toLocaleDateString()}</h4>
          <div className="grid grid-cols-4 gap-4">
            {availableTimes.map(time => (
              <button
                key={time}
                onClick={() => {
                  setSelectedTime(time);
                  setShowForm(true);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Formulario de Registro</h3>
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            <CalendarIcon size={20} />
            <p>Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
            <Clock size={20} />
            <p>Hora: {selectedTime}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  {...register("apellidoPaterno", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s]+$/,
                      message: "Solo se permiten letras y espacios"
                    }
                  })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                />
              </div>
              {errors.apellidoPaterno && <span className="text-red-500 text-sm">{errors.apellidoPaterno.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  {...register("apellidoMaterno", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s]+$/,
                      message: "Solo se permiten letras y espacios"
                    }
                  })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                />
              </div>
              {errors.apellidoMaterno && <span className="text-red-500 text-sm">{errors.apellidoMaterno.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  {...register("nombres", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[A-Za-zÀ-ÿ\s]+$/,
                      message: "Solo se permiten letras y espacios"
                    }
                  })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                />
              </div>
              {errors.nombres && <span className="text-red-500 text-sm">{errors.nombres.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select 
                  {...register("genero", { required: "Por favor seleccione un género" })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Seleccionar</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              {errors.genero && <span className="text-red-500 text-sm">{errors.genero.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Folio de Pago</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  {...register("folioPago", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[A-Za-z0-9]+$/,
                      message: "Solo se permiten letras y números"
                    }
                  })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                />
              </div>
              {errors.folioPago && <span className="text-red-500 text-sm">{errors.folioPago.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carrera</label>
              <div className="relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <select 
                  {...register("carrera", { required: "Por favor seleccione una carrera" })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  <option value="">Seleccionar carrera</option>
                  {careers.map(career => (
                    <option key={career} value={career}>{career}</option>
                  ))}
                </select>
              </div>
              {errors.carrera && <span className="text-red-500 text-sm">{errors.carrera.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de Control</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  {...register("numeroControl", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo se permiten números"
                    }
                  })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                />
              </div>
              {errors.numeroControl && <span className="text-red-500 text-sm">{errors.numeroControl.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  {...register("email", { 
                    required: "Este campo es requerido", 
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Ingrese un correo electrónico válido"
                    }
                  })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                />
              </div>
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número Telefónico</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  {...register("telefono", { 
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Ingrese un número telefónico válido de 10 dígitos"
                    }
                  })} 
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                />
              </div>
              {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono.message}</span>}
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold mt-4">
                Agendar Examen
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {showConfirmation && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md mb-4"
          role="alert"
        >
          <h4 className="text-2xl font-bold text-green-800 mb-4">Examen Agendado Exitosamente</h4>
          <p className="text-green-700 mb-4">Se ha enviado un correo electrónico con los detalles de tu examen.</p>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="font-semibold text-lg mb-2 text-gray-800">Detalles de la Reserva:</h5>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Fecha:</strong> {bookingDetails.fechaExamen}</li>
              <li><strong>Hora:</strong> {bookingDetails.horaExamen}</li>
              <li><strong>Nombre:</strong> {bookingDetails.nombres} {bookingDetails.apellidoPaterno} {bookingDetails.apellidoMaterno}</li>
              <li><strong>Carrera:</strong> {bookingDetails.carrera}</li>
              <li><strong>Número de Control:</strong> {bookingDetails.numeroControl}</li>
            </ul>
          </div>
          <button 
            onClick={() => setShowConfirmation(false)} 
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Cerrar
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ExamSchedulingCalendar;