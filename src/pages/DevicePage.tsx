
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
  IonSpinner,
} from '@ionic/react';

import {
  homeOutline,
  phonePortraitOutline,
  hardwareChipOutline,
  batteryHalfOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';

import { Device } from '@capacitor/device';

import './SensorPage.css';

interface DeviceInfo {
  model: string;
  manufacturer: string;
  operatingSystem: string;
  osVersion: string;
  platform: string;
  batteryLevel: number | null;
  isCharging: boolean | null;
}

const DevicePage: React.FC = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const getDeviceInfo = async () => {
    try {
      setLoading(true);
      setError(false);
      setMessage('');

      const deviceInfo = await Device.getInfo();
      const batteryInfo = await Device.getBatteryInfo();

      setInfo({
        model: deviceInfo.model,
        manufacturer: deviceInfo.manufacturer,
        operatingSystem: deviceInfo.operatingSystem,
        osVersion: deviceInfo.osVersion,
        platform: deviceInfo.platform,
        batteryLevel: batteryInfo.batteryLevel ?? null,
        isCharging: batteryInfo.isCharging ?? null,
      });

      setMessage('Información obtenida correctamente.');
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage('No se pudo obtener la información del dispositivo.');
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
          <IonTitle>Dispositivo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">
          <section className="sensor-welcome">
            <div className="sensor-hero-icon device-hero">
              <IonIcon icon={phonePortraitOutline} />
            </div>

            <span className="sensor-eyebrow">
              SENSOR 04 · INFORMACIÓN DEL EQUIPO
            </span>

            <h1>Conoce tu dispositivo</h1>
            <p>
              Consulta los detalles técnicos de tu teléfono
              y el estado actual de su batería.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div>
                  <h2>Información del teléfono</h2>
                  <p>Datos obtenidos desde Capacitor.</p>
                </div>

                <div className="sensor-small-icon device-small">
                  <IonIcon icon={hardwareChipOutline} />
                </div>
              </div>

              <IonButton
                expand="block"
                className="sensor-action-button"
                onClick={getDeviceInfo}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <IonSpinner name="crescent" />
                    <span className="button-loading-text">
                      Consultando...
                    </span>
                  </>
                ) : (
                  <>
                    <IonIcon slot="start" icon={phonePortraitOutline} />
                    Consultar información
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
                    icon={error ? alertCircleOutline : checkmarkCircleOutline}
                  />
                  <p>{message}</p>
                </div>
              )}

              {info && (
                <>
                  <div className="device-section-heading">
                    <IonIcon icon={phonePortraitOutline} />
                    <h3>Datos del teléfono</h3>
                  </div>

                  <div className="device-info-list">
                    <div className="device-info-row">
                      <span>Modelo</span>
                      <strong>{info.model || 'No disponible'}</strong>
                    </div>
                    <div className="device-info-row">
                      <span>Fabricante</span>
                      <strong>{info.manufacturer || 'No disponible'}</strong>
                    </div>
                    <div className="device-info-row">
                      <span>Sistema operativo</span>
                      <strong>{info.operatingSystem}</strong>
                    </div>
                    <div className="device-info-row">
                      <span>Versión</span>
                      <strong>{info.osVersion}</strong>
                    </div>
                    <div className="device-info-row">
                      <span>Plataforma</span>
                      <strong>{info.platform}</strong>
                    </div>
                  </div>

                  <div className="device-section-heading device-battery-heading">
                    <IonIcon icon={batteryHalfOutline} />
                    <h3>Batería</h3>
                  </div>

                  <div className="device-battery-card">
                    <div className="device-battery-top">
                      <span>Nivel de batería</span>
                      <strong>
                        {info.batteryLevel !== null
                          ? `${Math.round(info.batteryLevel * 100)}%`
                          : 'No disponible'}
                      </strong>
                    </div>

                    {info.batteryLevel !== null && (
                      <div className="device-battery-track">
                        <div
                          className="device-battery-fill"
                          style={{
                            width: `${Math.max(
                              0,
                              Math.min(100, info.batteryLevel * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    )}

                    <p>
                      Estado:{' '}
                      {info.isCharging === null
                        ? 'No disponible'
                        : info.isCharging
                          ? 'Cargando'
                          : 'No está cargando'}
                    </p>
                  </div>
                </>
              )}
            </IonCardContent>
          </IonCard>

          <div className="sensor-page-footer">
            <p>SensorLab · Capacitor Device</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DevicePage;
