
import { useState } from "react";
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
  IonAlert,
} from "@ionic/react";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../components/database";

const Fruits: React.FC = () => {
  const fruits = useLiveQuery(() => db.fruits.toArray(), []) ?? [];

  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const addFruit = async () => {
    if (!name.trim() || !color.trim()) {
      setMessage("Completa el nombre y el color de la fruta.");
      setShowAlert(true);
      return;
    }

    try {
      await db.fruits.add({
        name: name.trim(),
        color: color.trim(),
      });

      setName("");
      setColor("");
    } catch (error) {
      console.error("Error guardando fruta:", error);
      setMessage("No se pudo guardar la fruta.");
      setShowAlert(true);
    }
  };

  const deleteFruit = async (id?: number) => {
    if (id === undefined) return;

    try {
      await db.fruits.delete(id);
    } catch (error) {
      console.error("Error eliminando fruta:", error);
      setMessage("No se pudo eliminar la fruta.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Fruits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Nueva fruta</h2>

        <IonInput
          label="Nombre"
          labelPlacement="stacked"
          placeholder="Ej. Manzana"
          value={name}
          onIonInput={(e) => setName(e.detail.value ?? "")}
        />

        <IonInput
          label="Color"
          labelPlacement="stacked"
          placeholder="Ej. Rojo"
          value={color}
          onIonInput={(e) => setColor(e.detail.value ?? "")}
        />

        <IonButton expand="block" onClick={addFruit}>
          Guardar fruta
        </IonButton>

        <h2>Mis frutas ({fruits.length})</h2>

        <IonList>
          {fruits.map((fruit) => (
            <IonItem key={fruit.id}>
              <IonLabel>
                <h2>{fruit.name}</h2>
                <p>Color: {fruit.color}</p>
              </IonLabel>

              <IonButton
                slot="end"
                color="danger"
                fill="outline"
                onClick={() => deleteFruit(fruit.id)}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonAlert
          isOpen={showAlert}
          header="Atención"
          message={message}
          buttons={["OK"]}
          onDidDismiss={() => setShowAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Fruits;
