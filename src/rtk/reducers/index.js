import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { setUser } from "./userReducer";
import { getProducts, loading } from "./productReducer";
import { getUserOrder, setLoading } from "./userOrderReducer";

export const registerUser = (email, password) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const signInUser = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(setUser(user));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export function postProductsAPI(payload) {
  return (dispatch) => {
    dispatch(loading(true));
    const storageRef = ref(storage, `images/${payload.image.name}`);
    const uploadRef = uploadBytesResumable(storageRef, payload.image);
    uploadRef.on(
      "state_changed",
      (snapshot) => {
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadRef.snapshot.ref).then((downloadURL) => {
          const collRef = collection(db, "products");
          addDoc(collRef, {
            actor: {
              date: payload.timestamp,
            },
            comments: 0,
            shareImage: downloadURL,
            description: payload.description,
            price: payload.price,
            discount: payload.discount,
            total: payload.total,
            count: payload.count,
            category: payload.category,
            color:false,
          });
        });
        dispatch(loading(false));
      }
    );
  };
}

export function getProductsAPI() {
  return (dispatch) => {
    let payload;
    const collRef = collection(db, "products");
    const orderedRef = query(collRef, orderBy("actor.date", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      payload = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(getProducts(payload));
    });
  };
}

export function postUserOrderAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    const collRef = collection(db, "orders");
    addDoc(collRef, {
        actor: {
            date: payload.timestamp,
        },
        comments: 0,
        subTotal: payload.subTotal,
        sizeOption: payload.size,
        userInfo: payload.userInfo ,
        productDetails: payload.cart,
    });
    dispatch(setLoading(false));
  };
}

export function getUserOrderAPI() {
  return (dispatch) => {
    let payload;
    const collRef = collection(db, "orders");
    const orderedRef = query(collRef, orderBy("actor.date", "desc"));
    onSnapshot(orderedRef, (snapshot) => {
      payload = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(getUserOrder(payload));
    });
  };
}
