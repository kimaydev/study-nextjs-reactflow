import React, { ReactElement } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChartWrap from "@/components/page-component/chart/ChartWrap";

const ChartPage = () => <ChartWrap />;

export default ChartPage;

ChartPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
