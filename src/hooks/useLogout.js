import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import useShowToast from "./useShowToast";

const useLogout = () => {
const showtoast = useShowToast()
    const Logout = async () =>{
        try {
            signOut(auth)
            localStorage.removeItem("user")
            showtoast("Success","Log out successfully","success")
        } catch (error) {
            showtoast("Error",error.message,"error")
        }
    }
    return {Logout}
}

export default useLogout;