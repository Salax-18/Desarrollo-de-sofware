import { useState } from 'react';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {

  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const iniciarSesion = () => {

    if (usuario === 'admin' && contraseña === '1234') {

      localStorage.setItem('logged', 'true');

      onLogin();

    } else {

      setMensaje('Usuario o contraseña incorrectos');

    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>MediClinic</h1>

          <p>Gestión de pacientes</p>

        </div>

        <h2>Iniciar sesión</h2>

        <div className="login-form">

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />

          <button onClick={iniciarSesion}>
            Ingresar
          </button>

        </div>

        {mensaje && (
          <p className="login-error">
            {mensaje}
          </p>
        )}

      </div>

    </div>
  );
};

export default Login;