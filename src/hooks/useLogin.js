import { useNavigate } from "react-router-dom";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/Auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

const useLogin = () => {
  const showtoast = useShowToast();
  const navigate = useNavigate();
  const userLogin = useAuthStore((state) => state.login);

  const login = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const provider = await signInWithPopup(auth, googleProvider);

      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("uid", "==", provider.user.uid));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.size > 0) {
        const userDoc = querySnapshot.docs[0].data();
        localStorage.setItem("user", JSON.stringify(userDoc));
        userLogin(userDoc);
        navigate("/");
      } else {
        const newUserDoc = {
          uid: provider.user.uid,
          email: provider.user.email,
          username: provider.user.displayName,
          bio: "",
          profilePicURL: "",
          posts: [],
          createdAt: Date.now(),
          calendar: []
        };

        await setDoc(doc(db, "users", provider.user.uid), newUserDoc);
        localStorage.setItem("user", JSON.stringify(newUserDoc));
        userLogin(newUserDoc);
        navigate("/");
      }
    } catch (error) {
      showtoast("Error", error.message, "error");
    }
  };

  return { login };
};

export default useLogin;
