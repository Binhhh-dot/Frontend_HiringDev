import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import notificationServices from "../services/notification.services";
import { useEffect, useState } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: "AIzaSyCmSi7on6iSZ4OP4V7b7ZEsDw3Cb1GVeTU",
    authDomain: "capstone-project-wehire.firebaseapp.com",
    projectId: "capstone-project-wehire",
    storageBucket: "capstone-project-wehire.appspot.com",
    messagingSenderId: "276929703073",
    appId: "1:276929703073:web:4bf6026bb285abbbde54e0",
    measurementId: "G-M39R4BX8SE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging();



export const requestPermission = async (callback) => {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log("Notification User Permission Granted");
            getToken(messaging,
                { vapidKey: 'BDKHLHFQ1ThY1oiED9MkNHxrXdLjD_sRVOXkjwL_EK4ras1rVkjYeVOP-swX8KtytrWAH_GnexnysOoNPtqPG68' })
                .then((currentToken) => {
                    if (currentToken) {
                        callback(currentToken);
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        callback(null);
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                    callback(null);
                });
        } else {
            console.log("User permission denied")
        }
    });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload)
        })
    })




