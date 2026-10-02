import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import "./styles.css";

const AddTask: React.FC = () => {

  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (!title.trim()) {
      alert("Escribe un título");
      return;
    }

    addTask({
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    });

    navigate("/tasks");
  };

  return (
    <div className="page">

      <header className="app-header">

        <div className="logo">
          TaskFlow
        </div>

        <button
          className="logout-btn"
          onClick={() => navigate("/tasks")}
        >
          ←
        </button>

      </header>

      <main className="container">

        <div className="form-container">

          <h1>Añadir tarea</h1>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Título
              </label>

              <input
                className="form-input"
                type="text"
                placeholder="Ej. Estudiar para el parcial"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Descripción
              </label>

              <textarea
                className="form-textarea"
                placeholder="Describe tu tarea..."
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/tasks")}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="primary-btn"
              >
                Guardar tarea
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};

export default AddTask;