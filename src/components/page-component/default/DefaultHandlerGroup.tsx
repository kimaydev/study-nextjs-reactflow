import React, { useState } from "react";
import PanelLayout from "@/components/layout/PanelLayout";
import { AiOutlineGroup } from "react-icons/ai";
import { IGroupNodeType } from "@/utils/type/interface";
import { DefaultNodeColorRadioStyled } from "@/styles/page-component/default/defaultStyle";

// 노드 추가 기본값
const initialNode: IGroupNodeType = {
  color: "white",
};

const DefaultHandlerGroup = () => {
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
  return (
    <PanelLayout>
      <>
        <h2>
          <i>
            <AiOutlineGroup />
          </i>
          그룹노드 추가
        </h2>
        <form>
          <div className="form-wrapper">
            <ul>
              <li>
                <div className="form-box">
                  <span className="form-item-title">노드 색상</span>
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
