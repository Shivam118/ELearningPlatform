import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCS9-Tc5T3VLo2Xj8nNlVR_A2rz-LbFnQE",
  authDomain: "elearning-project-61703.firebaseapp.com",
  projectId: "elearning-project-61703",
  storageBucket: "elearning-project-61703.appspot.com",
  messagingSenderId: "787479864007",
  appId: "1:787479864007:web:2a9291775c7a376431d4e2",
  measurementId: "G-TFX1LBJ82Y",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
