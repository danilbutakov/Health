import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDQ3Bpp_yd7tiEEazPSjXwLAYIOjbAOEBY',
	authDomain: 'health-ef5e5.firebaseapp.com',
	projectId: 'health-ef5e5',
	storageBucket: 'health-ef5e5.appspot.com',
	messagingSenderId: '286021830709',
	appId: '1:286021830709:web:d24c1a776ab2e8c77d097c',
	measurementId: 'G-8BQRQM6D2Z'
};

const app = initializeApp(firebaseConfig);
export const fs = initializeFirestore(app, {
	experimentalForceLongPolling: true
});
