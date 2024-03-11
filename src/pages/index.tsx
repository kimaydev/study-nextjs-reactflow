import { ReactElement } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardWrap from "@/components/page-component/dashboard/DashboardWrap";

export default function Home() {
  return <DashboardWrap />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
