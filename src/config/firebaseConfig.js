import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
//<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-analytics.js"></script>

const firebaseConfig = {
    apiKey: "AIzaSyAeaajVpL3nluYHYVZrUJ0C7UGmtycuj50",
    authDomain: "cse316finalproject-c0cbb.firebaseapp.com",
    databaseURL: "https://cse316finalproject-c0cbb.firebaseio.com",
    projectId: "cse316finalproject-c0cbb",
    storageBucket: "cse316finalproject-c0cbb.appspot.com",
    messagingSenderId: "251126851278",
    appId: "1:251126851278:web:761121c575a2c2274e529f",
    measurementId: "G-EPQXGY09P3"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;