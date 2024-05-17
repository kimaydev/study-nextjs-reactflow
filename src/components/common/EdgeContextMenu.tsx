import React from "react";
import { ContextMenuStyled } from "@/styles/page-component/default/defaultNodeStyle";
import { IActivePanelType, IEdgeContextMenuType } from "@/utils/type/interface";
import { BsBorderStyle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

interface IContextMenuPropsType extends IEdgeContextMenuType {
  setActivePanel: React.Dispatch<React.SetStateAction<IActivePanelType>>;
  // onClick?: () => void;
}

const EdgeContextMenu = ({
  setActivePanel,
  top,
  left,
  right,
  bottom,
  ...props
}: IContextMenuPropsType) => {
  return (
    <ContextMenuStyled>
      <div style={{ top, left, right, bottom }} {...props}>
        <div className="button-list">
          <ul>
            <li>
              <button
                onClick={() =>
                  setActivePanel(prev => {
                    return {
                      ...prev,
                      addNodeActive: false,
                      editNodeActive: false,
                      editEdgeActive: true,
                      backgroundActive: false,
                    };
                  })
                }
              >
                <i>
                  <BsBorderStyle />
                </i>
                <span>수정</span>
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setActivePanel(prev => {
                    return {
                      ...prev,
                      addNodeActive: false,
                      editNodeActive: false,
                      editEdgeActive: true,
                      backgroundActive: false,
                    };
                  })
                }
              >
                <i>
                  <MdOutlineClose />
                </i>
                <span>삭제</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </ContextMenuStyled>
  );
};

export default EdgeContextMenu;
