
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
  radioOutline,
  pulseOutline,
  handLeftOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

import {
  Haptics,
  ImpactStyle,
  NotificationType,
} from '@capacitor/haptics';

import './SensorPage.css';

const HapticsPage: React.FC = () => {
  const [message, setMessage] = useState('');

  const vibrate = async () => {
    try {
      await Haptics.vibrate();
      setMessage('Vibración ejecutada.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo ejecutar la vibración.');
    }
  };

  const lightImpact = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      setMessage('Impacto suave ejecutado.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo ejecutar el impacto suave.');
    }
  };

  const strongImpact = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Heavy });
      setMessage('Impacto fuerte ejecutado.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo ejecutar el impacto fuerte.');
    }
  };

  const successFeedback = async () => {
    try {
      await Haptics.notification({
        type: NotificationType.Success,
      });
      setMessage('Respuesta háptica de éxito ejecutada.');
    } catch (error) {
      console.error(error);
      setMessage('No se pudo ejecutar la respuesta de éxito.');
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
          <IonTitle>Vibración</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">
          <section className="sensor-welcome">
            <div className="sensor-hero-icon haptics-hero">
              <IonIcon icon={pulseOutline} />
            </div>

            <span className="sensor-eyebrow">
              SENSOR 05 · RESPUESTA HÁPTICA
            </span>

            <h1>Siente la respuesta</h1>
            <p>
              Prueba diferentes patrones de vibración y descubre
              cómo tu dispositivo responde al tacto.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div>
                  <h2>Prueba la vibración</h2>
                  <p>Selecciona una respuesta para probarla.</p>
                </div>

                <div className="sensor-small-icon haptics-small">
                  <IonIcon icon={radioOutline} />
                </div>
              </div>

              <div className="haptics-option">
                <div className="haptics-option-icon haptics-purple">
                  <IonIcon icon={pulseOutline} />
                </div>
                <div className="haptics-option-text">
                  <h3>Vibración</h3>
                  <p>Vibración estándar del dispositivo.</p>
                </div>
                <IonButton
                  className="haptics-test-button"
                  onClick={vibrate}
                  aria-label="Probar vibración"
                >
                  Probar
                </IonButton>
              </div>

              <div className="haptics-option">
                <div className="haptics-option-icon haptics-blue">
                  <IonIcon icon={handLeftOutline} />
                </div>
                <div className="haptics-option-text">
                  <h3>Impacto suave</h3>
                  <p>Respuesta háptica ligera.</p>
                </div>
                <IonButton
                  className="haptics-test-button"
                  onClick={lightImpact}
                  aria-label="Probar impacto suave"
                >
                  Probar
                </IonButton>
              </div>

              <div className="haptics-option">
                <div className="haptics-option-icon haptics-orange">
                  <IonIcon icon={handLeftOutline} />
                </div>
                <div className="haptics-option-text">
                  <h3>Impacto fuerte</h3>
                  <p>Respuesta háptica intensa.</p>
                </div>
                <IonButton
                  className="haptics-test-button"
                  onClick={strongImpact}
                  aria-label="Probar impacto fuerte"
                >
                  Probar
                </IonButton>
              </div>

              <div className="haptics-option">
                <div className="haptics-option-icon haptics-green">
                  <IonIcon icon={checkmarkCircleOutline} />
                </div>
                <div className="haptics-option-text">
                  <h3>Respuesta de éxito</h3>
                  <p>Patrón de confirmación.</p>
                </div>
                <IonButton
                  className="haptics-test-button"
                  onClick={successFeedback}
                  aria-label="Probar respuesta de éxito"
                >
                  Probar
                </IonButton>
              </div>

              {message && (
                <div className="haptics-feedback">
                  <IonIcon icon={checkmarkCircleOutline} />
                  <p>{message}</p>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <div className="sensor-page-footer">
            <p>SensorLab · Capacitor Haptics</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HapticsPage;
