import React from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import "./styles.css";

const Tasks: React.FC = () => {

  const { tasks } = useTasks();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="page">

      <header className="app-header">
        <div className="logo">
          TaskFlow
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          ⇥
        </button>
      </header>

      <main className="container">

        <section className="page-header">

          <small>Hola</small>

          <h1>Mis tareas</h1>

          <p>{user?.email}</p>

          <button
            className="primary-btn"
            onClick={() => navigate("/add-task")}
          >
            + Añadir tarea
          </button>

        </section>

        <section className="tasks-content">

          {tasks.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>

              <h2>No hay tareas todavía</h2>

              <p>
                Empieza agregando tu primera tarea.
              </p>

            </div>

          ) : (

            <div className="tasks-list">

              {tasks.map((task) => (

                <div
                  className="task-card"
                  key={task.id}
                  onClick={() =>
                    navigate(`/tasks/${task.id}`)
                  }
                >

                  <div className="task-check">
                    {task.completed ? "✓" : ""}
                  </div>

                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                  </div>

                  <span className="task-arrow">
                    →
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
};

export default Tasks;