import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function login() {
  const router = useRouter();

  const [{}, dispatch] = useStateProvider();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      console.log("eeeeeee", name, email);
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log(data);
        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "",
            },
          });
          router.push("/onboarding");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="chatz" height={200} width={200} />
        <span>ChatZZ</span>
      </div>
      <button
        className="flex justify-center items-center gap-4 bg-search-input-container-background p-2 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle className="text-2xl" />
        <span className="text-white text-xl">Login with Google</span>
      </button>
    </div>
  );
}

export default login;
