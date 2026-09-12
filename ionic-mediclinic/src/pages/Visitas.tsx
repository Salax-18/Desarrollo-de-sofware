import {
  IonContent,
  IonPage,

  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';

import { useNavigate } from 'react-router-dom';
import './Visitas.css';

const Visitas: React.FC = () => {

  const navigate = useNavigate();

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

  return (
    <IonPage>

      <IonContent className="visitas-content">

        <div className="visitas-container">

          <div className="visitas-header">

            <h1>Visitas del día</h1>

            <p>Agenda de visitas domiciliarias</p>

          </div>

          <IonList className="lista-visitas">

            {visitas.map((visita) => (

              <IonItem
                key={visita.id}
                button
                className="visita-item"
                onClick={() =>
                  navigate(`/detalle-visita/${visita.id}`)
                }
              >

                <IonLabel>

                  <h2>{visita.paciente}</h2>

                  <p> {visita.hora}</p>

                  <p> {visita.direccion}</p>

                  <p
                    className={
                      visita.estado === 'pendiente'
                        ? 'estado-pendiente'
                        : 'estado-finalizada'
                    }
                  >
                    ● {visita.estado}
                  </p>

                </IonLabel>

              </IonItem>

            ))}

          </IonList>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Visitas;