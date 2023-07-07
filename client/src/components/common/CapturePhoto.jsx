import React from "react";
import { IoClose } from "react-icons/io5";

function CapturePhoto({ setCapture, setImage }) {
  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 gap-3 rounded-lg pt-2 flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end"
          onClick={() => setCapture(false)}
        >
          <IoClose className="h-5 w-5 cursor-pointer" />
        </div>
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}

export default CapturePhoto;
