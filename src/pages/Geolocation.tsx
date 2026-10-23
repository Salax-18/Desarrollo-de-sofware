
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
  IonText,
  IonButtons,
  IonIcon,
  IonSpinner,
} from '@ionic/react';

import {
  homeOutline,
  locateOutline,
  navigateOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';

import { Geolocation } from '@capacitor/geolocation';

import './SensorPage.css';

const GeolocationPage: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getLocation = async () => {
    try {
      setLoading(true);
      setError(false);
      setMessage('Buscando tu ubicación...');

      const position = await Geolocation.getCurrentPosition();

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setMessage('¡Ubicación obtenida correctamente!');
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage(
        'No fue posible obtener la ubicación. Revisa los permisos.'
      );
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

          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">
          <section className="sensor-welcome">
            <div className="sensor-hero-icon location-hero">
              <IonIcon icon={locateOutline} />
            </div>

            <span className="sensor-eyebrow">
              SENSOR 01 · UBICACIÓN
            </span>

            <h1>¿Dónde estás?</h1>

            <p>
              Consulta las coordenadas geográficas de tu
              dispositivo usando el servicio de geolocalización.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div>
                  <h2>Mi ubicación actual</h2>
                  <p>Obtén tus coordenadas en tiempo real.</p>
                </div>

                <div className="sensor-small-icon location-small">
                  <IonIcon icon={navigateOutline} />
                </div>
              </div>

              <IonButton
                expand="block"
                className="sensor-action-button"
                onClick={getLocation}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <IonSpinner name="crescent" />
                    <span className="button-loading-text">
                      Buscando ubicación...
                    </span>
                  </>
                ) : (
                  <>
                    <IonIcon slot="start" icon={locateOutline} />
                    Obtener ubicación
                  </>
                )}
              </IonButton>

              {message && (
                <div
                  className={`sensor-message ${
                    error ? 'message-error' : 'message-success'
                  }`}
                >
                  <IonIcon
                    icon={
                      error
                        ? alertCircleOutline
                        : checkmarkCircleOutline
                    }
                  />
                  <IonText>
                    <p>{message}</p>
                  </IonText>
                </div>
              )}

              {latitude !== null && longitude !== null && (
                <div className="coordinates-section">
                  <div className="coordinates-heading">
                    <h3>Coordenadas obtenidas</h3>
                    <span>GPS</span>
                  </div>

                  <div className="coordinate-box">
                    <span>LATITUD</span>
                    <strong>{latitude.toFixed(6)}°</strong>
                  </div>

                  <div className="coordinate-box">
                    <span>LONGITUD</span>
                    <strong>{longitude.toFixed(6)}°</strong>
                  </div>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <div className="sensor-page-footer">
            <p>SensorLab · Capacitor Geolocation</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GeolocationPage;
