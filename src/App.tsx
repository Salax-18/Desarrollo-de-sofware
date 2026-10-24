
import { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { auth } from './services/firebase';
import LoginPage from './loginPage';
import RegisterPage from './RegisterPage';
import Home from './pages/Home';
import ResultsPage from './pages/Results';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return <IonApp />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/login"
            element={user ? <Navigate to="/home" replace /> : <LoginPage />}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/home" replace /> : <RegisterPage />}
          />

          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
  path="/results"
  element={user ? <ResultsPage /> : <Navigate to="/login" replace />}
/>

          <Route
            path="/"
            element={
              <Navigate to={user ? '/home' : '/login'} replace />
            }
          />
          
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
