
import { useEffect, useRef, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonProgressBar,
  IonText,
  IonSpinner,
  IonBadge,
  IonButtons,
} from '@ionic/react';

import {
  cameraOutline,
  navigateOutline,
  walkOutline,
  checkmarkCircleOutline,
  lockClosedOutline,
  trophyOutline,
  logOutOutline,
  refreshOutline,
} from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Motion } from '@capacitor/motion';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';

import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

import './Home.css';

type MissionState = {
  photo: boolean;
  movement: boolean;
  stillness: boolean;
};

const INITIAL_MISSIONS: MissionState = {
  photo: false,
  movement: false,
  stillness: false,
};

const POINTS_PER_MISSION = 40;

const Home: React.FC = () => {
  const [missions, setMissions] =
    useState<MissionState>(INITIAL_MISSIONS);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const [distance, setDistance] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [tracking, setTracking] = useState(false);
  const [waitingStill, setWaitingStill] = useState(false);

  const watchId = useRef<string | null>(null);
  const stillTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const previousAcceleration = useRef<{
    x: number;
    y: number;
    z: number;
  } | null>(null);

  const completedCount = Object.values(missions).filter(Boolean).length;
  const points = completedCount * POINTS_PER_MISSION;
  const progress = completedCount / 3;
  
useEffect(() => {
  const schedulePendingReminder = async () => {
    const user = auth.currentUser;

    if (!user || loading) return;

    const pendingCount = Object.values(missions).filter(
      (completed) => !completed
    ).length;

    // No mostrar recordatorios si ya terminó todas las misiones.
    if (pendingCount === 0) return;

    try {
      const permission = await LocalNotifications.checkPermissions();

      if (permission.display !== 'granted') return;

      // Evitar programar recordatorios repetidos al abrir el Home.
      const reminderKey = `pending-reminder-${user.uid}`;
      const alreadyScheduled = localStorage.getItem(reminderKey);

      if (alreadyScheduled === 'true') return;

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1001,
            title: '¡Tienes misiones pendientes!',
            body: `Te quedan ${pendingCount} misión(es) por completar. ¡Sigue ganando puntos!`,
            schedule: {
              at: new Date(Date.now() + 10000),
              allowWhileIdle: true,
            },
          },
        ],
      });

      localStorage.setItem(reminderKey, 'true');
    } catch (error) {
      console.error('Error programando recordatorio:', error);
    }
  };

  void schedulePendingReminder();
}, [loading, missions]);


  // Cargar el progreso guardado.
  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      const user = auth.currentUser;

      if (!user) {
        if (active) setLoading(false);
        return;
      }

      try {
        const localData = localStorage.getItem(`missions-${user.uid}`);

        if (localData && active) {
          const parsed = JSON.parse(localData);
          if (parsed.missions) {
            setMissions({ ...INITIAL_MISSIONS, ...parsed.missions });
          }
        }

       
const snapshot = await getDoc(doc(db, 'users', user.uid));

if (snapshot.exists() && active) {
  const data = snapshot.data();

  if (data.missions) {
    setMissions({ ...INITIAL_MISSIONS, ...data.missions });

    localStorage.setItem(
      `missions-${user.uid}`,
      JSON.stringify(data)
    );
  }

  // Recuperar el puntaje existente y publicarlo en el ranking.
  const completedMissions = Number(
    data.completedMissions ??
    Object.values({
      ...INITIAL_MISSIONS,
      ...(data.missions ?? {}),
    }).filter(Boolean).length
  );

  const points = Number(
    data.points ?? completedMissions * POINTS_PER_MISSION
  );

  await setDoc(
    doc(db, 'leaderboard', user.uid),
    {
      displayName:
        user.displayName ||
        user.email?.split('@')[0] ||
        'Usuario',
      points,
      completedMissions,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}

      } catch (error) {
        console.error('Error cargando progreso:', error);
        if (active) {
          setMessage(
            'No se pudo sincronizar con Firebase. Se conservará el avance local.'
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadProgress();

    return () => {
      active = false;
    };
  }, []);

  // Liberar sensores cuando la pantalla se desmonte.
  useEffect(() => {
    return () => {
      if (watchId.current) {
        void Geolocation.clearWatch({ id: watchId.current });
      }

      if (stillTimer.current) {
        clearInterval(stillTimer.current);
      }

      void Motion.removeAllListeners();
    };
  }, []);

 
const saveProgress = async (updated: MissionState) => {
  const user = auth.currentUser;
  if (!user) return;

  const completedMissions = Object.values(updated).filter(Boolean).length;
  const total = completedMissions * POINTS_PER_MISSION;

  const data = {
    missions: updated,
    points: total,
    completedMissions,
    updatedAt: new Date().toISOString(),
  };

  // Guardar el progreso privado 
  localStorage.setItem(
    `missions-${user.uid}`,
    JSON.stringify(data)
  );

  try {
  
    await setDoc(
      doc(db, 'users', user.uid),
      {
        ...data,
        email: user.email ?? '',
      },
      { merge: true }
    );

    await setDoc(
      doc(db, 'leaderboard', user.uid),
      {
        displayName: user.displayName || user.email?.split('@')[0] || 'Usuario',
        points: total,
        completedMissions,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    setMessage('¡Progreso y puntaje sincronizados con Firebase!');
  } catch (error) {
    console.error('Error guardando progreso o ranking:', error);
    setMessage(
      'El avance se guardó localmente, pero no se pudo sincronizar con Firebase.'
    );
  }
};


  const completeMission = async (mission: keyof MissionState) => {
    if (missions[mission]) return;

    const updated = { ...missions, [mission]: true };
    setMissions(updated);
    await saveProgress(updated);

    setMessage('¡Misión completada! Ganaste 40 puntos.');

    try {
      await Haptics.notification({ type: NotificationType.Success });
    } catch {
      // La misión puede completarse aunque no haya vibración.
    }

    try {
      const permission = await LocalNotifications.checkPermissions();

      if (permission.display === 'granted') {
        await LocalNotifications.schedule({
          notifications: [{
            id: Date.now() % 2147483647,
            title: '¡Misión completada!',
            body: Object.values(updated).every(Boolean)
              ? '¡Completaste todas las misiones!'
              : 'Has completado una misión. ¡Sigue así!',
          }],
        });
      }
    } catch (error) {
      console.warn('No se pudo programar la notificación:', error);
    }
  };

  // MISIÓN 1: tomar una foto y guardar la evidencia localmente.
  const takePhoto = async () => {
    if (missions.photo || busy) return;

    setBusy(true);
    setMessage('');

    try {
      const image = await Camera.getPhoto({
        quality: 75,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (!image.dataUrl) {
        setMessage('No se obtuvo la foto. Inténtalo de nuevo.');
        return;
      }

      localStorage.setItem(
        `photo-${auth.currentUser?.uid ?? 'guest'}`,
        image.dataUrl
      );

      setPhoto(image.dataUrl);
      await completeMission('photo');
    } catch (error) {
      console.error(error);
      setMessage('No se tomó la foto. Comprueba el permiso de cámara.');
    } finally {
      setBusy(false);
    }
  };

  // MISIÓN 2: superar los 30 metros desde el punto inicial.
  const startMovement = async () => {
    if (missions.movement || tracking || busy) return;

    setBusy(true);
    setMessage('Solicitando permiso de ubicación...');

    try {
      let permission = await Geolocation.checkPermissions();

      if (permission.location !== 'granted') {
        permission = await Geolocation.requestPermissions();
      }

      if (permission.location !== 'granted') {
        setMessage('Necesitas conceder el permiso de ubicación.');
        return;
      }

      const origin = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      const startLat = origin.coords.latitude;
      const startLon = origin.coords.longitude;

      setDistance(0);
      setTracking(true);
      setMessage('Camina hasta superar los 30 metros desde el inicio.');

      watchId.current = await Geolocation.watchPosition(
        { enableHighAccuracy: true, timeout: 15000 },
        async (position, error) => {
          if (error) {
            setMessage('No se pudo actualizar el GPS. Revisa la ubicación.');
            return;
          }

          if (!position) return;

          const lat1 = startLat * Math.PI / 180;
          const lat2 = position.coords.latitude * Math.PI / 180;
          const deltaLat =
            (position.coords.latitude - startLat) * Math.PI / 180;
          const deltaLon =
            (position.coords.longitude - startLon) * Math.PI / 180;

          const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) ** 2;

          const meters =
            6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

          setDistance(meters);

          if (meters > 30) {
            if (watchId.current) {
              await Geolocation.clearWatch({ id: watchId.current });
              watchId.current = null;
            }

            setTracking(false);
            await completeMission('movement');
            setMessage(
              '¡Superaste los 30 metros! La tercera misión está desbloqueada.'
            );
          }
        }
      );
    } catch (error) {
      console.error(error);
      setMessage('No se pudo iniciar el seguimiento GPS.');
      setTracking(false);
    } finally {
      setBusy(false);
    }
  };

  const stopMovement = async () => {
    if (watchId.current) {
      await Geolocation.clearWatch({ id: watchId.current });
      watchId.current = null;
    }

    setTracking(false);
    setMessage('Seguimiento detenido. Puedes intentarlo de nuevo.');
  };

  // BOTÓN TEMPORAL DE PRUEBA: completar misión 2 sin caminar 30 metros.
   /*const simulateMovement = async () => {
    if (missions.movement || busy) return;

    setBusy(true);
    try {
      if (watchId.current) {
        await Geolocation.clearWatch({ id: watchId.current });
        watchId.current = null;
      }

      setTracking(false);
      setDistance(30.1);
      await completeMission('movement');
      setMessage('Modo de prueba: misión 2 completada. ¡La tercera misión está desbloqueada!');
    } catch (error) {
      console.error('Error en la prueba de movimiento:', error);
      setMessage('No se pudo completar la misión de prueba. Inténtalo de nuevo.');
    } finally {
      setBusy(false);
    }
  }; */

  // MISIÓN 3: detectar estabilidad durante 10 segundos.
  const startStillness = async () => {
    if (!missions.movement || missions.stillness || waitingStill) return;

    setWaitingStill(true);
    setSeconds(0);
    setMessage('Quédate quieta durante 10 segundos.');

    let stableSeconds = 0;

    try {
      previousAcceleration.current = null;

      await Motion.addListener('accel', (event) => {
        const current = {
          x: event.acceleration.x ?? 0,
          y: event.acceleration.y ?? 0,
          z: event.acceleration.z ?? 0,
        };

        const previous = previousAcceleration.current;
        previousAcceleration.current = current;

        if (!previous) return;

        const change = Math.sqrt(
          (current.x - previous.x) ** 2 +
          (current.y - previous.y) ** 2 +
          (current.z - previous.z) ** 2
        );

        if (change > 0.8) {
          stableSeconds = 0;
          setSeconds(0);
        }
      });

      stillTimer.current = setInterval(() => {
        stableSeconds += 1;
        setSeconds(stableSeconds);

        if (stableSeconds >= 10) {
          if (stillTimer.current) clearInterval(stillTimer.current);
          stillTimer.current = null;

          void Motion.removeAllListeners();
          setWaitingStill(false);

          void Haptics.vibrate({ duration: 1000 });
          void completeMission('stillness');
          setMessage('¡Lo lograste! El celular vibró después de 10 segundos.');
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      await Motion.removeAllListeners();

      if (stillTimer.current) clearInterval(stillTimer.current);
      stillTimer.current = null;
      setWaitingStill(false);
      setMessage('No se pudo activar el acelerómetro.');
    }
  };

  const cancelStillness = async () => {
    if (stillTimer.current) clearInterval(stillTimer.current);
    stillTimer.current = null;

    await Motion.removeAllListeners();
    setWaitingStill(false);
    setSeconds(0);
    setMessage('Prueba cancelada.');
  };

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div style={{ textAlign: 'center', marginTop: '35vh' }}>
            <IonSpinner />
            <p>Cargando tu progreso...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const missionCards = [
    {
      id: 'photo' as const,
      title: 'Evidencia fotográfica',
      description: 'Toma una foto con la cámara para completar la primera misión.',
      icon: cameraOutline,
      unlocked: true,
      action: takePhoto,
      button: 'Tomar foto',
    },
    {
      id: 'movement' as const,
      title: 'Movimiento real',
      description: 'Desplázate más de 30 metros desde tu ubicación inicial.',
      icon: navigateOutline,
      unlocked: missions.photo,
      action: startMovement,
      button: tracking ? 'Midiendo distancia...' : 'Comenzar recorrido',
    },
    {
      id: 'stillness' as const,
      title: 'Permanencia activa',
      description: 'Mantente quieta durante 10 segundos. Al terminar, el celular vibrará.',
      icon: walkOutline,
      unlocked: missions.movement,
      action: startStillness,
      button: waitingStill ? `Quietud: ${seconds}/10 s` : 'Comenzar prueba',
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Misiones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout} aria-label="Cerrar sesión">
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="missions-content">
        <div className="missions-container">
          <section className="missions-hero">
            <p className="missions-eyebrow">TU AVENTURA COMIENZA AQUÍ</p>
            <h1>¡Completa tus misiones!</h1>
            <p className="missions-subtitle">
              Supera retos con tu dispositivo y gana puntos.
            </p>

            <div className="missions-stats">
              <div>
                <IonIcon icon={trophyOutline} />
                <strong>{points}</strong>
                <span>Puntos</span>
              </div>
              <div>
                <IonIcon icon={checkmarkCircleOutline} />
                <strong>{completedCount}/3</strong>
                <span>Misiones</span>
              </div>
            </div>

            <IonProgressBar value={progress} />
            <p className="missions-progress-label">
              {Math.round(progress * 100)}% completado
            </p>
          </section>

          <div className="missions-heading">
            <h2>Misiones disponibles</h2>
            <p>Completa cada reto para ganar {POINTS_PER_MISSION} puntos.</p>
          </div>

          {missionCards.map((mission, index) => (
            <IonCard className="mission-card" key={mission.id}>
              <IonCardContent>
                <div className="mission-layout">
                  <IonIcon
                    className="mission-icon"
                    icon={
                      missions[mission.id]
                        ? checkmarkCircleOutline
                        : mission.unlocked
                          ? mission.icon
                          : lockClosedOutline
                    }
                    color={missions[mission.id] ? 'success' : 'primary'}
                  />

                  <div className="mission-details">
                    <IonBadge color={
                      missions[mission.id]
                        ? 'success'
                        : mission.unlocked
                          ? 'medium'
                          : 'medium'
                    }>
                      {missions[mission.id]
                        ? 'Completada'
                        : mission.unlocked
                          ? 'Pendiente'
                          : 'Bloqueada'}
                    </IonBadge>

                    <h3>{index + 1}. {mission.title}</h3>
                    <p>{mission.description}</p>
                    <strong>{POINTS_PER_MISSION} puntos</strong>

                    {mission.id === 'movement' && tracking && (
                      <p className="mission-distance">
                        Distancia desde el inicio: {distance.toFixed(1)} m
                      </p>
                    )}

                    <IonButton
                      expand="block"
                      onClick={() => void mission.action()}
                      disabled={
                        !mission.unlocked ||
                        missions[mission.id] ||
                        busy ||
                        (mission.id === 'stillness' && waitingStill)
                      }
                    >
                      {mission.id === 'photo' && busy
                        ? <IonSpinner name="crescent" />
                        : mission.button}
                    </IonButton>

                    {mission.id === 'movement' && tracking && (
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="medium"
                        onClick={() => void stopMovement()}
                      >
                        Detener recorrido
                      </IonButton>
                    )}

                    {mission.id === 'stillness' && waitingStill && (
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="medium"
                        onClick={() => void cancelStillness()}
                      >
                        Cancelar prueba
                      </IonButton>
                    )}
                  </div>
                </div>

                {mission.id === 'photo' && photo && (
                  <img
                    src={photo}
                    alt="Evidencia de la misión"
                    className="mission-photo"
                  />
                )}
              </IonCardContent>
            </IonCard>
          ))}

          {message && (
            <IonCard className="mission-message">
              <IonCardContent>
                <IonText color="primary">
                  <p>{message}</p>
                </IonText>
              </IonCardContent>
            </IonCard>
          )}

          <IonButton
            className="refresh-progress"
            expand="block"
            fill="outline"
            onClick={() => window.location.reload()}
          >
            <IonIcon slot="start" icon={refreshOutline} />
            Actualizar progreso
          </IonButton>
          <IonButton expand="block" routerLink="/results">
  <IonIcon slot="start" icon={trophyOutline} />
  Ver resultados y ranking
</IonButton>

          <p className="missions-footer">
            Tu avance se guarda localmente y se sincroniza con Firebase
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
