import {
  HandlerBoxStyled,
  ImageButtonStyled,
  NodeColorRadioStyled,
  RadioButtonStyled,
} from "@/styles/common/handlerBoxStyle";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { Node, Position } from "reactflow";

interface IHandlerBox {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

const HandlerBox = ({ nodes, setNodes }: IHandlerBox) => {
  // 노드명 입력 핸들러
  const [nodeNameValue, setNodeNameValue] = useState<string>("Node");
  const handleNodeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNodeNameValue(e.target.value);
  };
  const [nodeDescValue, setNodeDescValue] = useState<string>("");
  const handleNodeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNodeDescValue(e.target.value);
  };
  // 노드 알람 핸들러
  const [nodeAlarmToggle, setNodeAlarmToggle] = useState("off");
  const handleNodeAlarmToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeAlarmToggle(e.target.value);
  };
  // 노드 알람 갯수 설정 핸들러
  const [nodeAlarmValue, setNodeAlarmValue] = useState<number>(5);
  const handleNodeAlarm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // console.log("value", value);
    setNodeAlarmValue(value);
  };
  // 노드 이미지 설정 핸들러
  const [nodeImageValue, setNodeImageValue] = useState<string>("demoOne");
  const handleNodeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("선택한 이미지", e.target.value);
    setNodeImageValue(e.target.value);
  };
  // 트리 구조 방향 설정 핸들러
  const [flowStructureValue, setFlowStructureValue] =
    useState<string>("FlowHorizontal");
  const handleFlowStructure = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlowStructureValue(e.target.value);
  };
  // 노드 타입 설정 핸들러
  const [nodeTypeValue, setNodeTypeValue] = useState<string>("customDefault");
  const handleNodeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeTypeValue(e.target.value);
  };
  // 노드 생성 시 랜덤한 위치에 나오게 하려고 넣은 함수
  const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);
  // 노드 추가 핸들러
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
            targetPosition:
              flowStructureValue === "FlowHorizontal"
                ? Position.Left
                : Position.Top,
            sourcePosition:
              flowStructureValue === "FlowHorizontal"
                ? Position.Right
                : Position.Bottom,
            type: nodeTypeValue,
            data: {
              label: nodeNameValue,
              desc: nodeDescValue,
              alaram: nodeAlarmValue,
              alaramToggle: nodeAlarmToggle,
              nodeImage: nodeImageValue,
            },
          },
        ];
      });
    },
    [
      flowStructureValue,
      nodeNameValue,
      nodeDescValue,
      nodeAlarmToggle,
      nodeAlarmValue,
      nodeImageValue,
      nodeTypeValue,
    ],
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
              <input
                type="text"
                className="input-text"
                value={nodeDescValue}
                onChange={handleNodeDesc}
                placeholder="설명글을 입력해주세요."
              />
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 알람</span>
              <RadioButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="NodeAlarmToggle"
                      id="nodeAlarmOn"
                      value="on"
                      checked={nodeAlarmToggle === "on"}
                      onChange={handleNodeAlarmToggle}
                    />
                    <label htmlFor="nodeAlarmOn">On</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeAlarmToggle"
                      id="nodeAlarmOff"
                      value="off"
                      checked={nodeAlarmToggle === "off"}
                      onChange={handleNodeAlarmToggle}
                    />
                    <label htmlFor="nodeAlarmOff">Off</label>
                  </li>
                </ul>
              </RadioButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 알람 갯수</span>
              <RadioButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="NodeAlarm"
                      id="nodeAlarmA"
                      value={5}
                      checked={nodeAlarmValue === 5}
                      onChange={handleNodeAlarm}
                    />
                    <label htmlFor="nodeAlarmA">5개</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeAlarm"
                      id="nodeAlarmB"
                      value={50}
                      checked={nodeAlarmValue === 50}
                      onChange={handleNodeAlarm}
                    />
                    <label htmlFor="nodeAlarmB">50개</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeAlarm"
                      id="nodeAlarmC"
                      value={100}
                      checked={nodeAlarmValue >= 100}
                      onChange={handleNodeAlarm}
                    />
                    <label htmlFor="nodeAlarmC">100개↑</label>
                  </li>
                </ul>
              </RadioButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">노드 이미지</span>
              <ImageButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="NodeImage"
                      id="demoOne"
                      value="demoOne"
                      checked={nodeImageValue === "demoOne"}
                      onChange={handleNodeImage}
                    />
                    <label htmlFor="demoOne">
                      <Image
                        src="/assets/images/icon_demo_001.png"
                        width="60"
                        height="60"
                        priority={true}
                        alt="데모001"
                      />
                      <span>데모001</span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeImage"
                      id="demoTwo"
                      value="demoTwo"
                      checked={nodeImageValue === "demoTwo"}
                      onChange={handleNodeImage}
                    />
                    <label htmlFor="demoTwo">
                      <Image
                        src="/assets/images/icon_demo_002.png"
                        width="60"
                        height="60"
                        priority={true}
                        alt="데모002"
                      />
                      <span>데모002</span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeImage"
                      id="demoThree"
                      value="demoThree"
                      checked={nodeImageValue === "demoThree"}
                      onChange={handleNodeImage}
                    />
                    <label htmlFor="demoThree">
                      <Image
                        src="/assets/images/icon_demo_003.png"
                        width="60"
                        height="60"
                        priority={true}
                        alt="데모003"
                      />
                      <span>데모003</span>
                    </label>
                  </li>
                </ul>
              </ImageButtonStyled>
            </div>
          </li>
          <li>
            <div className="form-box">
              <span className="form-item-title">트리 구조 방향 설정</span>
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
              <span className="form-item-title">노드 타입 설정</span>
              <RadioButtonStyled>
                <ul>
                  <li>
                    <input
                      type="radio"
                      name="NodeType"
                      id="nodeInput"
                      value="customInput"
                      checked={nodeTypeValue === "customInput"}
                      onChange={handleNodeType}
                    />
                    <label htmlFor="nodeInput">입력</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeType"
                      id="nodeOutput"
                      value="customOutput"
                      checked={nodeTypeValue === "customOutput"}
                      onChange={handleNodeType}
                    />
                    <label htmlFor="nodeOutput">출력</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="NodeType"
                      id="nodeDefault"
                      value="customDefault"
                      checked={nodeTypeValue === "customDefault"}
                      onChange={handleNodeType}
                    />
                    <label htmlFor="nodeDefault">입 · 출력</label>
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
