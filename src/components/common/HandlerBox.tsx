import {
  HandlerBoxStyled,
  NodeColorRadioStyled,
  RadioButtonStyled,
} from "@/styles/common/handlerBoxStyle";
import React, { useCallback, useState } from "react";
import { Node, Position } from "reactflow";

interface IHandlerBox {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

const nodeColorList = [
  {
    value: "white",
    backgroundColor: "rgba(255,255,255,1)",
    textColor: "#000",
    borderColor: "#000",
  },
  {
    value: "red",
    backgroundColor: "rgba(252,239,237,1)",
    textColor: "rgba(238,93,80,1)",
    borderColor: "rgba(238,93,80,1)",
  },
  {
    value: "yellow",
    backgroundColor: "rgba(254,249,236,1)",
    textColor: "rgba(255,194,70,1)",
    borderColor: "rgba(255,194,70,1)",
  },
  {
    value: "blue",
    backgroundColor: "rgba(236,240,251,1)",
    textColor: "rgba(51,103,217,1)",
    borderColor: "rgba(51,103,217,1)",
  },
  {
    value: "green",
    backgroundColor: "rgba(237,248,239,1)",
    textColor: "rgba(7,187,98,1)",
    borderColor: "rgba(7,187,98,1)",
  },
];

const HandlerBox = ({ nodes, setNodes }: IHandlerBox) => {
  // 토폴로지 구조 설정 핸들러
  const [flowStructureValue, setFlowStructureValue] =
    useState<string>("FlowHorizontal");
  const handleFlowStructure = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlowStructureValue(e.target.value);
  };
  // 노드명 입력 핸들러
  const [nodeNameValue, setNodeNameValue] = useState<string>("Node");
  const handleNodeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNodeNameValue(e.target.value);
  };
  // 노드색상 선택 핸들러
  const [nodeColorValue, setNodeColorValue] = useState<string>("white");
  const handleNodeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setNodeColorValue(e.target.value);
  };
  // 간선 최대 갯수 설정 핸들러
  const [edgesCountValue, setEdgesCountValue] = useState("1");
  const handleEdgesCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdgesCountValue(e.target.value);
  };
  // 노드 생성 시 랜덤한 위치에 나오게 하려고 넣은 함수
  const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);
  // 노드 추가 핸들러
  const handleAddNode = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // console.log("nodeColorValue", nodeColorValue);
      const selectNodeColor = nodeColorList.filter(
        item => item.value === nodeColorValue,
      );
      // console.log("selectNodeColor", selectNodeColor);
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
            targetPosition:
              flowStructureValue === "FlowHorizontal"
                ? Position.Left
                : undefined,
            sourcePosition:
              flowStructureValue === "FlowHorizontal"
                ? Position.Right
                : undefined,
            data: { label: nodeNameValue },
            style: {
              backgroundColor: selectNodeColor[0].backgroundColor,
              color: selectNodeColor[0].textColor,
              borderColor: selectNodeColor[0].borderColor,
            },
          },
        ];
      });
    },
    [flowStructureValue, nodeNameValue, nodeColorValue],
  );
  // 선택한 노드 삭제 핸들러
  return (
    <HandlerBoxStyled>
      <form onSubmit={handleAddNode}>
        <ul>
          <li>
            <div className="form-box">
              <label htmlFor="NodeName" className="form-item-title">
                노드 명
              </label>
              <input
                type="text"
                className="input-text"
                value={nodeNameValue}
                onChange={handleNodeName}
                placeholder="노드명을 입력해주세요."
              />
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 색상</span>
              <ol>
                <li>
                  <NodeColorRadioStyled $value="white">
                    <input
                      type="radio"
                      name="NodeColor"
                      value="white"
                      checked={nodeColorValue === "white"}
                      onChange={handleNodeColor}
                    />
                  </NodeColorRadioStyled>
                </li>
                <li>
                  <NodeColorRadioStyled $value="red">
                    <input
                      type="radio"
                      name="NodeColor"
                      value="red"
                      checked={nodeColorValue === "red"}
                      onChange={handleNodeColor}
                    />
                  </NodeColorRadioStyled>
                </li>
                <li>
                  <NodeColorRadioStyled $value="yellow">
                    <input
                      type="radio"
                      name="NodeColor"
                      value="yellow"
                      checked={nodeColorValue === "yellow"}
                      onChange={handleNodeColor}
                    />
                  </NodeColorRadioStyled>
                </li>
                <li>
                  <NodeColorRadioStyled $value="blue">
                    <input
                      type="radio"
                      name="NodeColor"
                      value="blue"
                      checked={nodeColorValue === "blue"}
                      onChange={handleNodeColor}
                    />
                  </NodeColorRadioStyled>
                </li>
                <li>
                  <NodeColorRadioStyled $value="green">
                    <input
                      type="radio"
                      name="NodeColor"
                      value="green"
                      checked={nodeColorValue === "green"}
                      onChange={handleNodeColor}
                    />
                  </NodeColorRadioStyled>
                </li>
              </ol>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 타입 설정</span>
              <RadioButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="NodeType"
                      id="nodeInput"
                      value="nodeInput"
                    />
                    <label htmlFor="nodeInput">입력</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeType"
                      id="nodeOutput"
                      value="nodeOutput"
                    />
                    <label htmlFor="nodeOutput">출력</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeType"
                      id="nodeDefault"
                      value="nodeDefault"
                    />
                    <label htmlFor="nodeDefault">입 · 출력</label>
                  </li>
                </ul>
              </RadioButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">링크 방향 설정</span>
              <RadioButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="FlowStructure"
                      id="FlowHorizontal"
                      value="FlowHorizontal"
                      checked={flowStructureValue === "FlowHorizontal"}
                      onChange={handleFlowStructure}
                    />
                    <label htmlFor="FlowHorizontal">가로형</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="FlowStructure"
                      id="FlowVertical"
                      value="FlowVertical"
                      checked={flowStructureValue === "FlowVertical"}
                      onChange={handleFlowStructure}
                    />
                    <label htmlFor="FlowVertical">세로형</label>
                  </li>
                </ul>
              </RadioButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">간선 연결 갯수 제한 설정</span>
              <RadioButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="EdgesLimit"
                      id="edgesLimitTrue"
                      value="edgesLimitTrue"
                    />
                    <label htmlFor="edgesLimitTrue">제한함</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="EdgesLimit"
                      id="edgesLimitFalse"
                      value="edgesLimitFalse"
                    />
                    <label htmlFor="edgesLimitFalse">제한하지않음</label>
                  </li>
                </ul>
              </RadioButtonStyled>
              <RadioButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="EdgesCount"
                      id="edgeOne"
                      value="1"
                      checked={edgesCountValue === "1"}
                      onChange={handleEdgesCount}
                    />
                    <label htmlFor="edgeOne">1</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="EdgesCount"
                      id="edgeTwo"
                      value="2"
                      checked={edgesCountValue === "2"}
                      onChange={handleEdgesCount}
                    />
                    <label htmlFor="edgeTwo">2</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="EdgesCount"
                      id="edgeThree"
                      value="3"
                      checked={edgesCountValue === "3"}
                      onChange={handleEdgesCount}
                    />
                    <label htmlFor="edgeThree">3</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="EdgesCount"
                      id="edgeFour"
                      value="4"
                      checked={edgesCountValue === "4"}
                      onChange={handleEdgesCount}
                    />
                    <label htmlFor="edgeFour">4</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="EdgesCount"
                      id="edgeFive"
                      value="5"
                      checked={edgesCountValue === "5"}
                      onChange={handleEdgesCount}
                    />
                    <label htmlFor="edgeFive">5</label>
                  </li>
                </ul>
              </RadioButtonStyled>
            </div>
          </li>
        </ul>
        <button className="submit-button" type="submit">
          노드 생성
        </button>
      </form>
    </HandlerBoxStyled>
  );
};

export default HandlerBox;
