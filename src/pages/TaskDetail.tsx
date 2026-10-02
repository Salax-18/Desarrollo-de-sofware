import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import "./styles.css";

const TaskDetail: React.FC = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    tasks,
    deleteTask,
    updateTask
  } = useTasks();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return <p>Tarea no encontrada.</p>;
  }

  const handleDelete = () => {

    deleteTask(task.id);

    navigate("/tasks");
  };

  const toggleCompleted = () => {

    updateTask({
      ...task,
      completed: !task.completed,
    });
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

        <div className="detail-card">

          <h1>{task.title}</h1>

          <p className="detail-description">
            {task.description}
          </p>

          <p>
            Estado:{" "}
            <strong>
              {task.completed
                ? "Completada"
                : "Pendiente"}
            </strong>
          </p>

          <div className="form-actions">

            <button
              className="primary-btn"
              onClick={toggleCompleted}
            >
              {task.completed
                ? "Marcar pendiente"
                : "Completar tarea"}
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                navigate(`/tasks/${task.id}/edit`)
              }
            >
              Editar
            </button>

            <button
              className="danger-btn"
              onClick={handleDelete}
            >
              Eliminar
            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default TaskDetail;