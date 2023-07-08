import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="border-conversation-border border-l w-full bg-panel-header-background flex flex-col justify-center items-center h-[100vh] border-b-4 border-b-icon-green items">
      <Image src="/whatsapp.gif" alt="whatsapp" width={200} height={200} />
    </div>
  );
}

export default Empty;
