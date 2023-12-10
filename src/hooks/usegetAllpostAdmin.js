import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";


const useGetAllAdminPosts = () => {
  const showToast = useShowToast();
  const [Posts,setPosts]=useState([])
  useEffect(() => {
    const getuserPost = async () => {
      try {
        const q = collection(db, "posts"); 
        const docs = await getDocs(q);
        const postArray = [];
        docs.forEach((d) => {
          postArray.push({ id: d.id, ...d.data() });
        });
        setPosts(postArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getuserPost()
  }, []);

  return {Posts};
};

export default useGetAllAdminPosts;
