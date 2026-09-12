import {useState} from 'react';

interface AddPatientProps {
  onAddPatient: (paciente: any) => void;
}



const AddPatient = ({ onAddPatient }: AddPatientProps) => {
   const [nombre, setNombre] = useState('');
   const [apellido, setApellido] = useState('');
    const [cc, setCc] = useState('');
    const [telefono, setTelefono] = useState('');

    const guardarPaciente = () => {
        if (!nombre || !apellido || !telefono || !cc) {
    alert('Todos los campos son obligatorios');
    return;
  }

  if (!/^\d+$/.test(cc)) {
  alert('La cédula debe contener solamente números');
  return;
}

  const nuevoPaciente = {
    id: Date.now(),
    nombre: nombre,
    apellido: apellido,
    cc: cc,
    telefono: telefono
  };

  onAddPatient(nuevoPaciente);

  setNombre('');
  setApellido('');
  setCc('');
};

  return (
    <div>
      <h2>Agregar paciente</h2>

      <input 
      placeholder="Nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      />

      <input 
      placeholder="Apellido"
      value={apellido}
      onChange={(e) => setApellido(e.target.value)}
      />

      <input 
      placeholder="Cédula"
      value={cc}
      onChange={(e) => setCc(e.target.value)}
      />
        <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

     <button onClick={guardarPaciente}>
  Guardar paciente
</button>
    </div>
  );
};

export default AddPatient;