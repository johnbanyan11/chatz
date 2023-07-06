import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";
import React from "react";

function onboarding() {
  const [{ userInfo }] = useStateProvider();

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="chatzz" width={200} height={200} />
        <span className="text-5xl">ChatZZ</span>
      </div>
      <h2 className="text-2xl">Create your Profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-cemter mt-5 gap-4">
          {userInfo?.name}
        </div>
      </div>
    </div>
  );
}

export default onboarding;
