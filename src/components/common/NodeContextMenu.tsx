import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IActivePanelType, IContextMenuType } from "@/utils/type/interface";
import { ContextMenuStyled } from "@/styles/page-component/default/defaultNodeStyle";
import { FaRegObjectGroup, FaRegObjectUngroup } from "react-icons/fa";

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
  const { getNode, getNodes, setNodes, addNodes, setEdges } = useReactFlow();
  const selectNode = getNode(id);
  // console.log("getNode", selectNode?.type);
  // 노드 수정
  const handleEditNode = useCallback(() => {
    // console.log("data", data);
    setActivePanel(prev => {
      return {
        ...prev,
        addNodeActive: false,
        groupNodeActive: false,
        editNodeActive: true,
        editEdgeActive: false,
        backgroundActive: false,
      };
    });
  }, [id]);
  // 노드 삭제
  const handleDeleteNode = useCallback(() => {
    setNodes(nodes => nodes.filter(node => node.id !== id));
    setEdges(edges => edges.filter(edge => edge.id.includes(id) === false));
  }, [id, setNodes, setEdges]);
  // 그룹 연결
  const handleGroupConnection = useCallback(() => {
    setNodes(nds =>
      nds.map(node => {
        // 선택한 노드의 타입이 "customGroup"이 아니면서 selected 값이 true
        if (node.type !== "customGroup" && node.selected === true) {
          node.parentNode = id;
        }
        return node;
      }),
    );
  }, [id, setNodes]);
  // 그룹 해제
  const handleGroupDisconnection = useCallback(() => {
    setNodes(nds => {
      const deleteGroup = nds
        // 선택한 그룹 노드 삭제
        .filter(nds => nds.id !== id)
        // 선택한 그룹에 연결된 하위 노드 parentNode값 초기화
        .map(node => {
          if (node.parentNode === id) {
            node.parentNode = undefined;
          }
          return node;
        });
      return deleteGroup;
    });
  }, [id, setNodes]);

  return (
    <ContextMenuStyled>
      <div style={{ top, left, right, bottom }} {...props}>
        {selectNode?.type !== "customGroup" ? (
          // 선택한 노드의 타입이 "customGroup"가 아닐 경우
          <>
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
          </>
        ) : (
          // 선택한 노드의 타입이 "customGroup"일 경우
          <>
            <div className="button-list">
              <ul>
                <li>
                  <button onClick={handleGroupConnection}>
                    <i>
                      <FaRegObjectGroup />
                    </i>
                    <span>그룹연결</span>
                  </button>
                </li>
                <li>
                  <button onClick={handleGroupDisconnection}>
                    <i>
                      <FaRegObjectUngroup />
                    </i>
                    <span>그룹해제</span>
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </ContextMenuStyled>
  );
};

export default NodeContextMenu;
