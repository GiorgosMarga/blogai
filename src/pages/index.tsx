import { type NextPage } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import Post from "~/components/Post";
import { PlusIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";
import PickedArticle from "~/components/PickedArticle";
import LoadingPost from "~/components/LoadingPost";
import { useEffect } from "react";
import { userAtom } from "~/atoms/userAtom";
import { useSetRecoilState } from "recoil";
const Home: NextPage = () => {
  const userId = api.user.whoIs.useQuery(
    {},
    { retry: false, staleTime: Infinity, refetchOnMount: "always" }
  );
  const posts = api.post.getPosts.useQuery(
    {},
    { staleTime: 500000, refetchOnMount: "always" }
  );
  const setUserId = useSetRecoilState(userAtom);

  useEffect(() => {
    if (userId.data) setUserId(userId.data.id);
    if (userId.error) setUserId("");
  }, [userId]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col  bg-gradient-to-b from-[#111827] to-[#15162c]">
        <Header />
        <div className="flex h-full flex-grow ">
          <div className=" flex min-w-[80%] flex-col border-r border-white/40  p-10 pl-40 pr-16 pt-5">
            <div className="sticky top-0 z-10 mb-10 flex items-center justify-start space-x-10 border-b border-red-50 bg-[#111827] pb-5 pt-4 text-white">
              <PlusIcon className="h-5 w-5 text-red-50" />
              <p>For you</p>
              <p>Following</p>
            </div>
            <div className="flex  flex-grow flex-col">
              {posts.data ? (
                posts.data.map((post) => {
                  return (
                    <Post
                      id={post.id}
                      key={post.id}
                      content={post.content}
                      title={post.title}
                      createdAt={post.updatedAt}
                      creator={post.user.fullName}
                      tag={post.tags[0]}
                      creatorId={post.userId}
                    />
                  );
                })
              ) : (
                <>
                  <LoadingPost />
                  <LoadingPost />
                  <LoadingPost />
                </>
              )}
            </div>
          </div>
          <div className="hidden  flex-col p-10 lg:flex lg:w-[50%]">
            <h2 className="text-lg font-semibold text-white">
              Monthly Best Articles
            </h2>
            <div className="flex flex-col">
              <PickedArticle />
              <PickedArticle />
              <PickedArticle />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
