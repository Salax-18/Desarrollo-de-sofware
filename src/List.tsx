import {
  IonContent,
  IonPage,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';

import { useEffect, useState } from 'react';
import './List.css';
import { useNavigate } from 'react-router-dom';

const List: React.FC = () => {
      const navigate = useNavigate();

  const [contactos, setContactos] = useState<any[]>([]);

  useEffect(() => {
    const contactosGuardados = localStorage.getItem('contactos');

    if (contactosGuardados) {
      setContactos(JSON.parse(contactosGuardados));
    }
  }, []);

  const eliminarContacto = (index: number) => {

    const nuevosContactos = contactos.filter(
      (_, i) => i !== index
    );

    setContactos(nuevosContactos);

    localStorage.setItem(
      'contactos',
      JSON.stringify(nuevosContactos)
    );

  };

  return (
   
  <IonPage className="contactos-page">

    <IonContent fullscreen>

      <div className="contenedor-contactos">

        <IonTitle className="titulo-contactos">
          Mis contactos
        </IonTitle>

        <IonList className="lista-contactos">

          {contactos.map((contacto, index) => (

            <IonItem
              key={index}
              className="contacto-item"
            >

              <IonLabel>
                <h2 className="contacto-nombre">
                  {contacto.nombre}
                </h2>

                <p className="contacto-dato">
                   {contacto.telefono}
                </p>

                <p className="contacto-dato">
                  ✉️ {contacto.email}
                </p>
              </IonLabel>

              <IonButton
                className="boton-eliminar"
                color="danger"
                onClick={() => eliminarContacto(index)}
              >
                Eliminar
              </IonButton>

            </IonItem>

          ))}

        </IonList>

        <div className="botones">

         <IonButton
  className="boton-agregar"
  expand="block"
  onClick={() => navigate('/add-contact')}
>
  Agregar contacto
</IonButton>

          <IonButton
            className="boton-eliminar-todos"
            expand="block"
            fill="outline"
            color="danger"
            onClick={() => {
              localStorage.removeItem('contactos');
              setContactos([]);
            }}
          >
            Eliminar todos
          </IonButton>

        </div>

      </div>

    </IonContent>

  </IonPage>
);
};
export default List;