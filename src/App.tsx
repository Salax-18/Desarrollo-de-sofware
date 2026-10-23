
import { Navigate, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import GeolocationPage from './pages/Geolocation';
import CameraPage from './pages/CameraPage';
import MotionPage from './pages/MotionPage';
import DevicePage from './pages/DevicePage';
import HapticsPage from './pages/HapticsPage';
import FilesystemPage from './pages/FilesystemPage';
import LocalNotificationsPage from './pages/LocalNotificationsPage';
import PushNotificationsPage from './pages/PushNotificationsPage';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/geolocation" element={<GeolocationPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/motion" element={<MotionPage />} />
          <Route path="/device" element={<DevicePage />} />
          <Route path="/haptics" element={<HapticsPage />} />
          <Route path="/filesystem" element={<FilesystemPage />} />
          <Route path="/local-notifications" element={<LocalNotificationsPage />} />
          <Route path="/push-notifications" element={<PushNotificationsPage />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
