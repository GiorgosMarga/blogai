import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { RecoilRoot } from "recoil";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
const progress = new ProgressBar({
  size: 4,
  color: "#0096ff",
  className: "z-50 ",
  delay: 80,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default api.withTRPC(MyApp);
