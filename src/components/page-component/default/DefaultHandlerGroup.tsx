import React, { useCallback, useState } from "react";
import PanelLayout from "@/components/layout/PanelLayout";
import { AiOutlineGroup } from "react-icons/ai";
import { IGroupNodeType } from "@/utils/type/interface";
import { DefaultNodeColorRadioStyled } from "@/styles/page-component/default/defaultStyle";
import { Node } from "reactflow";
import { getRandom } from "@/hooks/useTrans";

interface IHandlerBox {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}
// 노드 추가 기본값
const initialNode: IGroupNodeType = {
  color: "white",
};

const DefaultHandlerGroup = ({ nodes, setNodes }: IHandlerBox) => {
  const [addGroupNode, setAddGroupNode] = useState(initialNode);
  // 노드 색상 선택
  const nodeColorArr: string[] = ["white", "red", "yellow", "blue", "green"];
  const handleNodeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddGroupNode(prev => {
      return {
        ...prev,
        color: value,
      };
    });
  };
  // 그룹노드 추가 핸들러
  const handleAddNode = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setNodes(prev => {
        // console.log("prev: ", prev);
        // 마지막으로 생성된 노드의 id 값에서 1을 증가
        const lastEl = prev.slice(-1)[0];
        // 노드가 없을 경우 id 값은 0부터 시작함
        const increaseId = prev.length > 0 ? parseInt(lastEl.id) + 1 : 0;
        const toStringId = increaseId.toString();
        return [
          ...prev,
          {
            id: toStringId,
            position: { x: getRandom(10, 100), y: getRandom(15, 80) },
            type: "customGroup",
            data: {
              color: addGroupNode.color,
            },
          },
        ];
      });
    },
    [addGroupNode],
  );
  // console.log("nodes", nodes);
  return (
    <PanelLayout>
      <>
        <h2>
          <i>
            <AiOutlineGroup />
          </i>
          그룹노드 추가
        </h2>
        <form onSubmit={handleAddNode}>
          <div className="form-wrapper">
            <ul>
              <li>
                <div className="form-box">
                  <span className="form-item-title">그룹노드 색상</span>
                  <ol>
                    {nodeColorArr.map((item, index) => (
                      <li key={index}>
                        <DefaultNodeColorRadioStyled $value={item}>
                          <input
                            type="radio"
                            name="NodeColor"
                            className="group-node"
                            value={item}
                            checked={addGroupNode.color === item}
                            onChange={handleNodeColor}
                          />
                        </DefaultNodeColorRadioStyled>
                      </li>
                    ))}
                  </ol>
                </div>
              </li>
            </ul>
            <button className="submit-button" type="submit">
              그룹노드 생성
            </button>
          </div>
        </form>
      </>
    </PanelLayout>
  );
};

export default DefaultHandlerGroup;
