import RNFirebase from '@react-native-firebase/app'
let firebaseConfig = {
    apiKey: "AIzaSyAIqAofhxedM-l8JpcaFWkA1l4y622o5OE",
    authDomain: "jobportal-65f01.firebaseapp.com",
    databaseURL: "https://jobportal-65f01.firebaseio.com",
    projectId: "jobportal-65f01",
    storageBucket: "jobportal-65f01.appspot.com",
    messagingSenderId: "689147985712",
    appId: "1:689147985712:web:162560c879d7a546f8d2f5",
    measurementId: "G-M2VB2CXNXK"
};

if (!RNFirebase.apps.length) {
    // Initialize Firebase
    RNFirebase.initializeApp(firebaseConfig);
}


export default RNFirebase;
