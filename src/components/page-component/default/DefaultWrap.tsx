import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
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
import { INodeContextMenuType } from "@/utils/type/interface";
import CustomNode from "@/components/common/CustomNode";
import ContextMenu from "@/components/common/ContextMenu";
import DefaultHandlerBox from "./DefaultHandlerBox";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

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
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    source: "0",
    sourceHandle: null,
    target: "2",
    targetHandle: null,
    id: "reactflow__edge-0-2",
  },
  {
    source: "3",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-3-0",
  },
  {
    source: "0",
    sourceHandle: null,
    target: "1",
    targetHandle: null,
    id: "reactflow__edge-0-1",
  },
  {
    source: "0",
    sourceHandle: null,
    target: "4",
    targetHandle: null,
    id: "reactflow__edge-0-4",
  },
  {
    source: "5",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-5-0",
  },
];
// 커스텀 노드 타입
const nodeTypes = {
  customDefault: CustomNode,
  customInput: CustomNode,
  customOutput: CustomNode,
};

const DefaultWrap = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [menu, setMenu] = useState<INodeContextMenuType | null>(null);
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
  // 노드를 연결하는 함수
  const onConnect: OnConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges],
  );
  // 노드 오른쪽 클릭 시 나오는 메뉴
  const onNodeContextMenu = useCallback(
    (e: React.MouseEvent, node: Node) => {
      e.preventDefault();
      // 메뉴 위치 계산, 화면 밖으로 contextMenu가 위치하지 않음
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        data: node.data,
        top: e.clientY < pane.height - 200 && e.clientY,
        left: e.clientX < pane.width - 200 && e.clientX,
        right: e.clientX >= pane.width - 200 && pane.width - e.clientX,
        bottom: e.clientY >= pane.height - 200 && pane.height - e.clientY,
      });
    },
    [setMenu],
  );
  // contextMenu가 열려있을 때 메뉴를 클릭하면 창이 닫힘
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
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
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Background />
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
          <Controls />
          {/* 메뉴 */}
          <DefaultPanelListStyled>
            <ul>
              <li>
                <button>
                  <i>
                    <AiOutlineAppstoreAdd />
                  </i>
                  노드 추가
                </button>
              </li>
            </ul>
          </DefaultPanelListStyled>
        </ReactFlow>
        {/* 노드 추가 패널 */}
        <DefaultHandlerBox nodes={nodes} setNodes={setNodes} />
      </ReactFlowProvider>
    </DefaultLayoutStyled>
  );
};

export default DefaultWrap;
