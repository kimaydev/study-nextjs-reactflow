import { ReactElement } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DefaultWrap from "@/components/page-component/default/DefaultWrap";

export default function Home() {
  return <DefaultWrap />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
