import { firebaseAuth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(firebaseAuth, provider);
    console.log("userrr", user);
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
