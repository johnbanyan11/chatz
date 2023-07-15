import { useStateProvider } from "@/context/StateContext";
import React, { useEffect } from "react";

import dynamic from "next/dynamic";
const Container = dynamic(() => import("./Container"), { ssr: false });

function VideoCall() {
  const [{ currentChatUser, videoCall, socket, userInfo }] = useStateProvider();

  useEffect(() => {
    if (videoCall.type === "out-going") {
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.profileImage,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return (
    <div>
      <Container data={videoCall} />
    </div>
  );
}

export default VideoCall;
