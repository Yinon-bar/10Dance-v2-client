import { useEffect, useState } from "react";
import {
  connectQZ,
  disconnectQZ,
  getPrinters,
  getDefaultPrinter,
  printNameTagHtml,
} from "../../API/QZTray";

export default function QZStatus() {
  const [status, setStatus] = useState("idle");
  const [printers, setPrinters] = useState([]);
  const [defaultPrinter, setDefaultPrinter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setStatus("connecting");
        await connectQZ();
        setStatus("connected");

        const list = await getPrinters();
        const def = await getDefaultPrinter();

        setPrinters(list);
        setDefaultPrinter(def);
      } catch (e) {
        console.error(e);
        setStatus("failed");
      }
    })();

    return () => disconnectQZ();
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          printNameTagHtml({
            name: "Israel Cohen",
            line2: "VIP",
            line3: "10Dance",
          })
        }
      >
        Print Name Tag
      </button>
      <div>QZ: {status}</div>
      {status === "connected" && (
        <>
          <div>Default: {defaultPrinter || "—"}</div>
          <ul>
            {printers.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
