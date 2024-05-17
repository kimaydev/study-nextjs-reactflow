import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IActivePanelType, IContextMenuType } from "@/utils/type/interface";
import { ContextMenuStyled } from "@/styles/page-component/default/defaultNodeStyle";

export interface IContextMenuPropsType extends IContextMenuType {
  setActivePanel: React.Dispatch<React.SetStateAction<IActivePanelType>>;
  onClick?: () => void;
}

const NodeContextMenu = ({
  setActivePanel,
  data,
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: IContextMenuPropsType) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  // 노드 수정
  const handleEditNode = useCallback(() => {
    // console.log("data", data);
    setActivePanel(prev => {
      return {
        ...prev,
        addNodeActive: false,
        editNodeActive: true,
        editEdgeActive: false,
        backgroundActive: false,
      };
    });
  }, [id]);
  // 노드 삭제
  const handleDeleteNode = useCallback(() => {
    setNodes(nodes => nodes.filter(node => node.id !== id));
    setEdges(edges => edges.filter(edge => edge.source !== id));
  }, [id, setNodes, setEdges]);
  return (
    <ContextMenuStyled>
      <div style={{ top, left, right, bottom }} {...props}>
        <div className="text-list">
          <ul className="top-list">
            <li>
              <b className="list-title">{data?.title}</b>
              <p className="list-content">{data?.desc}</p>
            </li>
          </ul>
        </div>
        <div className="text-list">
          <ul>
            <li>
              <span className="list-title">알람</span>
              <p className="list-content">{data?.alarm}</p>
            </li>
            <li>
              <span className="list-title">알람 갯수</span>
              <p className="list-content">{data?.alarmCount}</p>
            </li>
          </ul>
        </div>
        <div className="button-list">
          <ul>
            <li>
              <button onClick={handleEditNode}>
                <i>
                  <AiFillEdit />
                </i>
                <span>노드수정</span>
              </button>
            </li>
            <li>
              <button onClick={handleDeleteNode}>
                <i>
                  <AiFillDelete />
                </i>
                <span>노드삭제</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </ContextMenuStyled>
  );
};

export default NodeContextMenu;
