import "@/styles/fonts.css";
import "@/styles/reactFlowStyle.scss";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GlobalStyled } from "@/styles/globalStyle";
import AppLayout from "@/components/layout/AppLayout";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <GlobalStyled />
      <Head>
        <title>Next.js with React Flow</title>
        <meta name="description" content="Next.js with React Flow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <AppLayout>
        <RecoilRoot>
          <ConfigProvider>
            {getLayout(<Component {...pageProps} />)}
          </ConfigProvider>
        </RecoilRoot>
      </AppLayout>
    </>
  );
}
