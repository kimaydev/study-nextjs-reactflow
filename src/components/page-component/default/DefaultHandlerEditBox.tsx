import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Node, Position } from "reactflow";
import { AiFillEdit } from "react-icons/ai";
import {
  DefaultHandlerBoxStyled,
  DefaultImageButtonStyled,
  DefaultNodeColorRadioStyled,
  DefaultRadioButtonStyled,
} from "@/styles/page-component/default/defaultStyle";
import { INodeType } from "@/utils/type/interface";
import { getImage, getImageAlt, valuesType } from "@/hooks/useTrans";

interface IHandlerEditBoxProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  selectNode: Node | null;
  setSelectNode: React.Dispatch<React.SetStateAction<Node | null>>;
}
// 노드 수정 기본값
const initialNode = {
  title: "Node",
  desc: "",
  alarm: "off",
  alarmCount: 5,
  image: "demoOne",
  color: "white",
  flow: "horizontal",
  type: "customDefault",
};

const DefaultHandlerEditBox = ({
  nodes,
  setNodes,
  selectNode,
  setSelectNode,
}: IHandlerEditBoxProps) => {
  // 노드 수정
  const [addNode, setAddNode] = useState<INodeType>(initialNode);
  // 노드명 입력
  const handleNodeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setAddNode(prev => {
      return {
        ...prev,
        title: value,
      };
    });
  };
  // 설명글 입력
  const handleNodeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setAddNode(prev => {
      return {
        ...prev,
        desc: value,
      };
    });
  };
  // 노드 알람 표시 여부 설정
  const nodeAlarmArr: string[] = ["on", "off"];
  const handleNodeAlarmToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddNode(prev => {
      return {
        ...prev,
        alarm: value,
      };
    });
  };
  // 노드 알람 갯수
  const nodeAlarmCountArr: number[] = [5, 50, 100];
  const handleNodeAlarmCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // console.log("value", typeof e.target.value);
    setAddNode(prev => {
      return {
        ...prev,
        alarmCount: value,
      };
    });
  };
  // 노드 이미지 선택
  const nodeImageArr: string[] = ["demoOne", "demoTwo", "demoThree"];
  const handleNodeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddNode(prev => {
      return {
        ...prev,
        image: value,
      };
    });
  };
  // 노드 색상 선택
  const nodeColorArr: string[] = ["white", "red", "yellow", "blue", "green"];
  const handleNodeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddNode(prev => {
      return {
        ...prev,
        color: value,
      };
    });
  };
  // 트리 구조 방향 설정
  const nodeFlowArr: string[] = ["horizontal", "vertical"];
  const handleFlowStructure = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddNode(prev => {
      return {
        ...prev,
        flow: value,
      };
    });
  };
  // 노드 타입 설정
  const nodeTypeArr: string[] = [
    "customInput",
    "customOutput",
    "customDefault",
  ];
  const handleNodeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddNode(prev => {
      return {
        ...prev,
        type: value,
      };
    });
  };
  // 선택한 노드의 id
  useEffect(() => {
    // console.log("selectNode", selectNode);
    // targetPosition, sourcePosition의 값에 따라 flow의 값을 반환함
    type flowPositionType = (selectNode: Node | null) => string;
    const flowPosition: flowPositionType = selectNode => {
      const values = {
        targetPosition: selectNode?.targetPosition,
        sourcePosition: selectNode?.sourcePosition,
      };
      if (
        values.targetPosition === Position.Left &&
        values.sourcePosition === Position.Right
      ) {
        return "horizontal";
      } else if (
        values.targetPosition === Position.Top &&
        values.sourcePosition === Position.Bottom
      ) {
        return "vertical";
      }
      return "horizontal";
    };
    setAddNode(prev => {
      return {
        ...prev,
        title: selectNode?.data.title,
        desc: selectNode?.data.desc,
        alarm: selectNode?.data.alarm,
        alarmCount: selectNode?.data.alarmCount,
        image: selectNode?.data.image,
        color: selectNode?.data.color,
        flow: flowPosition(selectNode),
        type: selectNode?.type,
      };
    });
  }, [selectNode]);
  // 노드 수정 핸들러
  const handleEditNode = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const selectNodeId = selectNode?.id;
      // valuesType 값 string에서 Position으로 오버라이딩
      type valuesType = {
        [key: string]: Position;
      };
      // 노드 방향 설정
      const targetValue = () => {
        const values: valuesType = {
          horizontal: Position.Left,
          vertical: Position.Top,
        };
        return values[addNode.flow] ?? Position.Left;
      };
      const sourceValue = () => {
        const values: valuesType = {
          horizontal: Position.Right,
          vertical: Position.Bottom,
        };
        return values[addNode.flow] ?? Position.Right;
      };
      // 참조 : https://reactflow.dev/examples/nodes/update-node
      setNodes(nds =>
        nds.map(node => {
          if (node.id === selectNodeId) {
            node.type = addNode.type;
            node.targetPosition = targetValue();
            node.sourcePosition = sourceValue();
            node.data = {
              ...node.data,
              title: addNode.title,
              desc: addNode.desc,
              alarm: addNode.alarm,
              alarmCount: addNode.alarmCount,
              image: addNode.image,
              color: addNode.color,
            };
          }
          return node;
        }),
      );
    },
    [addNode],
  );
  // console.log("노드 수정", nodes);
  return (
    <DefaultHandlerBoxStyled>
      <h2>
        <i>
          <AiFillEdit />
        </i>
        노드 수정
      </h2>
      <form onSubmit={handleEditNode}>
        <ul>
          <li>
            <div className="form-box">
              <label htmlFor="NodeName" className="form-item-title">
                노드명
              </label>
              <input
                type="text"
                className="input-text"
                value={addNode.title}
                onChange={handleNodeName}
                placeholder="노드명을 입력해주세요."
              />
              <label className="form-item-title">설명글</label>
              <input
                type="text"
                className="input-text"
                value={addNode.desc}
                onChange={handleNodeDesc}
                placeholder="설명글을 입력해주세요."
              />
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 알람</span>
              <DefaultRadioButtonStyled>
                <ul>
                  {nodeAlarmArr.map((item, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="NodeAlarmToggle"
                        id={item}
                        value={item}
                        checked={addNode.alarm === item}
                        onChange={handleNodeAlarmToggle}
                      />
                      <label htmlFor={item}>{item}</label>
                    </li>
                  ))}
                </ul>
              </DefaultRadioButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 알람 갯수</span>
              <DefaultRadioButtonStyled>
                <ul>
                  {nodeAlarmCountArr.map((item, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="NodeAlarmCount"
                        id={`nodeAlarmCount${item}`}
                        value={item}
                        checked={addNode.alarmCount === item}
                        onChange={handleNodeAlarmCount}
                      />
                      <label htmlFor={`nodeAlarmCount${item}`}>
                        {item}개{item >= 100 && "↑"}
                      </label>
                    </li>
                  ))}
                </ul>
              </DefaultRadioButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 이미지</span>
              <DefaultImageButtonStyled>
                <ul>
                  {nodeImageArr.map((item, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="NodeImage"
                        id={item}
                        value={item}
                        checked={addNode.image === item}
                        onChange={handleNodeImage}
                      />
                      <label htmlFor={item}>
                        <Image
                          src={`/assets/images/${getImage(item)}`}
                          width="60"
                          height="60"
                          priority={true}
                          alt={getImageAlt(item)}
                        />
                        <span>{getImageAlt(item)}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </DefaultImageButtonStyled>
            </div>
          </li>
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
                        value={item}
                        checked={addNode.color === item}
                        onChange={handleNodeColor}
                      />
                    </DefaultNodeColorRadioStyled>
                  </li>
                ))}
              </ol>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">트리 구조 방향 설정</span>
              <DefaultRadioButtonStyled>
                <ul>
                  {nodeFlowArr.map((item, index) => {
                    const transKR = () => {
                      const values: valuesType = {
                        horizontal: "가로형",
                        vertical: "세로형",
                      };
                      return values[item];
                    };
                    return (
                      <li key={index}>
                        <input
                          type="radio"
                          name="FlowStructure"
                          id={item}
                          value={item}
                          checked={addNode.flow === item}
                          onChange={handleFlowStructure}
                        />
                        <label htmlFor={item}>{transKR()}</label>
                      </li>
                    );
                  })}
                </ul>
              </DefaultRadioButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 타입 설정</span>
              <DefaultRadioButtonStyled>
                <ul>
                  {nodeTypeArr.map((item, index) => {
                    const transKR = () => {
                      const values: valuesType = {
                        customInput: "입력",
                        customOutput: "출력",
                        customDefault: "입 · 출력",
                      };
                      return values[item] ?? "-";
                    };
                    return (
                      <li key={index}>
                        <input
                          type="radio"
                          name="NodeType"
                          id={item}
                          value={item}
                          checked={addNode.type === item}
                          onChange={handleNodeType}
                        />
                        <label htmlFor={item}>{transKR()}</label>
                      </li>
                    );
                  })}
                </ul>
              </DefaultRadioButtonStyled>
            </div>
          </li>
        </ul>
        <button className="submit-button" type="submit">
          노드 수정
        </button>
      </form>
    </DefaultHandlerBoxStyled>
  );
};

export default DefaultHandlerEditBox;
