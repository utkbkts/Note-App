import { useEffect, useState } from "react";
import usePostStore from "../store/Post";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import useAuthStore from "../store/Auth";

const userGetPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  const userauth = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  useEffect(() => {
    const getuserPost = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("createdBy", "==", userauth.uid)
        );
        const doc = await getDocs(q);
        const postArray = [];
        doc.forEach((d) => {
          postArray.push({ id: d.id, ...d.data() });
        });
        postArray.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(postArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (userauth) {
      getuserPost();
    }
  }, [setPosts, showToast, setIsLoading]);

  return { isLoading, posts };
};

export default userGetPost;
