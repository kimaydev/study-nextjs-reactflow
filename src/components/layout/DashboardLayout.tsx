import { DashboardLayoutStyled } from "@/styles/dashboard/dashboardStyle";
import React, { ReactElement } from "react";

const DashboardLayout = ({ children }: { children: ReactElement }) => {
  return <DashboardLayoutStyled>{children}</DashboardLayoutStyled>;
};

export default DashboardLayout;
