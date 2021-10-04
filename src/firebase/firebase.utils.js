// import firebase from "firebase/app";
import firebase from "firebase/compat";

import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

import 'firebase/firestore'
import 'firebase/auth'

import {doc, getDoc} from "firebase/firestore";
// import {setDoc} from "firebase/firebase-firestore";
import {setDoc} from "firebase/firestore";

const config = {

    apiKey: "AIzaSyCy2DTgdM1hoWdX9CBmI7ruVEe3USPRz_s",

    authDomain: "crwn-db-9fe51.firebaseapp.com",

    projectId: "crwn-db-9fe51",

    storageBucket: "crwn-db-9fe51.appspot.com",

    messagingSenderId: "1056379703086",

    appId: "1:1056379703086:web:266de78809c60e62c4f4bf",

    measurementId: "G-6P47V2HVHH"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = await doc(firestore, "users", userAuth.uid)
    const userDoc = await getDoc(userRef)
    // console.log(userDoc)
    console.log(userDoc)

    // if (!userDoc.exists) {
        console.log('user createasd')
        const {displayName, email} = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (err) {
            console.log('error creating user', err.message)
        }
    // }

    return userRef
    // console.log(userRef, userDoc)
}

firebase.initializeApp(config);

export const auth = firebase.auth();
// export const firestore = firebase.firestore();
export const firestore = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
// тригерит всплыв окно google как только мы пытаемся залогиниться с пом google
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;