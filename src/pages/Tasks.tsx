
import { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonAlert,
} from "@ionic/react";

import {
  ref,
  push,
  set,
  onValue,
  update,
  remove,
} from "firebase/database";

import { database } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!user) return;

    const tasksRef = ref(database, `tasks/${user.uid}`);

    return onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();

      const list: Task[] = data
        ? Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as Omit<Task, "id">),
          }))
        : [];

      setTasks(list);
    });
  }, [user]);

  const addTask = async () => {
    if (!user || !title.trim()) {
      setShowAlert(true);
      return;
    }

    const taskRef = push(ref(database, `tasks/${user.uid}`));

    await set(taskRef, {
      title: title.trim(),
      completed: false,
    });

    setTitle("");
  };

  const toggleTask = async (task: Task) => {
    if (!user) return;

    await update(ref(database, `tasks/${user.uid}/${task.id}`), {
      completed: !task.completed,
    });
  };

  const deleteTask = async (id: string) => {
    if (!user) return;

    await remove(ref(database, `tasks/${user.uid}/${id}`));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Tasks</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Nueva tarea</h2>

        <IonInput
          label="Descripción"
          labelPlacement="stacked"
          placeholder="Ej. Estudiar para el parcial"
          value={title}
          onIonInput={(e) => setTitle(e.detail.value ?? "")}
        />

        <IonButton expand="block" onClick={addTask}>
          Agregar tarea
        </IonButton>

        <h2>Mis tareas ({tasks.length})</h2>

        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <IonCheckbox
                slot="start"
                checked={task.completed}
                onIonChange={() => toggleTask(task)}
              />

              <IonLabel>
                <h2
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.title}
                </h2>
              </IonLabel>

              <IonButton
                slot="end"
                color="danger"
                fill="outline"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonAlert
          isOpen={showAlert}
          header="Campo obligatorio"
          message="Escribe una descripción para la tarea."
          buttons={["OK"]}
          onDidDismiss={() => setShowAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
