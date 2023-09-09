import React from "react";
import { Header, Footer } from ".";
import { useRouter } from "next/router";
import { excludeFooter } from "../constants/misc";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div
      className={`flex flex-col justify-between`}
    >
      <Header />
      {children}
      {(!excludeFooter.includes(router.route) && !router.route.includes('/password-reset')) ? <Footer /> : <div className=""></div>}
    </div>
  );
};

export default Layout;
