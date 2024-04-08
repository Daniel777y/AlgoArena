// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, getDocs } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

const MyFirebase = () => {
  const me = {};

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCKpEJPVx1pBKl-MdB9NCd-V_BaDdnBDXY",
    authDomain: "algoarena-4df43.firebaseapp.com",
    projectId: "algoarena-4df43",
    storageBucket: "algoarena-4df43.appspot.com",
    messagingSenderId: "876512992319",
    appId: "1:876512992319:web:0cec91fe18bdb2d295ac8a",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  me.getAllUsers = async () => {
    const usersRef = collection(db, "user");
    return (await getDocs(usersRef)).docs.map((doc) => doc.data());
  };

  me.getUser = async (user) => {
  };

  me.AddUser = async (user) => {
  };

  me.updateUser = async (user) => {
  };

  me.deleteUser = async (email) => {
  };

  me.getAllAccounts = async (user) => {
    console.log(user);
  };

  me.addAccount = async (user, account) => {
  };

  me.deleteAccount = async (user, account) => {
  };

  return me;
};

const myFirebase = MyFirebase();

export default myFirebase;
