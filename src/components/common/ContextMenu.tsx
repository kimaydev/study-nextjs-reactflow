import { ContextMenuStyled } from "@/styles/common/topologyStyle";
import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { INodeContextMenuPropsType } from "@/utils/type/interface";

const ContextMenu = ({
  data,
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: INodeContextMenuPropsType) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  console.log("data", data);
  // 노드 삭제
  const deleteNode = useCallback(() => {
    setNodes(nodes => nodes.filter(node => node.id !== id));
    setEdges(edges => edges.filter(edge => edge.source !== id));
  }, [id, setNodes, setEdges]);
  return (
    <ContextMenuStyled>
      <div style={{ top, left, right, bottom }} {...props}>
        <div className="text-list">
          <ul className="top-list">
            <li>
              <b className="list-title">{data.label}</b>
              <p className="list-content">{data.desc}</p>
            </li>
          </ul>
        </div>
        <div className="text-list">
          <ul>
            <li>
              <span className="list-title">알람</span>
              <p className="list-content">{data.alaramToggle}</p>
            </li>
            <li>
              <span className="list-title">알람 갯수</span>
              <p className="list-content">{data.alaram}</p>
            </li>
          </ul>
        </div>
        <div className="button-list">
          <ul>
            <li>
              <button>
                <i>
                  <AiFillEdit />
                </i>
                <span>노드수정</span>
              </button>
            </li>
            <li>
              <button onClick={deleteNode}>
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

export default ContextMenu;
