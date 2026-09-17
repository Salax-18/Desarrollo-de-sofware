import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonInput 
} from '@ionic/react';

import './Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  useEffect(() => {
    const sesion= localStorage.getItem('logged');
   if (sesion === 'true') {
      navigate('/list');
    }
  }, []);

  const iniciarSesion = () => {
    if (email === 'user@mail.com' && contraseña === '123') {
      localStorage.setItem('logged', 'true');
      navigate('/list');
    } else {
      setMensaje('Email o contraseña incorrectos');
    }
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Practica</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <div className="login-container">

          <h1>Login</h1>

          <IonInput
            label="Email"
            labelPlacement="floating"
            value={email}
            onIonChange={e => setEmail(e.detail.value ?? '')}
            placeholder="Ingrese su email"
          />

          <IonInput
            label="Contraseña"
            labelPlacement="floating"
            placeholder="Ingrese su contraseña"
            type="password"
            value={contraseña}
            onIonChange={e => setContraseña(e.detail.value ?? '')}
          />

          <IonButton expand="block" onClick={iniciarSesion}>
            Ingresar
          </IonButton>

          <p>{mensaje}</p>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Home;