import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDRC1FY-o3YvLO7_tAdgh9G_DGKdk2q82g",
    authDomain: "react-authentication-5e942.firebaseapp.com",
    projectId: "react-authentication-5e942",
    storageBucket: "react-authentication-5e942.appspot.com",
    messagingSenderId: "579432981657",
    appId: "1:579432981657:web:29d9ac656914adadb78408"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase;