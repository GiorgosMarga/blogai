import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { userAtom } from "~/atoms/userAtom";
import { useSetRecoilState } from "recoil";
const Header = () => {
  const router = useRouter();
  const setUserId = useSetRecoilState(userAtom);
  const logoutUser = api.user.logoutUser.useMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onClickHandler = async () => {
    if (document.cookie) {
      return await router.push("/newPost");
    }
    await router.push("/auth");
  };
  useEffect(() => {
    if (document.cookie) {
      if (document.cookie.split("=")[0] === "user") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const onLogoutHandler = () => {
    logoutUser.mutate();
    setUserId("");
    setIsLoggedIn(false);
  };
  return (
    <header className="flex h-16  w-full items-center justify-between border-b border-red-50/60 px-7">
      <div className="flex space-x-5">
        <h1 className="text-xl font-extrabold text-red-50">BlogAI</h1>
        <div className="flex w-64 space-x-2 rounded-xl bg-[#161f32] px-2 py-1">
          <MagnifyingGlassIcon className="mt-[2px] h-5 w-5 text-red-50" />
          <input
            className="bg-[#161f32] text-red-50 outline-none"
            placeholder="Search BlogAI"
          />
        </div>
      </div>
      <div className="flex items-center justify-center space-x-7">
        <div className="flex cursor-pointer space-x-1" onClick={onClickHandler}>
          <PencilSquareIcon className="h-6 w-6 text-red-50" />
          <p className="text-red-50">Write</p>
        </div>
        <BellIcon className="h-6 w-6 text-red-50" />
        {!isLoggedIn && (
          <BiLogIn
            className="h-6 w-6 cursor-pointer text-red-50 hover:text-white"
            onClick={() => router.push("/auth")}
          />
        )}
        {isLoggedIn && (
          <>
            <div className="h-7 w-7 rounded-full bg-blue-500" />
            <BiLogOut
              className="h-6 w-6 cursor-pointer text-red-50 hover:text-white"
              onClick={onLogoutHandler}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
