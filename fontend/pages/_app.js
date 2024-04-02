import "@/styles/globals.css";
import "@/styles/animation.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Layout from "./components/layout";
import ProtectedRoutes from "./components/protectedRoutes";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <ProtectedRoutes>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProtectedRoutes>
      <Footer />
    </>
  );
}
