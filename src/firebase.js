import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBa0C_4I8XVKUsi8NeBMX8C-1Q01XYSaNQ",
  authDomain: "slack-clone-react-redux-9e717.firebaseapp.com",
  projectId: "slack-clone-react-redux-9e717",
  storageBucket: "slack-clone-react-redux-9e717.appspot.com",
  messagingSenderId: "665542110004",
  appId: "1:665542110004:web:ec67142a076d25c2d65361"
};


const app = initializeApp(firebaseConfig); 

  const db = getFirestore(app);

  const auth = getAuth()

  const provider = new GoogleAuthProvider()

  export { db, auth, provider }