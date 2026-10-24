
import { useEffect, useState } from 'react';
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
  IonSpinner,
  IonText,
  IonProgressBar,
  IonBadge,
} from '@ionic/react';

import {
  trophyOutline,
  medalOutline,
  homeOutline,
  checkmarkCircleOutline,
  refreshOutline,
  personCircleOutline,
  sparklesOutline,
  ribbonOutline,
} from 'ionicons/icons';

import {
  doc,
  getDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

import { auth, db } from '../services/firebase';
import './Results.css';

type RankingUser = {
  uid: string;
  displayName: string;
  points: number;
  completedMissions: number;
};

type MyProgress = {
  points: number;
  completedMissions: number;
  missions: {
    photo: boolean;
    movement: boolean;
    stillness: boolean;
  };
};

const EMPTY_PROGRESS: MyProgress = {
  points: 0,
  completedMissions: 0,
  missions: {
    photo: false,
    movement: false,
    stillness: false,
  },
};

const MISSION_LABELS = [
  ['photo', 'Evidencia fotográfica'],
  ['movement', 'Movimiento real'],
  ['stillness', 'Permanencia activa'],
] as const;

const ResultsPage: React.FC = () => {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [myProgress, setMyProgress] = useState<MyProgress>(EMPTY_PROGRESS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentUser = auth.currentUser;

  const loadResults = async () => {
    setLoading(true);
    setError('');

    try {
      if (currentUser) {
        const userSnapshot = await getDoc(
          doc(db, 'users', currentUser.uid)
        );

        if (userSnapshot.exists()) {
          const data = userSnapshot.data();

          const missions = {
            ...EMPTY_PROGRESS.missions,
            ...(data.missions ?? {}),
          };

          const completedMissions = Number(
            data.completedMissions ??
              Object.values(missions).filter(Boolean).length
          );

          setMyProgress({
            points: Number(data.points ?? completedMissions * 40),
            completedMissions,
            missions,
          });
        } else {
          setMyProgress(EMPTY_PROGRESS);
        }
      }

      const rankingQuery = query(
        collection(db, 'leaderboard'),
        orderBy('points', 'desc'),
        limit(5)
      );

      const snapshot = await getDocs(rankingQuery);

      const users: RankingUser[] = snapshot.docs.map((item) => {
        const data = item.data();

        return {
          uid: item.id,
          displayName: data.displayName ?? 'Usuario',
          points: Number(data.points ?? 0),
          completedMissions: Number(data.completedMissions ?? 0),
        };
      });

      setRanking(users);
    } catch (err) {
      console.error('Error cargando resultados:', err);

      setError(
        'No se pudieron cargar los resultados. Comprueba tu conexión e inténtalo de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadResults();
  }, []);

  const myPosition = ranking.findIndex(
    (item) => item.uid === currentUser?.uid
  );

  const progress = Math.min(myProgress.completedMissions / 3, 1);

  const getInitial = (name: string) =>
    name.trim().charAt(0).toUpperCase() || 'U';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Resultados y ranking</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="results-content">
        <div className="results-container">

          {/* ENCABEZADO */}
          <section className="results-hero">
            <div className="results-hero-icon">
              <IonIcon icon={trophyOutline} />
            </div>

            <p className="results-eyebrow">TU ESFUERZO CUENTA</p>
            <h1>¡Vas por la victoria!</h1>
            <p className="results-hero-text">
              Revisa tus logros, suma puntos y escala posiciones.
            </p>

            <div className="results-hero-stats">
              <div className="results-hero-stat">
                <IonIcon icon={sparklesOutline} />
                <strong>{myProgress.points}</strong>
                <span>Puntos</span>
              </div>

              <div className="results-stat-divider" />

              <div className="results-hero-stat">
                <IonIcon icon={checkmarkCircleOutline} />
                <strong>{myProgress.completedMissions}/3</strong>
                <span>Misiones</span>
              </div>
            </div>
          </section>

          {/* MI PROGRESO */}
          <section className="results-section">
            <div className="results-section-heading">
              <div>
                <p className="results-eyebrow">TU RECORRIDO</p>
                <h2>Mi progreso</h2>
              </div>

              <IonBadge
                color={myProgress.completedMissions === 3 ? 'success' : 'primary'}
              >
                {myProgress.completedMissions === 3
                  ? '¡Completado!'
                  : 'En progreso'}
              </IonBadge>
            </div>

            <IonCard className="results-progress-card">
              <IonCardContent>
                <div className="results-player">
                  <div className="results-player-avatar">
                    <IonIcon icon={personCircleOutline} />
                  </div>

                  <div className="results-player-info">
                    <span>JUGADOR</span>
                    <h3>
                      {currentUser?.displayName ||
                        currentUser?.email?.split('@')[0] ||
                        'Usuario'}
                    </h3>
                  </div>

                  {myPosition >= 0 && (
                    <div className="results-position">
                      <span>POSICIÓN</span>
                      <strong>#{myPosition + 1}</strong>
                    </div>
                  )}
                </div>

                <div className="results-points-panel">
                  <div>
                    <span>Puntaje acumulado</span>
                    <p>
                      <strong>{myProgress.points}</strong> pts
                    </p>
                  </div>

                  <div className="results-points-icon">
                    <IonIcon icon={trophyOutline} />
                  </div>
                </div>

                <div className="results-progress-label">
                  <span>Progreso de misiones</span>
                  <strong>{Math.round(progress * 100)}%</strong>
                </div>

                <IonProgressBar
                  className="results-progress-bar"
                  value={progress}
                />

                <div className="results-missions-heading">
                  <h3>Misiones</h3>
                  <span>
                    {myProgress.completedMissions} de 3 completadas
                  </span>
                </div>

                <div className="results-mission-list">
                  {MISSION_LABELS.map(([key, label], index) => (
                    <div className="results-mission-row" key={key}>
                      <div
                        className={`results-mission-icon ${
                          myProgress.missions[key] ? 'is-complete' : ''
                        }`}
                      >
                        <IonIcon icon={checkmarkCircleOutline} />
                      </div>

                      <div className="results-mission-name">
                        <strong>{label}</strong>
                        <span>Misión {index + 1} · 40 puntos</span>
                      </div>

                      <IonBadge
                        color={
                          myProgress.missions[key] ? 'success' : 'medium'
                        }
                      >
                        {myProgress.missions[key] ? 'Lista' : 'Pendiente'}
                      </IonBadge>
                    </div>
                  ))}
                </div>

                <IonButton
                  expand="block"
                  className="results-home-button"
                  routerLink="/home"
                >
                  <IonIcon slot="start" icon={homeOutline} />
                  Volver a misiones
                </IonButton>
              </IonCardContent>
            </IonCard>
          </section>

          {/* RANKING */}
          <section className="results-section">
            <div className="results-section-heading">
              <div>
                <p className="results-eyebrow">LOS MÁS DESTACADOS</p>
                <h2>Top 5 jugadores</h2>
              </div>

              <div className="results-ranking-icon">
                <IonIcon icon={ribbonOutline} />
              </div>
            </div>

            <p className="results-section-description">
              ¡Cada misión puede acercarte al primer puesto!
            </p>

            {loading && (
              <div className="results-loading">
                <IonSpinner name="crescent" />
                <p>Actualizando posiciones...</p>
              </div>
            )}

            {error && (
              <IonCard className="results-error-card">
                <IonCardContent>
                  <IonText color="danger">
                    <p>{error}</p>
                  </IonText>

                  <IonButton
                    fill="outline"
                    onClick={() => void loadResults()}
                  >
                    Intentar de nuevo
                  </IonButton>
                </IonCardContent>
              </IonCard>
            )}

            {!loading && !error && ranking.length === 0 && (
              <IonCard className="results-empty-card">
                <IonCardContent>
                  <IonIcon icon={trophyOutline} />
                  <h3>¡El ranking te espera!</h3>
                  <p>
                    Aún no hay puntajes registrados. Completa una misión
                    para aparecer en la clasificación.
                  </p>
                </IonCardContent>
              </IonCard>
            )}

            {!loading && !error && ranking.length > 0 && (
              <div className="results-ranking-list">
                {ranking.map((user, index) => (
                  <div
                    className={`results-ranking-item ${
                      user.uid === currentUser?.uid ? 'is-me' : ''
                    } ${index < 3 ? `rank-${index + 1}` : ''}`}
                    key={user.uid}
                  >
                    <div className={`results-rank-number rank-number-${index + 1}`}>
                      {index === 0 ? (
                        <IonIcon icon={trophyOutline} />
                      ) : index < 3 ? (
                        <IonIcon icon={medalOutline} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    <div className="results-ranking-avatar">
                      {getInitial(user.displayName)}
                    </div>

                    <div className="results-ranking-user">
                      <strong>
                        {user.displayName}
                        {user.uid === currentUser?.uid && (
                          <span className="results-you-tag">TÚ</span>
                        )}
                      </strong>

                      <span>
                        {user.completedMissions} de 3 misiones completadas
                      </span>
                    </div>

                    <div className="results-ranking-points">
                      <strong>{user.points}</strong>
                      <span>PTS</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <IonButton
            expand="block"
            fill="outline"
            className="results-refresh-button"
            onClick={() => void loadResults()}
            disabled={loading}
          >
            {loading ? (
              <IonSpinner name="crescent" />
            ) : (
              <>
                <IonIcon slot="start" icon={refreshOutline} />
                Actualizar resultados
              </>
            )}
          </IonButton>

          <p className="results-footer">
            <IonIcon icon={trophyOutline} />
            Sigue avanzando. ¡Tu próxima misión te espera!
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResultsPage;
