import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from   'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDwcoZIjObkb-vgeSoinTBygHUXp-icZNk",
    authDomain: "crwn-clothing-db-a9ee5.firebaseapp.com",
    projectId: "crwn-clothing-db-a9ee5",
    storageBucket: "crwn-clothing-db-a9ee5.appspot.com",
    messagingSenderId: "187200051639",
    appId: "1:187200051639:web:6b27e26b631e62247a7032"
};

const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {} ) =>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);

     console.log(userSnapShot.exists());

     if(!userSnapShot.exists()){
         const {displayName, email } = userAuth;
         const createdAt = new Date();
         try {
             await setDoc (
                 userDocRef, {
                     displayName,
                     email,
                     createdAt,
                     ...additionalInformation,
                 }
             );
         }catch (error){
             console.log('error creating the user', error.message);
         }
     }
     return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
