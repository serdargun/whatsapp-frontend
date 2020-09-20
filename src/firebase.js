import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBBBrTvZkkuO0eNir2oGzJ4gCYSQ4d_d7w",
  authDomain: "whatsapp-mern-7080a.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-7080a.firebaseio.com",
  projectId: "whatsapp-mern-7080a",
  storageBucket: "whatsapp-mern-7080a.appspot.com",
  messagingSenderId: "660308067628",
  appId: "1:660308067628:web:b539720ceb5b9e60e01889",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
