import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBGxtQ6eiP2VMXxTAf_0TUbfcqti7IpAg0',
  authDomain: 'learn-cambridge-audio.firebaseapp.com',
  databaseURL: 'https://learn-cambridge-audio.firebaseio.com',
  projectId: 'learn-cambridge-audio',
  storageBucket: 'learn-cambridge-audio.appspot.com',
  messagingSenderId: '560250567729',
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const firebaseAuth = firebase.auth();
export const database = firebase.database();
