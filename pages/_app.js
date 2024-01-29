import "tailwindcss/tailwind.css";
import { Layout } from "../components";

import "../styles/globals.scss";
import "react-responsive-modal/styles.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OneSignal from "react-onesignal";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { mainAxios } from "../interceptor/instance";
import { setupInterceptorsTo } from "../interceptor/Interceptors";
import { QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "../react-query/queryClient";
import MaintenancePage from "../components/MaintenancePage";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  setupInterceptorsTo(mainAxios, router);

  useEffect(() => {
    OneSignal.init({
      appId: "31a1511d-89f6-46ae-b6ba-46b194f13053",
    });
  }, []);
  const isMaintenance = false;
  return (
    <>
      {isMaintenance ? (
        <MaintenancePage />
      ) : (
        <>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ReactQueryDevtools position={"bottom-right"} />
            </Hydrate>
          </QueryClientProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            style={{
              width: "fit-content",
            }}
            limit={3}
          />
        </>
      )}
    </>
  );
}

export default MyApp;
