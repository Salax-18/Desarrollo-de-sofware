import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IonApp, IonSpinner } from "@ionic/react";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import Fruits from "./pages/Fruits";

const ProtectedRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <IonSpinner />
      </div>
    );
  }

  return user ? (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/fruits" element={<Fruits />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  ) : (
    <Navigate to="/" replace />
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;