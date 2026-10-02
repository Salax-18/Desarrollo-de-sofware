import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import "./styles.css";

const EditTask: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] =
    useState(task?.description || "");

  if (!task) {
    return <p>Tarea no encontrada.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    updateTask({
      ...task,
      title,
      description,
    });

    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className="page">

      <header className="app-header">

        <div className="logo">
          TaskFlow
        </div>

        <button
          className="logout-btn"
          onClick={() =>
            navigate(`/tasks/${task.id}`)
          }
        >
          ←
        </button>

      </header>

      <main className="container">

        <div className="form-container">

          <h1>Editar tarea</h1>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Título</label>

              <input
                className="form-input"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>Descripción</label>

              <textarea
                className="form-textarea"
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
                onClick={() =>
                  navigate(`/tasks/${task.id}`)
                }
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="primary-btn"
              >
                Guardar cambios
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};

export default EditTask;