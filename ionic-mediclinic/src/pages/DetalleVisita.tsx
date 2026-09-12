import {
  IonButton,
  IonContent,
  IonPage
} from '@ionic/react';

import { useParams } from 'react-router-dom';
import { useState } from 'react';

import './DetalleVisita.css';

const visitas = [
  {
    id: 1,
    paciente: 'Juan Pérez',
    hora: '8:00 AM',
    direccion: 'Calle 10 #20-30',
    estado: 'pendiente'
  },
  {
    id: 2,
    paciente: 'María Gómez',
    hora: '10:00 AM',
    direccion: 'Carrera 5 #15-20',
    estado: 'pendiente'
  },
  {
    id: 3,
    paciente: 'Carlos López',
    hora: '2:00 PM',
    direccion: 'Calle 50 #10-15',
    estado: 'finalizada'
  }
];

const DetalleVisita: React.FC = () => {

  const { id } = useParams();

  const visita = visitas.find(
    (visita) => visita.id === Number(id)
  );

  const [estado, setEstado] = useState(
    visita?.estado || 'pendiente'
  );

  const cambiarEstado = (nuevoEstado: string) => {

    setEstado(nuevoEstado);

    if (visita) {
      localStorage.setItem(
        `visita-${visita.id}`,
        nuevoEstado
      );
    }
  };

  // Si no existe la visita
  if (!visita) {
    return (
      <IonPage>

        <IonContent className="ion-padding">

          <h2>Visita no encontrada</h2>

        </IonContent>

      </IonPage>
    );
  }

  // Pantalla principal
  return (
    <IonPage>

      <IonContent className="detalle-content">

        <div className="detalle-container">

          <div className="detalle-header">

            <h1>Detalle de visita</h1>

            <p>
              Información de la visita domiciliaria
            </p>

          </div>


          <div className="detalle-card">

            <h2>{visita.paciente}</h2>


            <div className="detalle-dato">

              <span></span>

              <div>

                <strong>Hora</strong>

                <p>{visita.hora}</p>

              </div>

            </div>


            <div className="detalle-dato">

              <span></span>

              <div>

                <strong>Dirección</strong>

                <p>{visita.direccion}</p>

              </div>

            </div>


            <div className="detalle-dato">

              <span></span>

              <div>

                <strong>Estado</strong>

                <p className={`estado-${estado}`}>
                  {estado}
                </p>

              </div>

            </div>


            <div className="detalle-botones">

              {estado === 'pendiente' && (

                <IonButton
                  expand="block"
                  onClick={() =>
                    cambiarEstado('en_camino')
                  }
                >
                  En camino
                </IonButton>

              )}


              {estado === 'en_camino' && (

                <IonButton
                  expand="block"
                  onClick={() =>
                    cambiarEstado('finalizada')
                  }
                >
                  Finalizar visita
                </IonButton>

              )}

            </div>

          </div>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default DetalleVisita;