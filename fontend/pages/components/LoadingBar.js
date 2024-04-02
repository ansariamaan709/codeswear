import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 bg-blue-500 transition-all duration-300 ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    ></div>
  );
};

export default LoadingBar;
