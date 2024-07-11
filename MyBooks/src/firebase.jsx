import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDoc, addDoc, query, where, doc, FirestoreError, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJinDTorgkjymbqGqpm6z3V7gCrdlsL7M",
  authDomain: "bookify-9ef9f.firebaseapp.com",
  projectId: "bookify-9ef9f",
  storageBucket: "bookify-9ef9f.appspot.com",
  messagingSenderId: "391510433225",
  appId: "1:391510433225:web:ffae132af2499f6b7d9c18"
};

const app = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const signupUserWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
}

export const signinUserWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
}

const signinWithGoogle = () => {
  try {
    signInWithPopup(auth, googleProvider);
  } catch {
    console.error("error");
  }
}

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null);
      }
    })
  }, []);


  const handleCreateNewListing = async (name, price, isbn, cover) => {
    //to upload image of book cover.
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imageRef, cover);
    //to add details of book in the "books" collection
    return await addDoc(collection(firestore, 'books'), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      userDisplayName: user.displayName,
      photoURL: user.photoURL
    });
  };

  const listAllBooks = () => {
    return getDocs(collection(firestore, 'books'))
  }

  const getBookById = async (id) => {
    // const docRef = 
    const result = await getDoc(doc(firestore, 'books', id));
    return result;
  }

  const getImageURL = (path) => {
    const imageRef = ref(storage, path)
    return getDownloadURL(imageRef)
  }

  const formatTimestamp = (timestamp) => {
    const dateRef = new Date(timestamp);
    const options = { dateStyle: 'full', timeStyle: 'short' };
    const date = dateRef.toLocaleString(options);
    return date;
  }

  //to place order
  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const orderTime = Date.now();
    const formattedOrderTime = formatTimestamp(orderTime);
    console.log("user", user);
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      orderTime: formattedOrderTime,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    })
    console.log(formattedOrderTime)
  }

  //this function fetches the books that the user has posted. 
  const fetchMyBooks = async (userID) => {
    console.log(userID)
    const collectionRef = collection(firestore, 'books');
    const q = query(collectionRef, where('userID', '==', userID));
    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, 'books', bookId, 'orders');
    const result = await getDocs(collectionRef);
    console.log("orders", result)
    return result;
  }

  const isLoggedIn = user ? true : false;

  return <FirebaseContext.Provider value={{ user, isLoggedIn, getOrders, fetchMyBooks, placeOrder, getBookById, getImageURL, listAllBooks, handleCreateNewListing, signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, signinWithGoogle }}>{props.children}</FirebaseContext.Provider>

}