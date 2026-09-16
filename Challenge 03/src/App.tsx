import {
  IonApp,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCheckbox,
} from '@ionic/react';

import { trashOutline, addOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const seed: Task[] = [
  {
    id: 1,
    title: 'Revisar apuntes de Ionic',
    completed: false,
  },
  {
    id: 2,
    title: 'Practicar componentes',
    completed: true,
  },
  {
    id: 3,
    title: 'Preparar entrega',
    completed: false,
  },
];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  // Cargar tareas guardadas
  useEffect(() => {
    const saved = localStorage.getItem('tasks');

    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks(seed);
    }
  }, []);

  // Guardar tareas
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Agregar tarea
  const add = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    setTasks((previous) => [...previous, newTask]);
    setTitle('');
  };

 
  const toggle = (id: number) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Eliminar tarea
  const remove = (id: number) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  };

  return (
    <IonApp>
      <IonPage>

        {/* Encabezado */}
        <IonHeader>
          <IonToolbar>
            <IonTitle>TaskFlow</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">

          {/* Introducción */}
          <div className="intro">
           

            <h1>Mis tareas</h1>

            <span>
              Organiza tus pendientes del día.
            </span>
          </div>

        
          <IonItem className="add-box">
            <IonInput
              value={title}
              onIonInput={(event) =>
                setTitle(event.detail.value ?? '')
              }
              placeholder="Escribe una tarea"
            />
          </IonItem>

         
          <IonButton
            className="add-button"
            onClick={add}
          >
            <IonIcon
              slot="start"
              icon={addOutline}
            />

            Agregar tarea
          </IonButton>

          {/* Lista de tareas */}
          <IonList>

            {tasks.map((task) => (

              <IonItem key={task.id}>

                <IonCheckbox
                  slot="start"
                  checked={task.completed}
                  onIonChange={() => toggle(task.id)}
                />

                <IonLabel>

                  <h2
                    className={
                      task.completed ? 'done' : ''
                    }
                  >
                    {task.title}
                  </h2>

                  <p>
                    {task.completed
                      ? 'Completada'
                      : 'Pendiente'}
                  </p>

                </IonLabel>

                {/* Eliminar */}
                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() => remove(task.id)}
                >
                  <IonIcon icon={trashOutline} />
                </IonButton>

              </IonItem>

            ))}

          </IonList>

        </IonContent>

      </IonPage>
    </IonApp>
  );
};

export default App;