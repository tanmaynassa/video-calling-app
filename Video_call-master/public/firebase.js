  var firebaseConfig = {
    apiKey: "AIzaSyDUianGqG1pQggql1BQoSAZjYSIasAgHEQ",
    authDomain: "webp-edeb9.firebaseapp.com",
    projectId: "webp-edeb9",
    storageBucket: "webp-edeb9.appspot.com",
    messagingSenderId: "471656468354",
    appId: "1:471656468354:web:05ddb84451fd77d136499b",
    measurementId: "G-07P2LQV0VW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth();
  const db = firebase.firestore()
