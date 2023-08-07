import React from "react";
import { Header, Footer } from ".";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col justify-between !h-screen"
    >
      <Header />
      {children}
      {(router.route != "/login" && router.route != "/signup" && !router.route.includes('/password-reset')) ? <Footer /> : <div className=""></div>}
    </div>
  );
};

export default Layout;
