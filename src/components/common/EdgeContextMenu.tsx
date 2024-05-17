import React, { useCallback } from "react";
import { ContextMenuStyled } from "@/styles/page-component/default/defaultNodeStyle";
import { IActivePanelType, IContextMenuType } from "@/utils/type/interface";
import { BsBorderStyle } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useReactFlow } from "reactflow";
import { rSelectEdgeId } from "@/utils/states/rReactFlow";
import { useSetRecoilState } from "recoil";

interface IContextMenuPropsType extends IContextMenuType {
  setActivePanel: React.Dispatch<React.SetStateAction<IActivePanelType>>;
  onClick?: () => void;
}

const EdgeContextMenu = ({
  setActivePanel,
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: IContextMenuPropsType) => {
  const { setEdges } = useReactFlow();
  const setSelectEdgeId = useSetRecoilState(rSelectEdgeId);
  // 간선 수정
  const handleEdgeEdit = () => {
    setSelectEdgeId(id);
    setActivePanel(prev => {
      return {
        ...prev,
        addNodeActive: false,
        editNodeActive: false,
        editEdgeActive: true,
        backgroundActive: false,
      };
    });
  };
  // 간선 삭제
  const handleEdgeRemove = useCallback(() => {
    setEdges(edges => edges.filter(edge => edge.id !== id));
  }, [id, setEdges]);
  return (
    <ContextMenuStyled>
      <div style={{ top, left, right, bottom }} {...props}>
        <div className="button-list">
          <ul>
            <li>
              <button onClick={handleEdgeEdit}>
                <i>
                  <BsBorderStyle />
                </i>
                <span>수정</span>
              </button>
            </li>
            <li>
              <button onClick={handleEdgeRemove}>
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
