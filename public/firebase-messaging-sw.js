// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCmSi7on6iSZ4OP4V7b7ZEsDw3Cb1GVeTU",
    authDomain: "capstone-project-wehire.firebaseapp.com",
    projectId: "capstone-project-wehire",
    storageBucket: "capstone-project-wehire.appspot.com",
    messagingSenderId: "276929703073",
    appId: "1:276929703073:web:4bf6026bb285abbbde54e0",
    measurementId: "G-M39R4BX8SE"
}

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()


messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // Gửi thông điệp đến các thành phần khác của ứng dụng
    const channel = new BroadcastChannel('notificationChannel');
    channel.postMessage({ title: notificationTitle, options: notificationOptions });
});