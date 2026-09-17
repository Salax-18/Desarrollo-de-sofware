import {
  IonContent,
  IonPage,
  IonTitle,
  IonInput,
  IonButton
} from '@ionic/react';

import { useState } from 'react';

const AddContact: React.FC = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const guardarContacto = () => {

    const nuevoContacto = {
      nombre,
      email,
      telefono
    };

    const contactosGuardados = localStorage.getItem('contactos');

    const contactos = contactosGuardados
      ? JSON.parse(contactosGuardados)
      : [];

    contactos.push(nuevoContacto);

    localStorage.setItem(
      'contactos',
      JSON.stringify(contactos)
    );

    console.log(contactos);
  };

  return (
    <IonPage>

      <IonContent>

        <IonTitle>Agregar contacto</IonTitle>

        <IonInput
          label="Nombre"
          labelPlacement="floating"
          placeholder="Nombre"
          value={nombre}
          onIonChange={(e) => setNombre(e.detail.value ?? '')}
        />

        <IonInput
          label="Email"
          labelPlacement="floating"
          placeholder="Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value ?? '')}
        />

        <IonInput
          label="Teléfono"
          labelPlacement="floating"
          placeholder="Teléfono"
          value={telefono}
          onIonChange={(e) => setTelefono(e.detail.value ?? '')}
        />

        <IonButton
          expand="block"
          onClick={guardarContacto}
        >
          Guardar contacto
        </IonButton>

      </IonContent>

    </IonPage>
  );
};

export default AddContact;