
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
  personAddOutline,
} from 'ionicons/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from './services/firebase';
import './Auth.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password) {
      setError('Completa el correo y la contraseña.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      console.error(err);
      setError(
        'No se pudo crear la cuenta. Comprueba el correo e inténtalo de nuevo.'
      );
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
              <p className="auth-eyebrow">TU AVENTURA COMIENZA AQUÍ</p>
              <h1>¡Únete al reto!</h1>
              <p>Crea tu cuenta y empieza a sumar puntos.</p>
            </section>

            <IonCard className="auth-card">
              <IonCardContent>
                <div className="auth-card-heading">
                  <div className="auth-register-icon">
                    <IonIcon icon={personAddOutline} />
                  </div>
                  <h2>Crear cuenta</h2>
                  <p>Solo necesitas tu correo y una contraseña.</p>
                </div>

                <div className="auth-field">
                  <label htmlFor="register-email">Correo electrónico</label>
                  <div className="auth-input-wrapper">
                    <IonIcon icon={mailOutline} className="auth-input-icon" />
                    <IonInput
                      id="register-email"
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
                  <label htmlFor="register-password">Contraseña</label>
                  <div className="auth-input-wrapper">
                    <IonIcon
                      icon={lockClosedOutline}
                      className="auth-input-icon"
                    />
                    <IonInput
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onIonInput={(e) => {
                        setPassword(e.detail.value ?? '');
                        setError('');
                      }}
                      placeholder="Mínimo 6 caracteres"
                      autocomplete="new-password"
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
                  <p className="auth-hint">
                    Usa al menos 6 caracteres.
                  </p>
                </div>

                {error && (
                  <div className="auth-error" role="alert">
                    <IonText color="danger">{error}</IonText>
                  </div>
                )}

                <IonButton
                  expand="block"
                  className="auth-submit"
                  onClick={handleRegister}
                  disabled={loading}
                >
                  {loading ? (
                    <IonSpinner name="crescent" />
                  ) : (
                    <>
                      Crear mi cuenta
                      <IonIcon slot="end" icon={arrowForwardOutline} />
                    </>
                  )}
                </IonButton>

                <div className="auth-switch">
                  ¿Ya tienes una cuenta?
                  <Link to="/login"> Inicia sesión</Link>
                </div>
              </IonCardContent>
            </IonCard>

            <p className="auth-footer">
              <IonIcon icon={trophyOutline} />
              ¡Cada gran aventura empieza con un primer paso!
            </p>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
