
import { useState } from 'react';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonIcon,
  IonTextarea,
} from '@ionic/react';

import {
  homeOutline,
  folderOpenOutline,
  saveOutline,
  documentTextOutline,
  downloadOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';

import {
  Filesystem,
  Directory,
  Encoding,
} from '@capacitor/filesystem';

import './SensorPage.css';

const FilesystemPage: React.FC = () => {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveFile = async () => {
    try {
      setLoading(true);
      setError(false);

      await Filesystem.writeFile({
        path: 'mi-archivo.txt',
        data: content,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      setMessage('¡Archivo guardado correctamente!');
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage('No se pudo guardar el archivo.');
    } finally {
      setLoading(false);
    }
  };

  const readFile = async () => {
    try {
      setLoading(true);
      setError(false);

      const result = await Filesystem.readFile({
        path: 'mi-archivo.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      setSavedContent(String(result.data));
      setMessage('¡Archivo leído correctamente!');
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage('No se pudo leer el archivo. Guárdalo primero.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader className="sensor-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerLink="/home" className="back-button">
              <IonIcon slot="start" icon={homeOutline} />
              Inicio
            </IonButton>
          </IonButtons>
          <IonTitle>Archivos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="sensor-content">
        <div className="sensor-page-container">
          <section className="sensor-welcome">
            <div className="sensor-hero-icon files-hero">
              <IonIcon icon={folderOpenOutline} />
            </div>

            <span className="sensor-eyebrow">
              SENSOR 06 · SISTEMA DE ARCHIVOS
            </span>

            <h1>Tus archivos, a tu alcance</h1>
            <p>
              Escribe contenido, guárdalo en el dispositivo y
              vuelve a leerlo cuando lo necesites.
            </p>
          </section>

          <IonCard className="sensor-panel">
            <IonCardContent>
              <div className="sensor-panel-heading">
                <div>
                  <h2>Mi archivo de texto</h2>
                  <p>Nombre del archivo: mi-archivo.txt</p>
                </div>

                <div className="sensor-small-icon files-small">
                  <IonIcon icon={documentTextOutline} />
                </div>
              </div>

              <div className="files-input-label">
                Escribe el contenido
              </div>

              <IonTextarea
                className="files-textarea"
                placeholder="Escribe aquí el texto que quieres guardar..."
                value={content}
                onIonInput={(event) =>
                  setContent(event.detail.value ?? '')
                }
                autoGrow
                rows={5}
              />

              <IonButton
                expand="block"
                className="sensor-action-button"
                onClick={saveFile}
                disabled={loading}
              >
                <IonIcon slot="start" icon={saveOutline} />
                Guardar archivo
              </IonButton>

              <IonButton
                expand="block"
                className="files-read-button"
                onClick={readFile}
                disabled={loading}
              >
                <IonIcon slot="start" icon={downloadOutline} />
                Leer archivo guardado
              </IonButton>

              {message && (
                <div
                  className={`sensor-message ${
                    error ? 'message-error' : 'message-success'
                  }`}
                >
                  <IonIcon
                    icon={error ? alertCircleOutline : checkmarkCircleOutline}
                  />
                  <p>{message}</p>
                </div>
              )}

              {savedContent !== '' && (
                <div className="files-saved-section">
                  <div className="files-saved-heading">
                    <IonIcon icon={documentTextOutline} />
                    <h3>Contenido guardado</h3>
                  </div>

                  <div className="files-saved-content">
                    {savedContent}
                  </div>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <div className="sensor-page-footer">
            <p>SensorLab · Capacitor Filesystem</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FilesystemPage;
