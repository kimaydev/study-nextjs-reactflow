import React, { ReactElement } from "react";

const AppLayout = ({ children }: { children: ReactElement }) => {
  return <main>{children}</main>;
};

export default AppLayout;
