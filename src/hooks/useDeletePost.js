import { deleteObject, ref } from "firebase/storage";
import { auth, db, storage } from "../firebase/config";
import usePostStore from "../store/Post";
import useShowToast from "./useShowToast";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const DeletePost = () => {
  const deletePost = usePostStore((state) => state.deletePost);
  const showToast = useShowToast();
  const [User, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const deletePostGet = async (post) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const docRef = doc(db, "posts", post.id);
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);

      const userRef = doc(db, "users", User.uid);
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      await deleteDoc(docRef);

      deletePost(post.id);
      showToast("Success", "Deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { deletePostGet };
};

export default DeletePost;
