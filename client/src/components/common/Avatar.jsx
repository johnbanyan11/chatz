import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FcCompactCamera } from "react-icons/fc";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

const Avatar = ({ type, image, setImage }) => {
  const [hover, setHover] = useState(false);
  const [ismenuOpen, setIsMenuOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState({
    x: 0,
    y: 0,
  });
  const [grabpic, setGrabpic] = useState(false);
  const [picLibrary, setPicLibrary] = useState(false);
  const [capture, setCapture] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();
    setMenuCoords({ x: e.pageX, y: e.pageY });
    setIsMenuOpen(true);
  };

  useEffect(() => {
    if (grabpic) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabpic(false);
        }, 1000);
      };
    }
  }, [grabpic]);

  const menuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setCapture(true);
      },
    },
    {
      name: "Choose from Library",
      callback: () => {
        setPicLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabpic(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  const getPic = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (e) {
      data.src = e.target.result;
      data.setAttribute("data-src", e.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      console.log(data.src);
      setImage(data.src);
    }, 100);
  };

  return (
    <div className="flex items-center justify-center">
      {type === "sm" && (
        <div className="relative h-10 w-10">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
      )}
      {type === "lg" && (
        <div className="relative h-14 w-14">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
      )}
      {type === "xl" && image && (
        <div
          className="relative cursor-pointer z-0"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            id="context-opener"
            className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex flex-col gap-2 items-center justify-center ${
              hover ? "visible" : "hidden"
            }`}
            onClick={(e) => openMenu(e)}
          >
            <FcCompactCamera
              id="context-opener"
              className="text-2xl"
              onClick={(e) => openMenu(e)}
            />
            <span id="context-opener" onClick={(e) => openMenu(e)}>
              Change <br /> Profile <br /> Photo
            </span>
          </div>
          <div className="flex items-center justify-center h-60 w-60 ">
            <Image
              src={image}
              alt="avatar"
              className="rounded-full object-contain"
              fill
            />
          </div>
        </div>
      )}
      {ismenuOpen && (
        <ContextMenu
          options={menuOptions}
          coords={menuCoords}
          menu={ismenuOpen}
          setMenu={setIsMenuOpen}
        />
      )}
      {capture && <CapturePhoto setImage={setImage} setCapture={setCapture} />}
      {picLibrary && (
        <PhotoLibrary setImage={setImage} hidePhotoLibrary={setPicLibrary} />
      )}
      {grabpic && <PhotoPicker onChange={getPic} />}
    </div>
  );
};

export default Avatar;
