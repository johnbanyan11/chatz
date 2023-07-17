import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE, ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

function login() {
  const router = useRouter();

  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      // console.log("eeeeeee", name, email);
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        // console.log(data);
        if (!data?.status) {
          // console.log("false ");
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              about: "",
            },
          });
          router.push("/onboarding");
        } else {
          const {
            id,
            name,
            email,
            profilePicture: profileImage,
            about,
          } = data?.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              about,
            },
          });
          router.push("/");
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
        className="flex justify-center items-center gap-4 bg-search-input-container-background px-4 py-3 rounded-lg"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-2xl" />
        <span className="text-white text-xl">Login with Google</span>
      </button>
      {/* <h3>OR </h3>

      <button
        className="flex justify-center items-center gap-4 bg-search-input-container-background px-4 py-3 rounded-lg"
        onClick={() => {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          router.push("/onboarding");
        }}
      >
        <BiLogoGmail className="text-red-600" />
        <span className="text-white text-xl">Register with Gmail</span>
      </button> */}
    </div>
  );
}

export default login;
