// import firebase from "firebase/app";
import firebase from "firebase/compat";
import 'firebase/firestore'
import 'firebase/auth'

const config = {

    apiKey: "AIzaSyCy2DTgdM1hoWdX9CBmI7ruVEe3USPRz_s",

    authDomain: "crwn-db-9fe51.firebaseapp.com",

    projectId: "crwn-db-9fe51",

    storageBucket: "crwn-db-9fe51.appspot.com",

    messagingSenderId: "1056379703086",

    appId: "1:1056379703086:web:266de78809c60e62c4f4bf",

    measurementId: "G-6P47V2HVHH"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// тригерит всплыв окно google как только мы пытаемся залогиниться с пом google
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;