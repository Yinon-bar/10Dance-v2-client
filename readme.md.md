<div dir="rtl">

# 10Dance – React Client (Vite)

מסמך זה מתאר את אפליקציית הקליינט של פרויקט **10Dance** – אפליקציית React המבוססת על Vite, האחראית על ממשק המשתמש, ניהול הסטייט והתקשורת עם שרת ה־PHP.

---

## 📌 סקירה כללית

אפליקציית הקליינט מאפשרת:
- צפייה באירועים
- ניהול נוכחות (משתתפים)
- הוספה / עדכון / מחיקה של משתתפים
- תקשורת מלאה עם API חיצוני

הקליינט אינו מכיל לוגיקה עסקית או גישה למסד נתונים – כל אלו מתבצעים בשרת.

---

## 🧰 טכנולוגיות

- React
- Vite
- Axios
- Context API
- CSS (RTL)

---

## 📁 מבנה תיקיות

<div dir="ltr">

```
src/
│
├── api/
│   └── axios.js          # הגדרות axios ו-baseURL
│
├── components/
│   ├── Admin/
│   ├── Client/
│   ├── PrintAtt/
│   └── UI/
│
├── context/
│   ├── EventContext.jsx
│   └── AttendeesContext.jsx
│
├── pages/
│   ├── AdminPage.jsx
│   └── ClientPage.jsx
│
├── config/
│   └── api.js            # חשיפה של VITE_API_URL
│
├── App.jsx
├── main.jsx
└── index.css
```

</div>

---

## 🌍 משתני סביבה (Vite)

משתני סביבה מוגדרים באמצעות קבצי env.

### לוקאל – `.env.local`

<div dir="ltr">

```env
VITE_API_URL=http://localhost/10dance-api
```

</div>

### פרודקשן – `.env.production`

<div dir="ltr">

```env
VITE_API_URL=https://10dance-api.yinon-bar.com
```

</div>

שימוש בקוד:

<div dir="ltr">

```js
const API_URL = import.meta.env.VITE_API_URL;
```

</div>

---

## 🔗 תקשורת עם השרת

כל הקריאות לשרת מתבצעות באמצעות Axios.

<div dir="ltr">

```js
import axios from "axios";
import { API_URL } from "../config/api";

export const api = axios.create({
  baseURL: API_URL,
});
```

</div>

---

## 🧠 ניהול State

הפרויקט משתמש ב־Context API לצורך:
- אירוע נבחר
- רשימת משתתפים
- סנכרון נתונים בין קומפוננטות

### דוגמה:

<div dir="ltr">

```jsx
const { attendees, setAttendees } = useContext(AttendeesContext);
```

</div>

---

## 🖨️ הדפסה

הדפסת משתתף מתבצעת באמצעות קומפוננטה ייעודית המשתמשת ב־`window.print()`.

---

## 🌐 RTL

האפליקציה כולה מוגדרת כ־RTL:

<div dir="ltr">

```html
<html lang="he" dir="rtl">
```

</div>

במקומות בהם יש טקסט באנגלית / קוד – נעשה שימוש ב־`dir="ltr"`.

---

## 🧪 הרצה לוקאלית

<div dir="ltr">

```bash
npm install
npm run dev
```

</div>

האפליקציה תעלה ב־`http://localhost:5173`.

---

## 🚀 בנייה לפרודקשן

<div dir="ltr">

```bash
npm run build
```

</div>

תיקיית `dist/` משמשת לפריסה (Netlify / Hosting).

---

## 🔐 אבטחה – עקרונות

- אין סיסמאות או מפתחות בקוד הקליינט
- כל סוד נשאר בשרת
- משתני env ב־Vite חשופים לקליינט

---

## 🧭 סיכום

הקליינט של 10Dance בנוי בצורה מודולרית, קריאה וניתנת להרחבה:
- הפרדה ברורה בין UI, state ו־API
- תמיכה מלאה ב־RTL
- עבודה נכונה מול שרת חיצוני

---

✍️ תיעוד זה נכתב עבור פרויקט 10Dance – React Client

</div>