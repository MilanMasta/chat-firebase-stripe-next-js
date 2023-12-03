import { getApp, getApps, initializeApp} from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPGlHG8I0dzqNW5txqYpNDyNLwvz6-Dh4",
    authDomain: "translator-nextjs.firebaseapp.com",
    projectId: "translator-nextjs",
    storageBucket: "translator-nextjs.appspot.com",
    messagingSenderId: "321014383333",
    appId: "1:321014383333:web:8d9a9259877777402d4a0c"
  };

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };