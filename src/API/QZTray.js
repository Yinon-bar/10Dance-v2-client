import qz from "qz-tray";

// certificate (public)
qz.security.setCertificatePromise(() =>
  fetch(
    "http://localhost/10Dance-V2-php-server/4-controllers/qz-sign.php"
  ).then((res) => res.text())
);

// signature (private, דרך PHP)
qz.security.setSignaturePromise((toSign) =>
  fetch("/api/qz-sign.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ toSign }),
  })
    .then((res) => res.json())
    .then((data) => data.signature)
);

export async function connectQZ() {
  if (qz.websocket.isActive()) return true;

  // ברירת מחדל של הספרייה תנסה להתחבר ללוקאל (8181/8182)
  await qz.websocket.connect();

  // אופציונלי: בדיקה מהירה שהכל תקין
  const v = await qz.api.getVersion();
  console.log("QZ Tray connected, version:", v);

  return true;
}

export async function getPrinters() {
  // מחזיר מערך שמות של מדפסות
  return await qz.printers.find();
}

export async function getDefaultPrinter() {
  return await qz.printers.getDefault();
}

export async function printNameTagHtml({ name, line2 = "", line3 = "" }) {
  const printerName = "Microsoft Print to PDF";
  const config = qz.configs.create(printerName);

  const html = `
  <div style="
    width: 80mm;
    height: 50mm;
    box-sizing: border-box;
    padding: 6mm;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  ">
    <!-- מסגרת פנימית -->
    <div style="
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 0.5mm solid #000;
      border-radius: 3mm;
      padding: 5mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    ">
      <div style="
        font-size: 26pt;
        font-weight: 800;
        line-height: 1.05;
        word-break: break-word;
      ">${escapeHtml(name)}</div>

      ${
        line2
          ? `<div style="margin-top: 3mm; font-size: 12pt; font-weight: 600;">${escapeHtml(
              line2
            )}</div>`
          : ""
      }

      ${
        line3
          ? `<div style="margin-top: 2mm; font-size: 11pt;">${escapeHtml(
              line3
            )}</div>`
          : ""
      }
    </div>
  </div>
`;

  const data = [{ type: "pixel", format: "html", flavor: "plain", data: html }];

  await qz.print(config, data);
}

// חשוב למנוע שבירת HTML אם יש גרשיים/סימנים
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function disconnectQZ() {
  if (qz.websocket.isActive()) {
    await qz.websocket.disconnect();
  }
}
