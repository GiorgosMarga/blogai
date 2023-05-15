import React from "react";
import { ScaleLoader } from "react-spinners";
const LoadingPostPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  bg-gradient-to-b from-[#111827] to-[#15162c]">
      <ScaleLoader width={6} height={20} color="#3b82f6" />
    </div>
  );
};

export default LoadingPostPage;
