
import { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonAlert,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

import {
  ref,
  push,
  set,
  onValue,
  remove,
} from "firebase/database";

import { database } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import "./Contacts.css";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const Contacts: React.FC = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const contactsRef = ref(database, `contacts/${user.uid}`);

    return onValue(
      contactsRef,
      (snapshot) => {
        const data = snapshot.val();
        const list: Contact[] = data
          ? Object.entries(data).map(([id, value]) => ({
              id,
              ...(value as Omit<Contact, "id">),
            }))
          : [];

        setContacts(list);
      },
      (error) => {
        console.error(error);
        setErrorMessage("No se pudieron cargar los contactos.");
        setShowAlert(true);
      }
    );
  }, [user]);

  const addContact = async () => {
    if (!user || !name.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage("Completa el nombre, teléfono y correo.");
      setShowAlert(true);
      return;
    }

    try {
      const contactRef = push(ref(database, `contacts/${user.uid}`));

      await set(contactRef, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });

      setName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudo guardar el contacto.");
      setShowAlert(true);
    }
  };

  const deleteContact = async (id: string) => {
    if (!user) return;

    try {
      await remove(ref(database, `contacts/${user.uid}/${id}`));
    } catch (error) {
      console.error(error);
      setErrorMessage("No se pudo eliminar el contacto.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader className="contacts-header">
        <IonToolbar className="contacts-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" color="light" />
          </IonButtons>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="contacts-content">
        <div className="contacts-container">
          <h2>Nuevo contacto</h2>

          <div className="contact-form">
            <IonInput
              label="Nombre"
              labelPlacement="stacked"
              value={name}
              onIonInput={(e) => setName(e.detail.value ?? "")}
              placeholder="Nombre completo"
            />

            <IonInput
              label="Teléfono"
              labelPlacement="stacked"
              type="tel"
              value={phone}
              onIonInput={(e) => setPhone(e.detail.value ?? "")}
              placeholder="Número de teléfono"
            />

            <IonInput
              label="Correo"
              labelPlacement="stacked"
              type="email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? "")}
              placeholder="correo@ejemplo.com"
            />

            <IonButton expand="block" onClick={addContact}>
              Guardar contacto
            </IonButton>
          </div>

          <h2>Mis contactos ({contacts.length})</h2>

          <IonList className="contacts-list">
            {contacts.map((contact) => (
              <IonItem key={contact.id}>
                <IonLabel>
                  <h3>{contact.name}</h3>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                </IonLabel>

                <IonButton
                  slot="end"
                  color="danger"
                  fill="outline"
                  onClick={() => deleteContact(contact.id)}
                >
                  Eliminar
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </div>

        <IonAlert
          isOpen={showAlert}
          header="Atención"
          message={errorMessage}
          buttons={["OK"]}
          onDidDismiss={() => setShowAlert(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
