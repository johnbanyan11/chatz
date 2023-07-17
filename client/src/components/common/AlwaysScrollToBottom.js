import { useEffect, useRef } from "react";

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export default AlwaysScrollToBottom;
