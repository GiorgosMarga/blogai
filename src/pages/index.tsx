import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import Post from "~/components/Post";
import { PlusIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import PickedArticle from "~/components/PickedArticle";

const Home: NextPage = () => {
  const users = api.user.getUsers.useQuery()
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col  bg-gradient-to-b from-[#111827] to-[#15162c]">
        <Header/>
        <div className="flex h-full">
          <div className=" border-white/40 border-r flex p-10 pl-40 pr-16 pt-5 flex-col flex-grow">
            <div className="flex mb-10 sticky top-0 pt-4 z-10 bg-[#111827] text-white items-center justify-start space-x-10 border-b border-red-50 pb-5">
              <PlusIcon className="w-5 h-5 text-red-50"/>
              <p>For you</p>
              <p>Following</p>
            </div>
            <div className="flex flex-col">
              <Post/>
              <Post/>
              <Post/>
            </div>
          </div>
          <div className="flex-grow  w-[40%] p-10 hidden md:flex flex-col">
            <h2 className="text-white text-lg font-semibold">Monthly Best Articles</h2>
            <div className="flex flex-col">
              <PickedArticle/>
              <PickedArticle/>
              <PickedArticle/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
