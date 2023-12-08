import { useState } from "react";
import useAuthStore from "../store/Auth";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  const showToast = useShowToast();

  const editProfile = async (user, bio, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(db, "users", authUser.uid);

    let URL = "";

    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }
      const updateUser = {
        ...authUser,
        username: user || authUser?.username,
        bio: bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };
      await updateDoc(userDocRef, updateUser);
      localStorage.setItem("user", JSON.stringify(updateUser));
      setAuthUser(updateUser);
      showToast("Success", "Profile updated successfully", "success");
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
      setIsUpdating(false);
    }
  };
  return { editProfile, isUpdating };
};

export default useEditProfile;
