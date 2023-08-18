import React, { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import { Categories, PostCard, PostWidgets } from "../components";
import { FeaturedPosts } from "../sections";
import postStyles from "../components/post-styles.module.css";
import Modal from "react-responsive-modal";
import {
  getBlogList,
  getDecisionList,
  getDownloadsById,
  membershipDetails,
} from "../services";
import { queryKeys } from "../constants/query-keys";
import { dehydrate, useQuery } from "react-query";
import useDebounce from "../utility/useDebounce";
import { queryClient } from "../react-query/queryClient";
import { checkIsNoob, handelPagination } from "../utility/functions";
import { AdsContainer } from "../components/AdsContainer";
import DigitalOcean from "../components/DigitalOcean";
import TakenDown from "../components/TakenDown";
import HowToDownload from "../components/HowToDownload";
import {
  getModal,
  getStoredUser,
  setModal,
  updateModal,
} from "../utility/localStorage";
import CrossSell from "../components/CrossSell";
import TelegramCard from "../components/Telegram";
// import PromoteOnSidebar from "../components/PromoteOnSidebar";

export default function Home() {
  const initialRenderRef = useRef(true);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState("1");
  const [noob, setNoob] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [user, setUser] = useState(null);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    if (!!searchValue) {
      setPageNumber(1);
    }
  }, [searchValue]);

  useEffect(() => {
    const modalState = getModal();
    if (initialRenderRef.current) {
      // modal logic if modal not there set this for first time with isOpen true
      if (!modalState) {
        // if initially null then set with isCompleted:false & isOpen:True
        setModal({ isCompleted: false, isOpen: true });
        setModalFlag(true);
      } else if (modalState.isCompleted) {
        // if modal is completed then i need to set is open to false so that on refresh modal should not reopen
        updateModal(true, false);
        setModalFlag(false);
      } else if (!modalState.isCompleted) {
        // if user has not filled modal then we need to ask them again to fill the modal so isOpen is true
        updateModal(false, true);
        setModalFlag(true);
      }

      let isNoob = checkIsNoob();
      setNoob(isNoob);
      // modalHandler(true);

      // get stored user data based on that show premium plans
      async function fetchData() {
        const storedUser = getStoredUser();
        if (!storedUser) {
        } else {
          const response = await membershipDetails();
          const updatedData = response.data;
          setUser({ ...storedUser, ...updatedData });
        }
      }
      fetchData();
    }
    initialRenderRef.current = false;
  }, []);

  useMemo(() => {
    const modalState = getModal();
    if (modalState) {
      setModalFlag(modalState.isOpen);
    }
  }, [getModal, updateModal]);

  const { data, error, isError, isLoading } = useQuery(
    [queryKeys.BLOGS, debouncedSearchValue, pageNumber],
    () => getBlogList(debouncedSearchValue, pageNumber),
    {
      staleTime: Infinity,
    }
  );

  const onModalClose = () => {
    // if modal is closed without being selected then close isOpen false
    updateModal(false, false);
    setModalFlag(false);
  };

  return (
    <div className="container mt-28 sm:mt-20 mx-auto px-4 sm:px-10 mb-8 relative">
      <Head>
        <title>CheapUniverse</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="CheapUniverse helps you to get exciting & cool resources at lowest price"
        />
        <meta property="og:url" content={process.env.SITE_URL} key="ogurl" />
        <meta
          property="og:site_name"
          content="cheapuniverse.org"
          key="ogsitename"
        />
        <meta property="og:title" content="CheapUniverse" key="ogtitle" />
        <meta
          property="og:description"
          content="CheapUniverse helps you to get exciting & cool resources at lowest price"
          key="ogdesc"
        />
      </Head>
      <div className={`searchBox ${postStyles.searchBox}`}>
        <input
          className={`searchInput ${postStyles.searchInput}`}
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          aria-label="Search button"
          className={`searchButton ${postStyles.searchButton}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {!searchValue && <FeaturedPosts fromHome />}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="lg:col-span-8 col-span-1 grid grid-cols-1 lg:grid-cols-2 sm:gap-5 grid-flow-row auto-rows-max relative pb-12">
          {data &&
            data?.results &&
            data?.results.map((post, ind) => {
              return (
                <div key={post.slug + ind}>
                  <PostCard post={post} key={post.slug} />
                  <div className="mb-4">
                    <AdsContainer
                      client={"ca-pub-2093009960356176"}
                      slot={"9894549506"}
                      adFormat={"fluid"}
                      data-ad-layout-key="-6i+cz+4x-i-7k"
                      style={{
                        display: "block",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                </div>
              );
            })}

          <div className="-my-2 flex justify-content absolute bottom-0 left-1/2  transform -translate-x-1/2 ">
            <button
              areal-label="Previous"
              disabled={!Boolean(data?.previous)}
              onClick={() => handelPagination(data?.previous, setPageNumber)}
              className="hover:ring-2 hover:ring-offset-1 font-semibold focus:ring-white focus:ring-2 focus:ring-offset-1 hover:ring-white focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out  rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
            >
              Previous
            </button>
            <button
              areal-label="Next"
              disabled={!Boolean(data?.next)}
              onClick={() => handelPagination(data?.next, setPageNumber)}
              className="hover:ring-2 hover:ring-offset-1 font-semibold hover:ring-white focus:ring-white focus:ring-2 focus:ring-offset-1 focus:bg-black focus:outline-none hover:scale-95  w-full sm:w-auto bg-black transition duration-150 ease-in-out rounded text-white px-8 py-3 text-sm mt-6 m-1 disabled:bg-gray-400 disabled:text-black"
            >
              Next
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 col-span-1 ">
          <div className="lg:sticky relative top-8">
            {/* <PromoteOnSidebar /> */}
            {!user && !noob ? (
              <CrossSell />
            ) : user.role != "P" ? (
              <CrossSell />
            ) : (
              <></>
            )}
            {/* {!noob && (user.role != "P") ? <CrossSell /> : <></>} */}
            {/* {!noob ? <Contribution /> : <></>} */}
            <TelegramCard />
            {!noob ? <HowToDownload /> : <></>}
            <DigitalOcean />
            <div className="rounded-lg my-4">
              <AdsContainer
                client={"ca-pub-2093009960356176"}
                slot={"7095168689"}
                adFormat={"auto"}
                data-full-width-responsive="true"
                style={{ display: "block" }}
              />
            </div>
            <PostWidgets />
            <TakenDown />
            <Categories />
          </div>
        </div>
      </div>

      <div className="rounded-lg my-4">
        <AdsContainer
          client={"ca-pub-2093009960356176"}
          slot={"6341267557"}
          adFormat={"autorelaxed"}
        />
      </div>

      {modalFlag && (
        <Modal
          classNames={{
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
          animationDuration={500}
          // open={modalFlag}
          open={false}
          onClose={onModalClose}
          showCloseIcon={false}
          styles={{
            modal: {
              background: "",
              borderRadius: "20px",
            },
          }}
        >
          <div className="h-full w-full" id="modal">
            <div
              role="alert"
              className="container mx-auto max-w-lg flex justify-center"
            >
              <div className="relative w-full h-full bg-white shadow rounded-lg">
                <div className="flex flex-col items-center pt-8 pb-6 px-7 sm:px-14 text-base">
                  <p className="text-2xl font-bold leading-6 text-gray-800 text-center">
                    Time to say GoodBye 😞
                  </p>
                  <p className="text-sm text-center mt-4 text-gray-600 leading-6">
                    <span className="text-black font-bold text-sm">
                      Thank you for the tremendous support you've shown
                    </span>
                    <br />
                    <span className="text-[#FF1E00] font-bold text-sm">
                      This forum will be closed by september month, so you guys
                      can take backup for all the courses...
                    </span>
                  </p>
                </div>
                <div className="flex items-center justify-center py-6 bg-gray-100 rounded-bl rounded-br">
                  <p className="text-center">
                    Fir milenge chalte chalte....🙂{" "}
                  </p>
                </div>
                <div
                  className="cursor-pointer absolute top-0 right-0 m-3 text-gray-800 transition duration-150 ease-in-out"
                  onClick={onModalClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                    className="icon icon-tabler icon-tabler-x"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  await queryClient.prefetchQuery([queryKeys.BLOGS], () =>
    getBlogList("", "1")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
