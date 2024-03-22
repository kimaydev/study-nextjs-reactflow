import React, { useCallback, useRef, useState } from "react";
import HandlerBox from "@/components/common/HandlerBox";
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
import { DashboardWrapperStyled } from "@/styles/dashboard/dashboardStyle";
import CustomNode from "@/components/common/CustomNode";
import ContextMenu from "@/components/common/ContextMenu";
import { INodeContextMenuType } from "@/utils/type/interface";
import HandlerEditBox from "@/components/common/HandlerEditBox";

// 노드의 초깃값
const initialNodes: Node[] = [
  {
    id: "0",
    position: {
      x: -3.552713678800501e-15,
      y: 87.00000000000001,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customDefault",
    data: {
      label: "Node0",
      desc: "설명글0",
      alaram: 5,
      alaramToggle: "off",
      nodeImage: "demoThree",
    },
    width: 100,
    height: 127,
    selected: false,
    positionAbsolute: {
      x: -3.552713678800501e-15,
      y: 87.00000000000001,
    },
    dragging: false,
  },
  {
    id: "1",
    position: {
      x: 344.0045695756484,
      y: 240.22425314473264,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customOutput",
    data: {
      label: "Node1",
      desc: "설명글1",
      alaram: 50,
      alaramToggle: "on",
      nodeImage: "demoThree",
    },
    width: 100,
    height: 127,
    selected: false,
    positionAbsolute: {
      x: 344.0045695756484,
      y: 240.22425314473264,
    },
    dragging: false,
  },
  {
    id: "2",
    position: {
      x: 397.78488600656425,
      y: 23.597539553864465,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customOutput",
    data: {
      label: "Node2",
      desc: "설명글2",
      alaram: 50,
      alaramToggle: "on",
      nodeImage: "demoOne",
    },
    width: 100,
    height: 127,
    selected: false,
    positionAbsolute: {
      x: 397.78488600656425,
      y: 23.597539553864465,
    },
    dragging: false,
  },
  {
    id: "3",
    position: {
      x: -258.00000000000006,
      y: 8.999999999999993,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customInput",
    data: {
      label: "Node3",
      desc: "설명글3",
      alaram: 50,
      alaramToggle: "on",
      nodeImage: "demoTwo",
    },
    width: 100,
    height: 127,
    selected: false,
    positionAbsolute: {
      x: -258.00000000000006,
      y: 8.999999999999993,
    },
    dragging: false,
  },
  {
    id: "4",
    position: {
      x: 266.0674872253042,
      y: -157.9968369206192,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customOutput",
    data: {
      label: "Node4",
      desc: "설명글4",
      alaram: 50,
      alaramToggle: "off",
      nodeImage: "demoTwo",
    },
    width: 100,
    height: 127,
    selected: false,
    positionAbsolute: {
      x: 266.0674872253042,
      y: -157.9968369206192,
    },
    dragging: false,
  },
  {
    id: "5",
    position: {
      x: -331.7525488901797,
      y: 274.6773290098463,
    },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    type: "customInput",
    data: {
      label: "Node5",
      desc: "설명글5",
      alaram: 50,
      alaramToggle: "off",
      nodeImage: "demoOne",
    },
    width: 100,
    height: 127,
    selected: true,
    positionAbsolute: {
      x: -331.7525488901797,
      y: 274.6773290098463,
    },
    dragging: false,
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

const DashboardWrap = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [menu, setMenu] = useState<INodeContextMenuType | null>(null);
  const ref = useRef<any>(null);
  // 노드수정 패널 토글
  const [toggleEditNode, setToggleEditNode] = useState<boolean>(false);
  // 선택한 노드의 데이터
  const [selectNode, setSelectNode] = useState<Node | null>(null);
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
    [],
  );
  const onNodeContextMenu = useCallback(
    (e: React.MouseEvent, node: Node) => {
      e.preventDefault();
      // console.log("node", node);
      // 메뉴 위치 계산, 화면 밖으로 contextMenu가 위치하지 않음
      const pane = ref.current.getBoundingClientRect();
      setSelectNode(node);
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
  // console.log("edges: ", edges);
  return (
    <DashboardWrapperStyled>
      <ReactFlowProvider>
        {/* 토폴로지 */}
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
          {menu && (
            <ContextMenu
              onClick={onPaneClick}
              setToggleEditNode={setToggleEditNode}
              {...menu}
            />
          )}
          <Controls />
        </ReactFlow>
        {toggleEditNode ? (
          // 토폴로지 수정 패널
          <HandlerEditBox
            nodes={nodes}
            setNodes={setNodes}
            selectNode={selectNode}
            setSelectNode={setSelectNode}
          />
        ) : (
          // 토폴로지 추가 패널
          <HandlerBox nodes={nodes} setNodes={setNodes} />
        )}
      </ReactFlowProvider>
    </DashboardWrapperStyled>
  );
};

export default DashboardWrap;
