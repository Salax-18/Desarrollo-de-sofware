import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);

      console.log("Usuario registrado correctamente");

      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert("No fue posible registrarse");
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Registrarse
      </button>

      <p>
        ¿Ya tienes una cuenta?{" "}
        <Link to="/">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Register;