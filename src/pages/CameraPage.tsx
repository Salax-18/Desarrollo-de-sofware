
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
  IonImg,
  IonText,
  IonButtons,
  IonIcon,
  IonSpinner,
} from '@ionic/react';

import {
  homeOutline,
  cameraOutline,
  imagesOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  apertureOutline,
} from 'ionicons/icons';

import {
  Camera,
  CameraResultType,
  CameraSource,
} from '@capacitor/camera';

import './SensorPage.css';

const CameraPage: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const takePhoto = async (source: CameraSource) => {
    try {
      setLoading(true);
      setError(false);
      setMessage('Abriendo cámara o galería...');

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source,
      });

      if (image.webPath) {
        setPhoto(image.webPath);
        setMessage('¡Fotografía cargada correctamente!');
      } else {
        setError(true);
        setMessage('No se pudo cargar la imagen seleccionada.');
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage('No se pudo obtener la fotografía.');
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

          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">

          <section className="sensor-welcome">
            <div className="sensor-hero-icon camera-hero">
              <IonIcon icon={apertureOutline} />
            </div>

            <span className="sensor-eyebrow">
              SENSOR 02 · FOTOGRAFÍA
            </span>

            <h1>Captura el momento</h1>

            <p>
              Utiliza la cámara de tu dispositivo o selecciona
              una imagen guardada en tu galería.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div>
                  <h2>Mi cámara</h2>
                  <p>¿Cómo quieres obtener tu fotografía?</p>
                </div>

                <div className="sensor-small-icon camera-small">
                  <IonIcon icon={cameraOutline} />
                </div>
              </div>

              <IonButton
                expand="block"
                className="sensor-action-button"
                onClick={() => takePhoto(CameraSource.Camera)}
                disabled={loading}
              >
                <IonIcon slot="start" icon={cameraOutline} />
                Tomar fotografía
              </IonButton>

              <IonButton
                expand="block"
                fill="outline"
                className="camera-gallery-button"
                onClick={() => takePhoto(CameraSource.Photos)}
                disabled={loading}
              >
                <IonIcon slot="start" icon={imagesOutline} />
                Elegir de la galería
              </IonButton>

              {loading && (
                <div className="camera-loading">
                  <IonSpinner name="crescent" />
                  <span>Procesando imagen...</span>
                </div>
              )}

              {message && !loading && (
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

              {photo && (
                <div className="camera-preview">
                  <div className="coordinates-heading">
                    <h3>Vista previa</h3>
                    <span>IMAGEN</span>
                  </div>

                  <IonImg
                    src={photo}
                    alt="Fotografía seleccionada"
                    className="camera-image"
                  />
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <div className="sensor-page-footer">
            <p>SensorLab · Capacitor Camera</p>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;
