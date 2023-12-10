import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";

const Admindashboard = () => {
  const showToast = useShowToast();
  const navigate = useNavigate()
  const adminpage = async (email, password) => {
    try {
      const userResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userResponse) {
        showToast("Error", error.message, "error");
        return;
      }
      const user = auth.currentUser;
      if (user && user.email === "utku@gmail.com") {
        if (userResponse.user) {
          localStorage.setItem("admin", JSON.stringify(userResponse.user));
        }
        showToast("Logged in successfully");
        navigate("/adminlogin")
        return userResponse.user;
      } else {
        showToast("Invalid email or password");
        return;
      }
    } catch (error) {
        showToast("Error",error.message,"error")
    }
  };
  return{adminpage}
};

export default Admindashboard;
