
import { useEffect, useState } from "react";
import {
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { wifiOutline, cloudOfflineOutline } from "ionicons/icons";
import { Network } from "@capacitor/network";

const NetworkStatus: React.FC = () => {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const status = await Network.getStatus();
      setConnected(status.connected);
    };

    checkConnection();

    const listener = Network.addListener(
      "networkStatusChange",
      (status) => {
        setConnected(status.connected);
      }
    );

    return () => {
      listener.then((handle) => handle.remove());
    };
  }, []);

  return (
    <IonChip color={connected ? "success" : "danger"}>
      <IonIcon icon={connected ? wifiOutline : cloudOfflineOutline} />
      <IonLabel>
        {connected ? "Con conexión" : "Sin conexión"}
      </IonLabel>
    </IonChip>
  );
};

export default NetworkStatus;