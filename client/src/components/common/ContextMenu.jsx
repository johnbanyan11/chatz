import React, { useEffect, useRef } from "react";

function ContextMenu({ options, coords, menu, setMenu }) {
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (e.target.id !== "context-opener") {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    }
  };

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setMenu(false);
    callback();
  };

  return (
    <div
      style={{ top: coords.y, left: coords.x }}
      className={`bg-dropdown-background fixed py-2 z-[100]`}
      ref={menuRef}
    >
      <ul>
        {options.map(({ name, callback }) => (
          <li
            key={name}
            className="px-5 py-2 cursor-pointer hover:bg-background-default-hover"
            onClick={(e) => handleClick(e, callback)}
          >
            <span className="text-white">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
