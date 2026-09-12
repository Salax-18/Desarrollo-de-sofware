import { useEffect, useState } from 'react';

import Login from './Login';
import PacientesList from './PacientesList';
import AddPatient from './AgregarPacientes';
import BusquedaBar from './Busquedabar';

function App() {

  // Estado de sesión
  const [logged, setLogged] = useState(false);

  // Estado de pacientes
  const [pacientes, setPacientes] = useState<any[]>([]);

  // Estado del buscador
  const [busqueda, setBusqueda] = useState('');

  // Recuperar información al cargar la aplicación
  useEffect(() => {

    // Recuperar sesión
    const sesion = localStorage.getItem('logged');

    if (sesion === 'true') {
      setLogged(true);
    }

    // Recuperar pacientes
    const pacientesGuardados = localStorage.getItem('pacientes');

    if (pacientesGuardados) {
      setPacientes(JSON.parse(pacientesGuardados));
    }

  }, []);

  // Cerrar sesión
  const cerrarSesion = () => {

    localStorage.removeItem('logged');

    setLogged(false);
  };

  // Agregar paciente
  const agregarPaciente = (nuevoPaciente: any) => {

    const nuevosPacientes = [
      ...pacientes,
      nuevoPaciente
    ];

    setPacientes(nuevosPacientes);

    localStorage.setItem(
      'pacientes',
      JSON.stringify(nuevosPacientes)
    );
  };

  // Si no está logueado, mostrar Login
  if (!logged) {
    return (
      <Login
        onLogin={() => setLogged(true)}
      />
    );
  }

  // Filtrar pacientes
  const pacientesFiltrados = pacientes.filter((paciente) => {

    const texto = busqueda.toLowerCase();

    return (
      paciente.nombre.toLowerCase().includes(texto) ||
      paciente.apellido.toLowerCase().includes(texto) ||
      paciente.cc.includes(texto)
    );

  });

  // Aplicación cuando está logueado
  return (
    <div>

      <h1>Bienvenido a MediClinic</h1>

      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>

      <AddPatient
        onAddPatient={agregarPaciente}
      />

      <BusquedaBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <PacientesList
        pacientes={pacientesFiltrados}
      />

    </div>
  );
}

export default App;