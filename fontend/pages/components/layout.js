import { Router, useRouter } from "next/router";
import { useEffect } from "react";

function Layout({ children }) {
  const router = useRouter();

  const updateLastActivityTime = () => {
    localStorage.setItem("lastActivityTime", new Date().getTime());
  };

  const checkInactivityAndInvalidateToken = () => {
    const lastActivityTime = localStorage.getItem("lastActivityTime");
    if (lastActivityTime) {
      const currentTime = new Date().getTime();
      const inactiveDuration = currentTime - parseInt(lastActivityTime, 10);
      if (inactiveDuration > 30 * 60 * 1000) {
        localStorage.clear();
        router.push("/components/login");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", updateLastActivityTime);
    document.addEventListener("keydown", updateLastActivityTime);
    const intervalId = setInterval(checkInactivityAndInvalidateToken, 60000);
    return () => {
      document.removeEventListener("click", updateLastActivityTime);
      document.removeEventListener("keydown", updateLastActivityTime);
      clearInterval(intervalId);
    };
  }, []);

  return <div className="page-transition">{children}</div>;
}

export default Layout;
