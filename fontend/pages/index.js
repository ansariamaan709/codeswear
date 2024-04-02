import Image from "next/image";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="main-container">
      <h2>This is E-commerce Website</h2>
    </div>
  );
}
