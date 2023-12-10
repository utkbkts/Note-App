import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import useShowToast from "./useShowToast";
import { useNavigate } from "react-router-dom";

const useAdminLogin = () => {
  const showToast = useShowToast();
  const navigate = useNavigate()
  const adminLogin = async (email, password) => {
    try {
      const userResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userResponse.user) {
        localStorage.setItem("admin", JSON.stringify(userResponse.user));
      }
      navigate("/admindashboard")
      return userResponse.user;
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { adminLogin };
};

export default useAdminLogin;
