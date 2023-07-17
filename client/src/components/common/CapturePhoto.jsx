import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

function CapturePhoto({ setCapture, setImage }) {
  const videoRef = useRef();

  useEffect(() => {
    let stream;
    const streamCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
    };
    streamCamera();
    return () => {
      stream?.getTracks().forEach((track) => track?.stop());
    };
  }, []);

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 300, 150);
    setImage(canvas.toDataURL("image/jpeg"));
    setCapture(false);
  };

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
          onClick={() => setCapture(false)}
        >
          <IoClose className="h-5 w-5 cursor-pointer" />
        </div>
        <div className="flex justify-center">
          <video id="video" width="400" autoPlay ref={videoRef}></video>
        </div>
        <button
          className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2"
          onClick={capturePhoto}
        ></button>
      </div>
    </div>
  );
}

export default CapturePhoto;
