import React, { useState, useRef } from 'react';
import formatDate  from './dateUtils';
import { auth, db } from './firebase-config';
import './App.css'

import { collection, addDoc, query, orderBy, limit, DocumentData, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function App() {
    const [user] = useAuthState(auth);

    return (
        <div className="App">
            <header>
                <h1 className="text-3xl font-semibold">Chat App</h1>
                <SignOut />
            </header>
            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential) {
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
  
    return (
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    );
}
  
function SignOut() {
    return auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    );
}
  
function ChatRoom() {
    const chatRef = useRef<HTMLDivElement>(null);
    const messagesRef = collection(db, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(25));
    let [messages] = useCollectionData(q);
    const [formValue, setFormValue] = useState('');
    messages?.reverse();

    const handleInput= (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValue(e.target.value);
    }

    const sendMessage = async(e: React.FormEvent) => {
        e.preventDefault();
        if (auth.currentUser) {

        const { uid, photoURL, displayName } = auth.currentUser;

        const date = new Date();

        try {
            const docRef = await addDoc(messagesRef, {
                text: formValue,
                createdAt: serverTimestamp(),
                dateStr: formatDate(date),
                uid,
                photoURL,
                displayName,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setFormValue('');

        chatRef.current?.scrollIntoView({ behavior: 'smooth'});
        }
    }
    
    return (<>
        <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={chatRef}></div>
        </main>

        <form onSubmit={sendMessage}>
        <input value={formValue} onChange={handleInput} placeholder="Write something nice"></input>
        </form>
    </>);
}
  
interface MessageObj extends DocumentData {
    text?: string;
    uid?: string;
    createdAt?: any;
    dateStr?: string;
    photoURL?: string;
    displayName?: string;
}
  
interface messageProps {
    key: string;
    message: MessageObj;
}
  
  
function ChatMessage(props: messageProps) {
    const { text, uid, dateStr, photoURL, displayName } = props.message;
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';
    return (
        <>
        <div className={`message ${messageClass}`}>
            <img alt='' src={photoURL || 'https://gravatar.com/avatar/88ef206694dcfb99d04de777af437928?s=400&d=robohash&r=x'} />
            <p>
                <strong>{displayName}</strong>
                <small>{' ' + dateStr}</small>
                <br/> {text}
            </p>
        </div>
        </>
    );
}