
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  
} from '@ionic/react';

import {
  locateOutline,
  cameraOutline,
  speedometerOutline,
  phonePortraitOutline,
  radioOutline,
  folderOutline,
  notificationsOutline,
  navigateOutline,
  arrowForwardOutline,
  hardwareChipOutline,
} from 'ionicons/icons';

import './Home.css';

const sensors = [
  {
    title: 'Geolocalización',
    description: 'Explora tu ubicación',
    icon: locateOutline,
    path: '/geolocation',
    color: 'teal',
  },
  {
    title: 'Cámara',
    description: 'Captura tus momentos',
    icon: cameraOutline,
    path: '/camera',
    color: 'purple',
  },
  {
    title: 'Movimiento',
    description: 'Mide la aceleración',
    icon: speedometerOutline,
    path: '/motion',
    color: 'orange',
  },
  {
    title: 'Dispositivo',
    description: 'Consulta información',
    icon: phonePortraitOutline,
    path: '/device',
    color: 'blue',
  },
  {
    title: 'Vibración',
    description: 'Prueba la respuesta háptica',
    icon: radioOutline,
    path: '/haptics',
    color: 'pink',
  },
  {
    title: 'Archivos',
    description: 'Guarda y lee archivos',
    icon: folderOutline,
    path: '/filesystem',
    color: 'yellow',
  },
  {
    title: 'Notificaciones locales',
    description: 'Programa recordatorios',
    icon: notificationsOutline,
    path: '/local-notifications',
    color: 'cyan',
  },
  {
    title: 'Notificaciones push',
    description: 'Registro con Firebase',
    icon: navigateOutline,
    path: '/push-notifications',
    color: 'indigo',
  },
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="home-header">
        <IonToolbar>
          <IonIcon
            slot="start"
            icon={hardwareChipOutline}
            className="header-icon"
          />
          <IonTitle>SensorLab</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-content">
        <div className="home-container">

          <section className="welcome-section">
            <span className="welcome-label">
              CHALLENGE 07 · MOBILE SENSORS
            </span>

            <h1>Explora tu dispositivo</h1>

            <p>
              Descubre las funciones de tu celular
              a través de sensores y herramientas móviles.
            </p>

            <div className="welcome-decoration">
              <IonIcon icon={hardwareChipOutline} />
            </div>
          </section>

          <div className="section-heading">
            <div>
              <h2>Laboratorio de sensores</h2>
              <p>Selecciona una herramienta para comenzar.</p>
            </div>

            <span className="sensor-count">08</span>
          </div>

          <IonGrid className="sensor-grid">
            <IonRow>
              {sensors.map((sensor, index) => (
                <IonCol size="6" key={sensor.path}>
                  <IonCard
                    button
                    routerLink={sensor.path}
                    className={`sensor-card ${sensor.color}`}
                  >
                    <IonCardContent>
                      <div className="sensor-card-top">
                        <div className="sensor-icon-wrapper">
                          <IonIcon icon={sensor.icon} />
                        </div>

                        <span className="sensor-number">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <h3>{sensor.title}</h3>

                      <p>{sensor.description}</p>

                      <div className="sensor-card-footer">
                        <span>Explorar</span>
                        <IonIcon icon={arrowForwardOutline} />
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          <div className="home-footer">
            <IonText color="medium">
              <p>Desarrollado con Ionic, React y Capacitor</p>
            </IonText>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
