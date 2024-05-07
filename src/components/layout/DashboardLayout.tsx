import React, { ReactElement } from "react";
import { DashboardLayoutStyled } from "@/styles/layout/dashboardLayoutStyle";
import Header from "../common/Header";

const DashboardLayout = ({ children }: { children: ReactElement }) => {
  return (
    <DashboardLayoutStyled>
      <Header />
      <div className="contents-layout">{children}</div>
    </DashboardLayoutStyled>
  );
};

export default DashboardLayout;
