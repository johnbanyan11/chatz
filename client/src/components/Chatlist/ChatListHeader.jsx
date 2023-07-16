import { useStateProvider } from "@/context/StateContext";
import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";
import ContextMenu from "../common/ContextMenu";
import { useRouter } from "next/router";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter();

  const [contextMenuCoords, setContextMenuCoords] = useState({
    x: 0,
    y: 0,
  });
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoords({ x: e.pageX - 50, y: e.pageY + 20 });
    setIsMenuVisible(true);
  };

  const menuOptions = [
    {
      name: "Logout",
      callback: async () => {
        setIsMenuVisible(false);
        router.push("/logout");
        // dispatch({ type: reducerCases.SET_EXIT_CHAT });
      },
    },
  ];

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          title="New Chat"
          className="text-panel-header-icon cursor-pointer text-xl"
          onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })}
        />
        <>
          <BsThreeDotsVertical
            title="Menu"
            className="text-panel-header-icon cursor-pointer text-xl"
            id="context-opener"
            onClick={(e) => showContextMenu(e)}
          />
          {isMenuVisible && (
            <ContextMenu
              options={menuOptions}
              coords={contextMenuCoords}
              menu={isMenuVisible}
              setMenu={setIsMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
