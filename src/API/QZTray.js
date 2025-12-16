import qz from "qz-tray";

export async function connectQZ() {
  if (qz.websocket.isActive()) return true;

  // ברירת מחדל של הספרייה תנסה להתחבר ללוקאל (8181/8182)
  await qz.websocket.connect();

  // אופציונלי: בדיקה מהירה שהכל תקין
  const v = await qz.api.getVersion();
  console.log("QZ Tray connected, version:", v);

  return true;
}

export async function disconnectQZ() {
  if (qz.websocket.isActive()) {
    await qz.websocket.disconnect();
  }
}
