import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState } from "react";

const useGetDetail = () => {
    const [detailpost, setDetailPost] = useState([]);
  
    const getDetail = async (localId) => {
      try {
        const docRef = doc(collection(db, "posts"), localId);
        const blogDetail = await getDoc(docRef);
  
        if (blogDetail.exists()) {
          const data = { ...blogDetail.data(), id: blogDetail.id };
          setDetailPost([data]);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      }
    };
  
    return { getDetail, detailpost };
  };
  
  export default useGetDetail;