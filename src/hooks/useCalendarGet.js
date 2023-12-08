import { collection, getDocs, query, where } from "firebase/firestore";
import useAuthStore from "../store/Auth";
import { db } from "../firebase/config";
import usePostStore from "../store/Post";
import useShowToast from "./useShowToast";
import { useEffect, useState } from "react";

const getUserCalendar = () => {
  const authUser = useAuthStore((state) => state.user);
  const [Calendar, setCalendar] = useState([]);
  const showToast = useShowToast();
  useEffect(() => {
    const calendarget = async () => {
      try {
        const q = query(
          collection(db, "calendar"),
          where("createdBy", "==", authUser.uid)
        );
        const doc = await getDocs(q);
        const postArray = [];
        doc.forEach((d) => {
          postArray.push({ id: d.id, ...d.data() });
        });
        postArray.sort((a, b) => b.createdBy - a.createdBy);
        setCalendar(postArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
        showToast("Error", error.message, "error");
        setCalendar([]);
      }
    };
    if (authUser) {
      calendarget();
    }
  }, [setCalendar, showToast]);
  return { Calendar };
};

export default getUserCalendar;
