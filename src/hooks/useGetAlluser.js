import useShowToast from './useShowToast';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useState, useEffect } from 'react';  // Import useEffect for triggering the data retrieval

const useGetAlluser = () => {
    const showToast = useShowToast();
    const [GetUser, setGetUser] = useState([]);

    useEffect(() => {
        const userGet = async () => {
            try {
                const userCollection = collection(db, "users");
                const querySnapshot = await getDocs(userCollection);

                const newArray = [];
                querySnapshot.forEach((doc) => {
                    newArray.push({ ...doc.data(), id: doc.id });
                });

                setGetUser(newArray);
            } catch (error) {
                console.error("Error fetching users:", error);
                showToast("Error fetching users"); 
            }
        };

        userGet();  
    }, [showToast]);  

    return { GetUser };
};

export default useGetAlluser;
