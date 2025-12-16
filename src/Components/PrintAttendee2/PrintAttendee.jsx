import { useEffect, useState } from "react";
import { connectQZ, disconnectQZ } from "../../API/QZTray";

export default function QZStatus() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    (async () => {
      try {
        setStatus("connecting");
        await connectQZ();
        setStatus("connected");
      } catch (e) {
        console.error(e);
        setStatus("failed");
      }
    })();

    return () => {
      // לא חובה לנתק, אבל נקי
      disconnectQZ();
    };
  }, []);

  return <div>QZ: {status}</div>;
}
