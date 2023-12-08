import { addDoc, collection, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/config";
import useAuthStore from "../store/Auth";
import { useState } from "react";
import usePostStore from "../store/Post";

const useCalendar = () => {
  const calendarPosts = usePostStore((state) => state.calendarPosts);
  const authUser = useAuthStore((state) => state.user);
  const addEventToCalendar = async (selected) => {
  
    const newEvent = {
      title: selected.title,
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
      createdBy: authUser.uid,

    };
    try {
      const docRef = await addDoc(collection(db, "calendar"), newEvent);
      const userdocRef = doc(db, "users", authUser.uid);
      await updateDoc(userdocRef, { calendar: arrayUnion(docRef.id) });
      calendarPosts({ ...newEvent, id: docRef.id });

    } catch (error) {
      console.log(error);
    }
  };

  const removeEventFromCalendar = async (eventId) => {
    try {
      const eventRef = doc(db, "calendar", eventId);
      await updateDoc(eventRef, { isDeleted: true });
    } catch (error) {
      console.log(error);
    }
  };

  return { addEventToCalendar, removeEventFromCalendar };
};

export default useCalendar;