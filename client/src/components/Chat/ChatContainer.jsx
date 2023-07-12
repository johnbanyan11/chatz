import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";

import dynamic from "next/dynamic";
const VoiceMessage = dynamic(() => import("./VoiceMessage"), { ssr: false });

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }, dispatch] =
    useStateProvider();

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0"></div>
      <div className="mx-5 my-4 relative bottom-0 z-40 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((msg, index) => (
              <div
                key={msg?.id}
                className={`flex ${
                  msg.senderId === currentChatUser?.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {msg?.type === "text" && (
                  <div
                    className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                      msg.senderId === currentChatUser?.id
                        ? "bg-incoming-background"
                        : "bg-outgoing-background"
                    } `}
                  >
                    <span className="break-all">{msg?.message}</span>
                    <div className="flex gap-1 items-end">
                      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                        {calculateTime(msg?.createdAt)}
                      </span>
                      <span>
                        {msg?.senderId === userInfo?.id && (
                          <MessageStatus messageStatus={msg?.messageStatus} />
                        )}
                      </span>
                    </div>
                  </div>
                )}
                {msg?.type === "image" && <ImageMessage message={msg} />}
                {msg?.type === "audio" && <VoiceMessage message={msg} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
