import React, { createContext, useContext, useState } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
  };

  const deleteTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks debe utilizarse dentro de TasksProvider");
  }

  return context;
};