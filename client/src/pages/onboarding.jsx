import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import axios from "axios";
import Image from "next/image";

const onboarding = () => {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState(userInfo?.about || "");
  const [image, setImage] = useState("/default_avatar.png");
  console.log("rrrrrr", userInfo);

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push("/login");
    else if (!newUser && userInfo?.email) router.push("/");
  }, [newUser, userInfo]);

  const onBoardUser = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      try {
        console.log("iiiiii");
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data?.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data?.id,
              name,
              email,
              profileImage: image,
              about,
            },
          });
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="/whatsapp.gif" alt="chatzz" width={200} height={200} />
        <span className="text-5xl">ChatZZ</span>
      </div>
      <h2 className="text-2xl">Create your Profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col  justify-cemter mt-5 gap-4">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-start justify-start mt-2">
            <button
              className="gap-4 bg-search-input-container-background p-2 rounded-lg"
              onClick={onBoardUser}
            >
              Create
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
};

export default onboarding;
