import React from 'react';
import './App.css';

//firebase stuff

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


//firebase hooks
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyD2Td9DuvEUTDaDLf64at6Nje6npyAtChs",
  authDomain: "realtimechat-ff388.firebaseapp.com",
  projectId: "realtimechat-ff388",
  storageBucket: "realtimechat-ff388.appspot.com",
  messagingSenderId: "482778360988",
  appId: "1:482778360988:web:c438deae7de0aca4c8d159",
  measurementId: "G-JZYS31E7CN"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header"></header>
      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>

    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button onClick = {signInWithGoogle}>Sign In with Google</button>
  )

}


export default App;
