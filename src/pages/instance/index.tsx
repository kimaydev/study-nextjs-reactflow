import React, { ReactElement } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InstanceWrap from "@/components/page-component/instance/InstanceWrap";

const InstancePage = () => <InstanceWrap />;

export default InstancePage;

InstancePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
