import './PacientesList.css';

interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  cc: string;
  telefono: string;
}

interface PacientesListProps {
  pacientes: Paciente[];
}

const PacientesList = ({ pacientes }: PacientesListProps) => {

  return (
    <div className="pacientes-list">

      <h2>Lista de pacientes</h2>

      <div className="pacientes-grid">

        {pacientes.map((paciente) => (

          <div
            className="paciente-card"
            key={paciente.id}
          >

            <h3>
              {paciente.nombre} {paciente.apellido}
            </h3>

            <p>
              <strong>Cédula:</strong> {paciente.cc}
            </p>

            <p>
              <strong>Teléfono:</strong> {paciente.telefono}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PacientesList;