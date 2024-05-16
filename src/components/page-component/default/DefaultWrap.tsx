import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
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
  IEdgeContextMenuType,
  INodeContextMenuType,
} from "@/utils/type/interface";
import CustomNode from "@/components/common/CustomNode";
import DefaultHandlerBox from "./DefaultHandlerBox";
import DefaultHandlerEditBox from "./DefaultHandlerEditBox";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { PiSelectionBackground } from "react-icons/pi";
import DefaultHandlerBackground from "./DefaultHandlerBackground";
import CustomEdge from "@/components/common/CustomEdge";
import { BsBorderStyle } from "react-icons/bs";
import DefaultHandlerEdge from "./DefaultHandlerEdge";
import { useRecoilValue } from "recoil";
import { rEdgeOptions } from "@/utils/states/rReactFlow";
import NodeContextMenu from "@/components/common/NodeContextMenu";
import EdgeContextMenu from "@/components/common/EdgeContextMenu";

// 노드의 초깃값
const initialNodes: Node[] = [
  {
    id: "0",
    position: {
      x: 37,
      y: 57,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customDefault",
    data: {
      title: "Node",
      desc: "",
      alarm: "off",
      alarmCount: 5,
      image: "demoOne",
      color: "white",
    },
  },
  {
    id: "1",
    position: {
      x: 387.5,
      y: -86,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customDefault",
    data: {
      title: "Node1",
      desc: "설명글1",
      alarm: "on",
      alarmCount: 5,
      image: "demoTwo",
      color: "white",
    },
  },
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    source: "0",
    target: "1",
    id: "edge-0-1",
    type: "customEdge",
  },
];
// 배경 초깃값
const initialBackground: IBackgroundType = {
  variant: BackgroundVariant.Lines,
  color: "#ccc",
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
};
// 커스텀 간선 타입
const edgeTypes = {
  customEdge: CustomEdge,
};

const DefaultWrap = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [nodeMenu, setNodeMenu] = useState<INodeContextMenuType | null>(null);
  const [edgeMenu, setEdgeMenu] = useState<IEdgeContextMenuType | null>(null);
  const [background, setBackground] =
    useState<IBackgroundType>(initialBackground);
  // 패널 활성화
  const [activePanel, setActivePanel] = useState<IActivePanelType>({
    addNodeActive: false,
    editNodeActive: false,
    editEdgeActive: true,
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
  const { baseEdge } = useRecoilValue(rEdgeOptions);
  const onConnect: OnConnect = useCallback(
    params => {
      // 간선의 프로퍼티를 추가 및 수정할 수 있음
      const newParams = {
        ...params,
        id: "edge-" + params.source + "-" + params.target,
        type: "customEdge",
        data: {
          baseEdge,
        },
      };
      console.log("newParams", newParams);
      setEdges(eds => addEdge(newParams, eds));
    },
    [setEdges, baseEdge],
  );
  // 노드 컨텍스트 메뉴
  const onNodeContextMenu = useCallback(
    (e: React.MouseEvent, node: Node) => {
      e.preventDefault();
      // 메뉴 위치 계산, 화면 밖으로 contextMenu가 위치하지 않음
      const pane = ref.current.getBoundingClientRect();
      setSelectNode(node);
      setNodeMenu({
        id: node.id,
        data: node.data,
        top: e.clientY < pane.height - 200 && e.clientY - 50,
        left: e.clientX < pane.width - 200 && e.clientX,
        right: e.clientX >= pane.width - 200 && pane.width - e.clientX,
        bottom: e.clientY >= pane.height - 200 && pane.height - e.clientY + 50,
      });
    },
    [setNodeMenu],
  );
  // contextMenu가 열려있을 때 메뉴를 클릭하면 창이 닫힘
  const onPaneClick = useCallback(() => setNodeMenu(null), [setNodeMenu]);
  // console.log("nodes", nodes);
  // console.log("edges", edges);
  // 간선 컨텍스트 메뉴
  const onEdgeContextMenu = useCallback((e: React.MouseEvent, edge: Edge) => {
    e.preventDefault();
    console.log("edge", edge);
    const pane = ref.current.getBoundingClientRect();
    setEdgeMenu({
      // id: node.id,
      // data: node.data,
      top: e.clientY < pane.height - 200 && e.clientY - 50,
      left: e.clientX < pane.width - 200 && e.clientX,
      right: e.clientX >= pane.width - 200 && pane.width - e.clientX,
      bottom: e.clientY >= pane.height - 200 && pane.height - e.clientY + 50,
    });
  }, []);
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
          {edgeMenu && <EdgeContextMenu {...edgeMenu} />}
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
                        editNodeActive: false,
                        editEdgeActive: true,
                        backgroundActive: false,
                      };
                    })
                  }
                >
                  <i>
                    <BsBorderStyle />
                  </i>
                  간선 설정
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    setActivePanel(prev => {
                      return {
                        ...prev,
                        addNodeActive: false,
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
        {activePanel.editEdgeActive && <DefaultHandlerEdge />}
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
