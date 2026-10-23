
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
  IonText,
  IonSpinner,
} from '@ionic/react';

import {
  homeOutline,
  notificationsOutline,
  timeOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

import { LocalNotifications } from '@capacitor/local-notifications';

import './SensorPage.css';

const LocalNotificationsPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const scheduleNotification = async () => {
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      let permission = await LocalNotifications.checkPermissions();

      if (permission.display !== 'granted') {
        permission = await LocalNotifications.requestPermissions();
      }

      if (permission.display !== 'granted') {
        setMessage('No se concedió el permiso para notificaciones.');
        return;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: '¡Hola, Kathe!',
            body: 'Tu notificación local está funcionando.',
            schedule: {
              at: new Date(Date.now() + 5000),
              allowWhileIdle: true,
            },
          },
        ],
      });

      setSuccess(true);
      setMessage('¡Notificación programada! Aparecerá en 5 segundos.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo programar la notificación.');
    } finally {
      setLoading(false);
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

          <IonTitle>Notificaciones locales</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">
          <section className="sensor-welcome local-hero">
            <div className="sensor-hero-icon">
              <IonIcon icon={notificationsOutline} />
            </div>

            <p className="sensor-eyebrow">SENSORLAB · ALERTAS</p>
            <h1>Notificaciones locales</h1>
            <p>
              Programa una alerta en tu dispositivo y comprueba
              cómo funciona una notificación sin depender de un servidor.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div className="sensor-small-icon local-small">
                  <IonIcon icon={timeOutline} />
                </div>

                <div>
                  <h2>Programar una notificación</h2>
                  <p>Recibe una alerta dentro de cinco segundos.</p>
                </div>
              </div>

              <div className="local-info">
                <IonIcon icon={notificationsOutline} />
                <div>
                  <strong>Notificación de prueba</strong>
                  <p>
                    “Tu notificación local está funcionando.”
                  </p>
                </div>
              </div>

              <IonButton
                expand="block"
                className="sensor-action-button"
                onClick={scheduleNotification}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <IonSpinner name="crescent" />
                    <span className="local-loading-text">
                      {' '}Programando...
                    </span>
                  </>
                ) : (
                  <>
                    <IonIcon slot="start" icon={notificationsOutline} />
                    Programar notificación
                  </>
                )}
              </IonButton>

              {message && (
                <div
                  className={`sensor-message ${
                    success ? 'message-success' : 'message-error'
                  }`}
                >
                  {success && (
                    <IonIcon icon={checkmarkCircleOutline} />
                  )}
                  <IonText>{message}</IonText>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <div className="sensor-page-footer">
            <IonIcon icon={timeOutline} />
            <span>La notificación está programada para dentro de 5 segundos.</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LocalNotificationsPage;
