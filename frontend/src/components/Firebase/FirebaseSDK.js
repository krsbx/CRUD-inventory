import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDMAeK4gOCw1f8mw7rwvrVuahkZNA2QJAI",
  authDomain: "crud-deploy.firebaseapp.com",
  projectId: "crud-deploy",
  storageBucket: "crud-deploy.appspot.com",
  messagingSenderId: "423372451526",
  appId: "1:423372451526:web:6d3f4f1d64e22ee519b1c7",
  measurementId: "G-25C7J85S0M"
};

firebase.initializeApp(firebaseConfig);

export default firebase