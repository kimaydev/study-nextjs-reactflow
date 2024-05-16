import React from "react";
import { ContextMenuStyled } from "@/styles/page-component/default/defaultNodeStyle";
import { IEdgeContextMenuType } from "@/utils/type/interface";

interface IContextMenuPropsType extends IEdgeContextMenuType {
  // setActivePanel: React.Dispatch<React.SetStateAction<IActivePanelType>>;
  // onClick?: () => void;
}

const EdgeContextMenu = ({
  top,
  left,
  right,
  bottom,
  ...props
}: IContextMenuPropsType) => {
  return (
    <ContextMenuStyled>
      <div style={{ top, left, right, bottom }} {...props}>
        EdgeContextMenu
      </div>
    </ContextMenuStyled>
  );
};

export default EdgeContextMenu;
