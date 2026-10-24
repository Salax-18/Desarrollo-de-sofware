
import { useRef, useState } from 'react';

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
  paperPlaneOutline,
  phonePortraitOutline,
  checkmarkCircleOutline,
  keyOutline,
} from 'ionicons/icons';

import { PushNotifications } from '@capacitor/push-notifications';

import './SensorPage.css';

const PushNotificationsPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const listenersAdded = useRef(false);

  const registerPush = async () => {
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      let permission = await PushNotifications.checkPermissions();

      if (permission.receive !== 'granted') {
        permission = await PushNotifications.requestPermissions();
      }

      if (permission.receive !== 'granted') {
        setMessage(
          'No se concedió el permiso para notificaciones push.'
        );
        return;
      }

      if (!listenersAdded.current) {
        await PushNotifications.addListener('registration', (result) => {
          setToken(result.value);
          setSuccess(true);
          setMessage('¡Dispositivo registrado correctamente!');
          setLoading(false);
        });

        await PushNotifications.addListener(
          'registrationError',
          (error) => {
            console.error(error);
            setSuccess(false);
            setMessage('No se pudo registrar el dispositivo.');
            setLoading(false);
          }
        );

        listenersAdded.current = true;
      }

      setMessage('Solicitando registro del dispositivo...');
      await PushNotifications.register();
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setMessage('Ocurrió un error al iniciar el registro.');
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

          <IonTitle>Notificaciones push</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">
          <section className="sensor-welcome push-hero">
            <div className="sensor-hero-icon">
              <IonIcon icon={paperPlaneOutline} />
            </div>

            <p className="sensor-eyebrow">SENSORLAB · MENSAJERÍA</p>
            <h1>Notificaciones push</h1>
            <p>
              Registra tu dispositivo para obtener el token que
              permite identificarlo en un servicio de notificaciones push.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div className="sensor-small-icon push-small">
                  <IonIcon icon={phonePortraitOutline} />
                </div>

                <div>
                  <h2>Registrar dispositivo</h2>
                  <p>Solicita el registro para recibir notificaciones.</p>
                </div>
              </div>

              <div className="push-info">
                <IonIcon icon={keyOutline} />
                <div>
                  <strong>Token de registro</strong>
                  <p>
                    Se generará cuando el servicio de notificaciones
                    registre correctamente tu dispositivo.
                  </p>
                </div>
              </div>

              <IonButton
                expand="block"
                className="sensor-action-button"
                onClick={registerPush}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <IonSpinner name="crescent" />
                    <span className="push-loading-text">
                      {' '}Registrando...
                    </span>
                  </>
                ) : (
                  <>
                    <IonIcon slot="start" icon={paperPlaneOutline} />
                    Registrar dispositivo
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

          {token && (
            <IonCard className="sensor-panel push-token-card">
              <IonCardContent>
                <div className="sensor-panel-heading">
                  <div className="sensor-small-icon push-token-small">
                    <IonIcon icon={keyOutline} />
                  </div>

                  <div>
                    <h2>Token del dispositivo</h2>
                    <p>Token recibido durante el registro.</p>
                  </div>
                </div>

                <div className="push-token-value">
                  <IonText>{token}</IonText>
                </div>

                <p className="push-token-note">
                  Este token confirma que se recibió el registro.
                  Por sí solo, no confirma que una notificación push
                  haya llegado al dispositivo.
                </p>
              </IonCardContent>
            </IonCard>
          )}

          <div className="sensor-page-footer">
            <IonIcon icon={phonePortraitOutline} />
            <span>El registro requiere un dispositivo compatible y permisos concedidos.</span>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PushNotificationsPage;
