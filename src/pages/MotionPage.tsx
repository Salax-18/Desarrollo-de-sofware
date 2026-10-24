
import { useState } from 'react';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonIcon,
} from '@ionic/react';

import {
  homeOutline,
  speedometerOutline,
  playOutline,
  stopOutline,
  checkmarkCircleOutline,
  radioOutline,
} from 'ionicons/icons';

import { Motion } from '@capacitor/motion';

import './SensorPage.css';

const MotionPage: React.FC = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');

  const startMotion = async () => {
    try {
      setMessage('Iniciando acelerómetro...');

      await Motion.addListener('accel', (event) => {
        setX(event.accelerationIncludingGravity.x ?? 0);
        setY(event.accelerationIncludingGravity.y ?? 0);
        setZ(event.accelerationIncludingGravity.z ?? 0);
      });

      setListening(true);
      setMessage('Sensor activo. ¡Mueve tu dispositivo!');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo iniciar el sensor.');
    }
  };

  const stopMotion = async () => {
    try {
      await Motion.removeAllListeners();
      setListening(false);
      setMessage('Lectura del sensor detenida.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo detener el sensor correctamente.');
    }
  };

  return (
    <IonPage>
      <IonHeader className="sensor-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/home" className="back-button">
              <IonIcon slot="start" icon={homeOutline} />
              Inicio
            </IonButton>
          </IonButtons>

          <IonTitle>Movimiento</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">

          <section className="sensor-welcome">
            <div className="sensor-hero-icon motion-hero">
              <IonIcon icon={speedometerOutline} />
            </div>

            <span className="sensor-eyebrow">
              SENSOR 03 · ACELERÓMETRO
            </span>

            <h1>Siente el movimiento</h1>

            <p>
              Inclina o mueve tu celular y observa cómo cambian
              los valores de sus tres ejes.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div>
                  <h2>Lectura del sensor</h2>
                  <p>Aceleración incluyendo la gravedad.</p>
                </div>

                <div className="sensor-small-icon motion-small">
                  <IonIcon icon={radioOutline} />
                </div>
              </div>

              <div className="motion-status">
                <span
                  className={`motion-status-dot ${
                    listening ? 'motion-active' : ''
                  }`}
                />
                <span>{listening ? 'Sensor activo' : 'Sensor detenido'}</span>
              </div>

              <div className="motion-axis-grid">
                <div className="motion-axis-card axis-x">
                  <span className="motion-axis-label">EJE X</span>
                  <strong>{x.toFixed(2)}</strong>
                  <span className="motion-axis-unit">m/s²</span>
                </div>

                <div className="motion-axis-card axis-y">
                  <span className="motion-axis-label">EJE Y</span>
                  <strong>{y.toFixed(2)}</strong>
                  <span className="motion-axis-unit">m/s²</span>
                </div>

                <div className="motion-axis-card axis-z">
                  <span className="motion-axis-label">EJE Z</span>
                  <strong>{z.toFixed(2)}</strong>
                  <span className="motion-axis-unit">m/s²</span>
                </div>
              </div>

              {!listening ? (
                <IonButton
                  expand="block"
                  className="sensor-action-button"
                  onClick={startMotion}
                >
                  <IonIcon slot="start" icon={playOutline} />
                  Iniciar sensor
                </IonButton>
              ) : (
                <IonButton
                  expand="block"
                  color="danger"
                  className="motion-stop-button"
                  onClick={stopMotion}
                >
                  <IonIcon slot="start" icon={stopOutline} />
                  Detener sensor
                </IonButton>
              )}

              {message && (
                <div className="motion-message">
                  <IonIcon
                    icon={checkmarkCircleOutline}
                    color={listening ? 'success' : 'medium'}
                  />
                  <p>{message}</p>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <div className="sensor-page-footer">
            <p>SensorLab · Capacitor Motion</p>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default MotionPage;
