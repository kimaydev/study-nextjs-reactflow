import React, { ReactElement } from "react";
import { DefaultHandlerBoxStyled } from "@/styles/page-component/default/defaultStyle";

const PanelLayout = ({ children }: { children: ReactElement }) => {
  return <DefaultHandlerBoxStyled>{children}</DefaultHandlerBoxStyled>;
};

export default PanelLayout;
