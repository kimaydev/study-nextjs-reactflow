import {
  HandlerBoxStyled,
  NodeColorRadioStyled,
} from "@/styles/common/handlerBoxStyle";
import React, { useCallback, useState } from "react";
import { Node } from "reactflow";

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
    backgroundColor: "rgba(238,93,80,0.1)",
    textColor: "rgba(238,93,80,1)",
    borderColor: "rgba(238,93,80,1)",
  },
  {
    value: "yellow",
    backgroundColor: "rgba(255,194,70,0.1)",
    textColor: "rgba(255,194,70,1)",
    borderColor: "rgba(255,194,70,1)",
  },
  {
    value: "blue",
    backgroundColor: "rgba(51,103,217,0.1)",
    textColor: "rgba(51,103,217,1)",
    borderColor: "rgba(51,103,217,1)",
  },
  {
    value: "green",
    backgroundColor: "rgba(7,187,98,0.1)",
    textColor: "rgba(7,187,98,1)",
    borderColor: "rgba(7,187,98,1)",
  },
];

const HandlerBox = ({ nodes, setNodes }: IHandlerBox) => {
  // 노드명 입력 핸들러
  const [nodeNameValue, setNodeNameValue] = useState<string>("Node");
  const handleNodeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNodeNameValue(e.target.value);
  };
  // 노드색상 선택 핸들러
  const [nodeColorValue, setNodeColorValue] = useState("white");
  const handleNodeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setNodeColorValue(e.target.value);
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
        // nodes가 없을 경우 id 값은 0부터 시작함
        const increaseId = prev.length > 0 ? parseInt(lastEl.id) + 1 : 0;
        const toStringId = increaseId.toString();
        return [
          ...prev,
          {
            id: toStringId,
            position: { x: getRandom(10, 100), y: getRandom(15, 80) },
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
    [nodeNameValue, nodeColorValue],
  );
  // 선택한 노드 삭제 핸들러
  return (
    <HandlerBoxStyled>
      <form onSubmit={handleAddNode}>
        <ul>
          <li>
            <div className="form-box">
              <label htmlFor="NodeName" className="form-item-title">
                노드명
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
              <span className="form-item-title">노드색상</span>
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
              <span className="form-item-title">엣지 최대 갯수 설정</span>
              <ol>
                <li>
                  <label htmlFor="countOne">1개</label>
                  <input
                    type="radio"
                    name="EdgesCount"
                    id="countOne"
                    value={1}
                  />
                </li>
                <li>
                  <label htmlFor="EdgesCount">2개</label>
                  <input type="radio" name="EdgesCount" value={2} />
                </li>
              </ol>
            </div>
          </li>
          <li>
            <button className="submit-button" type="submit">
              노드 생성
            </button>
          </li>
        </ul>
      </form>
    </HandlerBoxStyled>
  );
};

export default HandlerBox;
