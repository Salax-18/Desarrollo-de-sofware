import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonItem,
  IonToast
} from '@ionic/react';

import { useState } from 'react';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarToast, setMostrarToast] = useState(false);

  const iniciarSesion = () => {

    if (
      email === 'user@gmail.com' &&
      password === '123'
    ) {

      localStorage.setItem('loggedIonic', 'true');

      onLogin();

    } else {

      setMostrarToast(true);

    }
  };

 return (
  <IonPage>

    <IonContent
      style={{
        '--background': '#f4f7fb'
      } as React.CSSProperties}
    >

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          margin: '0 auto',
          padding: '70px 25px 30px',
          boxSizing: 'border-box'
        }}
      >

        
        <div
          style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >

          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              margin: '0 0 8px',
              color: '#1f2937'
            }}
          >
            MediClinic
          </h1>

          <p
            style={{
              margin: 0,
              color: '#777',
              fontSize: '16px'
            }}
          >
            Portal médico
          </p>

        </div>


        {/* FORMULARIO */}
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: '#ffffff',
            padding: '25px',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
          }}
        >

          {/* EMAIL */}
          <IonItem
            style={{
              marginBottom: '20px',
              '--background': '#f7f8fa',
              '--border-radius': '10px',
              '--border-color': '#d5d9e0',
              '--border-width': '1px',
              '--border-style': 'solid',
              '--color': '#222',
              '--placeholder-color': '#777',
              '--placeholder-opacity': '1'
            }}
          >

            <IonInput
              label="Email"
              labelPlacement="floating"
              placeholder="Ingrese su email"
              type="email"
              value={email}
              onIonChange={(e) =>
                setEmail(e.detail.value!)
              }
            />

          </IonItem>


          
          <IonItem
            style={{
              marginBottom: '20px',
              '--background': '#f7f8fa',
              '--border-radius': '10px',
              '--border-color': '#d5d9e0',
              '--border-width': '1px',
              '--border-style': 'solid',
              '--color': '#222',
              '--placeholder-color': '#777',
              '--placeholder-opacity': '1'
            }}
          >

            <IonInput
              label="Contraseña"
              labelPlacement="floating"
              placeholder="Ingrese su contraseña"
              type="password"
              value={password}
              onIonChange={(e) =>
                setPassword(e.detail.value!)
              }
            />

          </IonItem>


         
          <IonButton
            expand="block"
            onClick={iniciarSesion}
            style={{
              marginTop: '10px',
              height: '48px'
            }}
          >
            Ingresar
          </IonButton>

        </div>

      </div>


     
      <IonToast
        isOpen={mostrarToast}
        message="Email o contraseña incorrectos"
        duration={2000}
        onDidDismiss={() =>
          setMostrarToast(false)
        }
      />

    </IonContent>

  </IonPage>
);
};

export default Login;