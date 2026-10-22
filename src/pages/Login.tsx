import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h1>Challenge 06</h1>
        <p>Inicia sesión para continuar</p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={styles.button}>
          Iniciar sesión
        </button>

        <p>
          ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
        </p>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    background: "#f3f4f6",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    padding: 30,
    background: "white",
    borderRadius: 16,
    boxShadow: "0 4px 20px #0001",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    padding: 13,
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};

export default Login;