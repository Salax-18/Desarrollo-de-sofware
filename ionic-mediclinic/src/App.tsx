import { useEffect, useState } from 'react';
import {IonApp,IonRouterOutlet,IonTabs, IonTabBar,IonTabButton,IonLabel,IonIcon
} from '@ionic/react';

import {
  calendar,
  people,
  person
} from 'ionicons/icons';

import {
  IonReactRouter
} from '@ionic/react-router';

import {
  Route,
  Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import Visitas from './pages/Visitas';
import Pacientes from './pages/Pacientes';
import Perfil from './pages/Perfil';
import DetalleVisita from './pages/DetalleVisita';

const App: React.FC = () => {

  const [logged, setLogged] = useState(false);

  useEffect(() => {

    const sesion = localStorage.getItem('loggedIonic');

    if (sesion === 'true') {
      setLogged(true);
    }

  }, []);

  if (!logged) {
    return (
      <Login
        onLogin={() => setLogged(true)}
      />
    );
  }

  return (
    <IonApp>

      <IonReactRouter>

        <IonTabs>

          <IonRouterOutlet>

            <Route
              path="/visitas"
              element={<Visitas />}
            />

            <Route
              path="/pacientes"
              element={<Pacientes />}
            />

            <Route
              path="/perfil"
              element={<Perfil />}
            />

            <Route
              path="/"
              element={<Navigate to="/visitas" replace />}
            />
             <Route
            path="/detalle-visita/:id"
            element={<DetalleVisita />}
          />

          </IonRouterOutlet>
         

        

          <IonTabBar slot="bottom">

            <IonTabButton tab="visitas" href="/visitas">
              <IonIcon icon={calendar} />
              <IonLabel>Visitas</IonLabel>
            </IonTabButton>

            <IonTabButton tab="pacientes" href="/pacientes">
              <IonIcon icon={people} />
              <IonLabel>Pacientes</IonLabel>
            </IonTabButton>

            <IonTabButton tab="perfil" href="/perfil">
              <IonIcon icon={person} />
              <IonLabel>Perfil</IonLabel>
            </IonTabButton>


          </IonTabBar>

        </IonTabs>

      </IonReactRouter>

    </IonApp>
  );
};

export default App;