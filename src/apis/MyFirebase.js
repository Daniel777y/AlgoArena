// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query, 
  where 
} from "firebase/firestore";

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

  me.getUser = async (email) => {
    const userDoc = await getDoc(doc(db, "user", email));
    if (userDoc.exists) {
      return userDoc.data();
    }
    return null;
  };

  me.addUser = async (user) => {
    try {
      await setDoc(doc(db, "user", user.email), user);
      return user;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  me.updateUser = async (user, newUser) => {
    try {
      await updateDoc(doc(db, "user", user.email), newUser);
      return newUser;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  me.deleteUser = async (email) => {
    try {
      await deleteDoc(doc(db, "user", email));
      return email;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  me.getAllAccounts = async (user) => {
    const accountsRef = query(collection(db, "account"), where("owner", "==", user.email || ""));
    return (await getDocs(accountsRef)).docs.map((doc) => doc.data());
  };

  me.addAccount = async (account) => {
    try {
      await setDoc(doc(db, "account", account.id), account);
      return account;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  me.deleteAccount = async (id) => {
    try {
      await deleteDoc(doc(db, "account", id));
      return id;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  me.deleteAllAccounts = async (email) => {
    try {
      const accountsRef = query(collection(db, "account"), where("owner", "==", email || ""));
      const accounts = (await getDocs(accountsRef)).docs.map((doc) => doc.data());
      console.log(accounts);
      accounts.forEach(async (account) => {
        await deleteDoc(doc(db, "account", account.id));
      });
      return accounts;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  return me;
};

const myFirebase = MyFirebase();

export default myFirebase;
