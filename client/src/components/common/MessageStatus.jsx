import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({ messageStatus }) {
  return (
    <div className="ml-1">
      {messageStatus === "sent" && <BsCheck className="text-lg" />}
      {messageStatus === "delivered" && <BsCheckAll className="text-lg" />}
      {messageStatus === "read" && (
        <BsCheckAll className="text-lg text-icon-ack" />
      )}
    </div>
  );
}

export default MessageStatus;
