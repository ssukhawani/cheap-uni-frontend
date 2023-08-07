import React, { useState } from "react";
import ResetPassword from "../components/ResetPassword";
import Head from "next/head";

const ForgotPassword = () => {
  const [resetObj, setResetObj] = useState({
    email: "",
  });

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content={"Forgot password"} />
      </Head>
      <div className="h-[78vh] w-full">
        <ResetPassword
          title={"Forgot Password"}
          resetObj={resetObj}
          setResetObj={setResetObj}
        />
      </div>
    </>
  );
};

export default ForgotPassword;
