
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";

import {
  peopleOutline,
  checkboxOutline,
  nutritionOutline,
  logOutOutline,
} from "ionicons/icons";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Home.css";
import NetworkStatus from "../components/NetworkStatus";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Challenge 06</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-content">
        <div className="home-container">
          <div className="home-welcome">
  <h1>¡Bienvenida!</h1>
  <p>{user?.email}</p>
  <p>¿Qué deseas gestionar hoy?</p>
  <NetworkStatus />
</div>

          <div className="home-grid">
            <IonCard
              button
              onClick={() => navigate("/contacts")}
              className="home-card"
            >
              <IonCardHeader>
                <IonIcon icon={peopleOutline} />
                <IonCardTitle>Contacts</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Administra tus contactos.
              </IonCardContent>
            </IonCard>

            <IonCard
              button
              onClick={() => navigate("/tasks")}
              className="home-card"
            >
              <IonCardHeader>
                <IonIcon icon={checkboxOutline} />
                <IonCardTitle>Tasks</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Organiza tus tareas.
              </IonCardContent>
            </IonCard>

            <IonCard
              button
              onClick={() => navigate("/fruits")}
              className="home-card"
            >
              <IonCardHeader>
                <IonIcon icon={nutritionOutline} />
                <IonCardTitle>Fruits</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Guarda y consulta tus frutas.
              </IonCardContent>
            </IonCard>
          </div>

          <div className="home-logout">
            <IonButton
              color="medium"
              fill="outline"
              onClick={handleLogout}
            >
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
