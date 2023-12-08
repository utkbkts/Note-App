import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import useShowToast from "./useShowToast";
import usePostStore from "../store/Post";

const useCompletedPost = () => {
  const showToast = useShowToast();
  const setPosts = usePostStore((state) => state.setPosts);
  const handleClick = async (postId) => {
    if (!window.confirm("Mark as completed?")) return;

    try {
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const currentCompletedStatus = postSnapshot.data().completed;
        const newCompletedStatus = !currentCompletedStatus;
        await updateDoc(postRef, { completed: newCompletedStatus });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      showToast("Error", "Failed to update post", "error");
    }
  };

  return { handleClick };
};

export default useCompletedPost;
