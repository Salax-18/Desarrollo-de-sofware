import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>TaskFlow</h1>

        <p className="login-subtitle">
          Organiza tus tareas fácilmente
        </p>

        <div className="login-form">

          <label>Correo electrónico</label>

          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-button"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>

        </div>

        <p className="register-text">
          ¿No tienes una cuenta?{" "}
          <Link to="/register">
            Registrarse
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Login;