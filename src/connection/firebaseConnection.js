import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyCB27bOSWo8dPXQkr_FdafEpc4tpsSGU1o",
  authDomain: "tccii-303e8.firebaseapp.com",
  databaseURL: "https://tccii-303e8-default-rtdb.firebaseio.com",
  projectId: "tccii-303e8",
  storageBucket: "tccii-303e8.appspot.com",
  messagingSenderId: "1082804458717",
  appId: "1:1082804458717:web:834390bb53905a60a5f734",
  measurementId: "G-SK7PGCXBLG"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

firebase.firestore().settings({ experimentalForceLongPolling: true });

export default firebase;