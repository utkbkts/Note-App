import { useEffect, useState } from "react";
import useAuthStore from "../store/Auth";
import usePostStore from "../store/Post";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase/config";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const CreatePost = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost);
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

  const handleCreatePost = async (Form,selectedFile) => {
    setIsUpdating(true);
    const newPost = {
      title: Form.title,
      select: Form.select,
      caption: Form.caption,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      createdAuthor: authUser.username,
      completed: false,
    };

    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);
      const userdocRef = doc(db, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${docRef.id}`);
      await updateDoc(userdocRef, { posts: arrayUnion(docRef.id) });
      await uploadString(imageRef, selectedFile,"data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(docRef, { imageURL: downloadURL });
      newPost.imageURL = downloadURL;

      createPost({ ...newPost, id: docRef.id });
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
  };
  return { handleCreatePost, isUpdating };
};

export default CreatePost;
