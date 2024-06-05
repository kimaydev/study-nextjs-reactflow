import React, { ReactElement } from "react";
import BackgroundWrap from "@/components/page-component/background/BackgroundWrap";
import DashboardLayout from "@/components/layout/DashboardLayout";

const BackgroundPage = () => <BackgroundWrap />;

export default BackgroundPage;

BackgroundPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
