// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getMessaging, isSupported} from 'firebase/messaging'
import {getToken} from 'firebase/messaging'

import {onBackgroundMessage} from "firebase/messaging/sw";
import {onMessage} from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDikzx8GdBIBSuATlDRsyqXWHjA8m2hM2w",
  authDomain: "datarete-cloud-prestitosi.firebaseapp.com",
  projectId: "datarete-cloud-prestitosi",
  storageBucket: "datarete-cloud-prestitosi.appspot.com",
  messagingSenderId: "606991108163",
  appId: "1:606991108163:web:2fc5a75f7efdad4b11acf6",
  measurementId: "G-CTT0D8RZG4"
};

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

isSupported()
    .then(() => {
        // eslint-disable-next-line no-unused-vars
        const messaging = getMessaging(app)
        //
        // onBackgroundMessage(messaging, ({ notification }) => {
        //     const { title, body, image } = notification ?? {}
        //
        //     if (!title) {
        //         return
        //     }
        //
        //     self.registration.showNotification(title, {
        //         body,
        //         icon: image
        //     })
        // })
    })
    .catch(/* error */)

    

export default messaging

