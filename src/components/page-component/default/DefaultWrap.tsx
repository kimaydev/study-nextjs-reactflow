import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MarkerType,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Position,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import {
  DefaultLayoutStyled,
  DefaultPanelListStyled,
} from "@/styles/page-component/default/defaultStyle";
import {
  IActivePanelType,
  IBackgroundType,
  IContextMenuType,
} from "@/utils/type/interface";
import CustomNode from "@/components/common/CustomNode";
import DefaultHandlerBox from "./DefaultHandlerBox";
import DefaultHandlerEditBox from "./DefaultHandlerEditBox";
import { AiOutlineAppstoreAdd, AiOutlineGroup } from "react-icons/ai";
import { PiSelectionBackground } from "react-icons/pi";
import DefaultHandlerBackground from "./DefaultHandlerBackground";
import CustomEdge from "@/components/common/CustomEdge";
import DefaultHandlerEdge from "./DefaultHandlerEdge";
import NodeContextMenu from "@/components/common/NodeContextMenu";
import EdgeContextMenu from "@/components/common/EdgeContextMenu";
import DefaultHandlerGroup from "./DefaultHandlerGroup";
import CustomGroupNode from "@/components/common/CustomGroupNode";

// 노드의 초깃값
const initialNodes: Node[] = [
  {
    id: "0",
    position: {
      x: 145.7207091501509,
      y: -219.91995204617263,
    },
    type: "customInput",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoTwo",
      color: "white",
    },
  },
  {
    id: "3",
    position: {
      x: 594.0438763212558,
      y: 58.91735185513926,
    },
    type: "customOutput",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoThree",
      color: "red",
    },
    parentNode: "6",
  },
  {
    id: "4",
    position: {
      x: 90.19219199547334,
      y: 58.48805309374279,
    },
    type: "customOutput",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoThree",
      color: "red",
    },
    parentNode: "6",
  },
  {
    id: "5",
    position: {
      x: 342.36601472412536,
      y: 85.22488666738587,
    },
    type: "customDefault",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoTwo",
      color: "red",
    },
    parentNode: "6",
  },
  {
    id: "6",
    position: {
      x: -194.5797953292706,
      y: -111.89954666954335,
    },
    type: "customGroup",
    data: {
      color: "red",
    },
    style: {
      width: 784,
      height: 224,
    },
  },
  {
    id: "7",
    position: {
      x: -161.62086860667833,
      y: 203.4745272621821,
    },
    type: "customOutput",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    data: {
      title: "Node",
      desc: "",
      alarm: "on",
      alarmCount: 5,
      image: "demoOne",
      color: "yellow",
    },
  },
  {
    id: "8",
    position: {
      x: 34.16251642669957,
      y: 203.4252055571491,
    },
    type: "customOutput",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 50,
      image: "demoOne",
      color: "yellow",
    },
  },
  {
    id: "9",
    position: {
      x: 286.4884946319826,
      y: 203.25597324110643,
    },
    type: "customDefault",
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 50,
      image: "demoTwo",
      color: "yellow",
    },
  },
  {
    id: "11",
    position: {
      x: 423.22565964099954,
      y: 318.90158215457836,
    },
    type: "customDefault",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoOne",
      color: "blue",
    },
  },
  {
    id: "12",
    position: {
      x: 423.83299555742275,
      y: 486.88771512427786,
    },
    type: "customOutput",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoOne",
      color: "blue",
    },
  },
  {
    id: "14",
    position: {
      x: 38.323525363192175,
      y: 9.623436780081533,
    },
    type: "customOutput",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoThree",
      color: "green",
    },
    parentNode: "17",
  },
  {
    id: "15",
    position: {
      x: 38.13684086617127,
      y: 193.93658873297045,
    },
    type: "customOutput",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoThree",
      color: "green",
    },
    parentNode: "17",
  },
  {
    id: "16",
    position: {
      x: 38.09783133502242,
      y: 304.4928843163723,
    },
    type: "customOutput",
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoThree",
      color: "green",
    },
    parentNode: "17",
  },
  {
    id: "17",
    position: {
      x: 634.5387643384935,
      y: 310.5240512593714,
    },
    type: "customGroup",
    data: {
      color: "green",
    },
    style: {
      width: 176,
      height: 448,
    },
  },
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    source: "0",
    target: "3",
    id: "edge-0-3",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "0",
    target: "4",
    id: "edge-0-4",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "0",
    target: "5",
    id: "edge-0-5",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "straight",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    source: "5",
    target: "7",
    id: "edge-5-7",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "5",
    target: "8",
    id: "edge-5-8",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "5",
    target: "9",
    id: "edge-5-9",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "9",
    target: "11",
    id: "edge-9-11",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "9",
    target: "12",
    id: "edge-9-12",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "11",
    target: "14",
    id: "edge-11-14",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "straight",
    },
  },
  {
    source: "11",
    target: "15",
    id: "edge-11-15",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
  {
    source: "11",
    target: "16",
    id: "edge-11-16",
    type: "customEdge",
    animated: false,
    data: {
      baseEdge: "step",
    },
  },
];
// 배경 초깃값
const initialBackground: IBackgroundType = {
  variant: BackgroundVariant.Lines,
  color: "#efefef",
  gap: 28,
  style: {
    backgroundColor: "#fff",
  },
};
// 커스텀 노드 타입
const nodeTypes = {
  customDefault: CustomNode,
  customInput: CustomNode,
  customOutput: CustomNode,
  customGroup: CustomGroupNode,
};
// 커스텀 간선 타입
const edgeTypes = {
  customEdge: CustomEdge,
};

const DefaultWrap = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [nodeMenu, setNodeMenu] = useState<IContextMenuType | null>(null);
  const [edgeMenu, setEdgeMenu] = useState<IContextMenuType | null>(null);
  const [background, setBackground] =
    useState<IBackgroundType>(initialBackground);
  // 패널 활성화
  const [activePanel, setActivePanel] = useState<IActivePanelType>({
    addNodeActive: true,
    groupNodeActive: false,
    editNodeActive: false,
    editEdgeActive: false,
    backgroundActive: false,
  });
  // 선택한 노드의 데이터
  const [selectNode, setSelectNode] = useState<Node | null>(null);
  const ref = useRef<any>(null);
  // 선택한 노드의 위치를 변경하는 함수
  const onNodesChange: OnNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [],
  );
  // 선택한 간선의 위치를 변경하는 함수
  const onEdgesChange: OnEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [],
  );
  // 노드와 노드 사이를 연결하는 함수
  const onConnect: OnConnect = useCallback(
    params => {
      // 간선의 프로퍼티 기본값 설정
      const newParams = {
        ...params,
        id: "edge-" + params.source + "-" + params.target,
        type: "customEdge",
        animated: false,
        data: {
          baseEdge: "bezier",
        },
      };
      // console.log("newParams", newParams);
      setEdges(eds => addEdge(newParams, eds));
    },
    [setEdges],
  );
  // 노드 컨텍스트 메뉴
  const onNodeContextMenu = useCallback(
    (e: React.MouseEvent, node: Node) => {
      e.preventDefault();
      // console.log("node", node);
      // 메뉴 위치 계산, 화면 밖으로 contextMenu가 위치하지 않음
      const pane = ref.current.getBoundingClientRect();
      setSelectNode(node);
      // 간선 컨텍스트 메뉴 열려있을 때 null값으로 초기화
      edgeMenu && setEdgeMenu(null);
      setNodeMenu({
        id: node.id,
        data: node.data,
        top: e.clientY < pane.height - 200 && e.clientY - 50,
        left: e.clientX < pane.width - 200 && e.clientX,
        right: e.clientX >= pane.width - 200 && pane.width - e.clientX,
        bottom: e.clientY >= pane.height - 200 && pane.height - e.clientY + 50,
      });
    },
    [setNodeMenu, edgeMenu],
  );
  // 컨텍스트 메뉴가 열려있을 때 영역 밖을 클릭하면 창이 닫힘
  const onPaneClick = useCallback(() => {
    setNodeMenu(null);
    setEdgeMenu(null);
  }, [setNodeMenu, setEdgeMenu]);
  // 간선 컨텍스트 메뉴
  const onEdgeContextMenu = useCallback(
    (e: React.MouseEvent, edge: Edge) => {
      e.preventDefault();
      // console.log("edge", edge);
      const pane = ref.current.getBoundingClientRect();
      // 노드 컨텍스트 메뉴 열려있을 때 null값으로 초기화
      nodeMenu && setNodeMenu(null);
      setEdgeMenu({
        id: edge.id,
        data: edge.data,
        top: e.clientY < pane.height - 200 && e.clientY - 50,
        left: e.clientX < pane.width - 200 && e.clientX,
        right: e.clientX >= pane.width - 200 && pane.width - e.clientX,
        bottom: e.clientY >= pane.height - 200 && pane.height - e.clientY + 50,
      });
    },
    [nodeMenu],
  );
  // console.log("nodes", nodes);
  // console.log("edges", edges);
  return (
    <DefaultLayoutStyled>
      <ReactFlowProvider>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          fitView
        >
          <Background {...background} />
          {nodeMenu && (
            <NodeContextMenu
              onClick={onPaneClick}
              setActivePanel={setActivePanel}
              {...nodeMenu}
            />
          )}
          {edgeMenu && (
            <EdgeContextMenu
              onClick={onPaneClick}
              setActivePanel={setActivePanel}
              {...edgeMenu}
            />
          )}
          <Controls />
          {/* 메뉴 */}
          <DefaultPanelListStyled>
            <ul>
              <li>
                <button
                  onClick={() =>
                    setActivePanel(prev => {
                      return {
                        ...prev,
                        addNodeActive: true,
                        groupNodeActive: false,
                        editNodeActive: false,
                        editEdgeActive: false,
                        backgroundActive: false,
                      };
                    })
                  }
                >
                  <i>
                    <AiOutlineAppstoreAdd />
                  </i>
                  노드 추가
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    setActivePanel(prev => {
                      return {
                        ...prev,
                        addNodeActive: false,
                        groupNodeActive: true,
                        editNodeActive: false,
                        editEdgeActive: false,
                        backgroundActive: false,
                      };
                    })
                  }
                >
                  <i>
                    <AiOutlineGroup />
                  </i>
                  그룹노드 추가
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    setActivePanel(prev => {
                      return {
                        ...prev,
                        addNodeActive: false,
                        groupNodeActive: false,
                        editNodeActive: false,
                        editEdgeActive: false,
                        backgroundActive: true,
                      };
                    })
                  }
                >
                  <i>
                    <PiSelectionBackground />
                  </i>
                  배경 수정
                </button>
              </li>
            </ul>
          </DefaultPanelListStyled>
        </ReactFlow>
        {/* 노드 추가 패널 */}
        {activePanel.addNodeActive && (
          <DefaultHandlerBox nodes={nodes} setNodes={setNodes} />
        )}
        {/* 그룹노드 추가 패널 */}
        {activePanel.groupNodeActive && (
          <DefaultHandlerGroup nodes={nodes} setNodes={setNodes} />
        )}
        {/* 노드 수정 패널 */}
        {activePanel.editNodeActive && (
          <DefaultHandlerEditBox
            nodes={nodes}
            setNodes={setNodes}
            selectNode={selectNode}
            setSelectNode={setSelectNode}
          />
        )}
        {/* 간선 설정 패널 */}
        {activePanel.editEdgeActive && (
          <DefaultHandlerEdge edges={edges} setEdges={setEdges} />
        )}
        {/* 배경 수정 패널 */}
        {activePanel.backgroundActive && (
          <DefaultHandlerBackground
            background={background}
            setBackground={setBackground}
          />
        )}
      </ReactFlowProvider>
    </DefaultLayoutStyled>
  );
};

export default DefaultWrap;
