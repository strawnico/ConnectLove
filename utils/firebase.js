import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Nova mensagem";
//   const notificationOptions = {
//     body: '"Entre e veja sua nova mensagem de amor!"',
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

export { app, db };
