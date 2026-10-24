
import { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonIcon,
} from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  arrowForwardOutline,
  trophyOutline,
} from 'ionicons/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from './services/firebase';
import './Auth.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Completa el correo y la contraseña.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      console.error(err);
      setError('No se pudo iniciar sesión. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="auth-content">
        <div className="auth-background">
          <div className="auth-decoration auth-decoration-one" />
          <div className="auth-decoration auth-decoration-two" />

          <main className="auth-container">
            <div className="auth-brand">
              <div className="auth-logo">
                <IonIcon icon={trophyOutline} />
              </div>
              <span>MISIONES</span>
            </div>

            <section className="auth-heading">
              <p className="auth-eyebrow">¡QUÉ BUENO VERTE!</p>
              <h1>¡Hola de nuevo!</h1>
              <p>Inicia sesión y continúa tu aventura.</p>
            </section>

            <IonCard className="auth-card">
              <IonCardContent>
                <div className="auth-card-heading">
                  <h2>Iniciar sesión</h2>
                  <p>Ingresa tus datos para continuar.</p>
                </div>

                <div className="auth-field">
                  <label htmlFor="login-email">Correo electrónico</label>
                  <div className="auth-input-wrapper">
                    <IonIcon icon={mailOutline} className="auth-input-icon" />
                    <IonInput
                      id="login-email"
                      type="email"
                      value={email}
                      onIonInput={(e) => {
                        setEmail(e.detail.value ?? '');
                        setError('');
                      }}
                      placeholder="correo@ejemplo.com"
                      autocomplete="email"
                      inputmode="email"
                      required
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="login-password">Contraseña</label>
                  <div className="auth-input-wrapper">
                    <IonIcon
                      icon={lockClosedOutline}
                      className="auth-input-icon"
                    />
                    <IonInput
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onIonInput={(e) => {
                        setPassword(e.detail.value ?? '');
                        setError('');
                      }}
                      placeholder="Tu contraseña"
                      autocomplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="auth-password-toggle"
                      aria-label={
                        showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <IonIcon
                        icon={showPassword ? eyeOffOutline : eyeOutline}
                      />
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="auth-error" role="alert">
                    <IonText color="danger">{error}</IonText>
                  </div>
                )}

                <IonButton
                  expand="block"
                  className="auth-submit"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <IonSpinner name="crescent" />
                  ) : (
                    <>
                      Iniciar sesión
                      <IonIcon slot="end" icon={arrowForwardOutline} />
                    </>
                  )}
                </IonButton>

                <div className="auth-switch">
                  ¿Todavía no tienes cuenta?
                  <Link to="/register"> Crear cuenta</Link>
                </div>
              </IonCardContent>
            </IonCard>

            <p className="auth-footer">
              <IonIcon icon={trophyOutline} />
              Cada misión te acerca a tu próxima meta.
            </p>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
