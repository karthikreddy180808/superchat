import React from 'react';
import './App.css';

//firebase stuff

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


//firebase hooks
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { func } from 'prop-types';
import { message } from 'statuses';


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


function SignOut(){
  return auth.currentUser && (
    <button onClick = {() => auth.signOut()}>Sign out</button>
  )
}

function ChatRoom(){

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query,{idField: 'id'});

  return(
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
      </div>
      <form>
        <input/>
        <button type"submit">Send</button>
      </form>
    </>
  )
}

function ChatMessage(props){
  const {text,uid,photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received' ;

  return (
    <div className = {`message ${messageClass}`}>
      <img src={photoURL}/>


      <p>{text}</p>
    </div>
  )
}



export default App;
