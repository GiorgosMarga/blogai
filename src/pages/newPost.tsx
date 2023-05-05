import { NextPage } from "next";
import Head from "next/head";
import { useState , useEffect} from "react";
import MarkdownEditor from "~/components/MarkdownEditor";
import { api } from "~/utils/api";
import MyModal from "~/components/MyModal";
const NewPost: NextPage = () => {
    const [value,setValue] = useState('[//]: # "Start writing your own post in markdown!"')
    const [showModal,setShowModal] = useState(false)


    const onClickHandler = () => {
      setShowModal(true)
    }
    return (
        <>
          <Head>
            <title>New Post</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main className="flex py-10 min-h-screen flex-col justify-start items-center bg-gradient-to-b from-[#111827] to-[#15162c]">
            <MarkdownEditor value={value} setValue={setValue}/>
            <div className="w-[80%] flex justify-end items-center">
              <button onClick={onClickHandler} className={`text-white mt-5  w-32 py-1 rounded-lg ${value.length <= 200 ? "bg-green-500/40" : "bg-green-500/90"}`} disabled={value.length <= 200}>Publish</button>
            </div>
            <MyModal showModal={showModal} setShowModal={setShowModal} content={value}/>
          </main>
        </>
      );
}

export default NewPost