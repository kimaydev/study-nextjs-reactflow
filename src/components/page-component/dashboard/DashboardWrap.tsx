import React, { useCallback, useRef, useState } from "react";
import HandlerBox from "@/components/common/HandlerBox";
import ReactFlow, {
  Background,
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
import { DashboardWrapperStyled } from "@/styles/dashboard/dashboardStyle";
import CustomNode from "@/components/common/CustomNode";
import ContextMenu from "@/components/common/ContextMenu";
import { INodeContextMenuType } from "@/utils/type/interface";
import HandlerEditBox from "@/components/common/HandlerEditBox";
import InstanceNode from "@/components/common/InstanceNode";
import InstanceInputNode from "@/components/common/InstanceInputNode";
import InstanceSmallNode from "@/components/common/InstanceSmallNode";

// 노드의 초깃값
const initialNodes: Node[] = [
  {
    id: "0",
    type: "instanceNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 290.7585098840026,
      y: 365.07355959139346,
    },
    width: 120,
    height: 120,
    selected: false,
    positionAbsolute: {
      x: 290.7585098840026,
      y: 365.07355959139346,
    },
    dragging: false,
  },
  {
    id: "1",
    type: "instanceInputNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 9.9067744669277,
      y: 699.4422745535387,
    },
    width: 100,
    height: 100,
    selected: false,
    positionAbsolute: {
      x: 9.9067744669277,
      y: 699.4422745535387,
    },
    dragging: false,
  },
  {
    id: "2",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: -223.33077031264818,
      y: 374.1395885355403,
    },
    width: 70,
    height: 70,
    selected: false,
    positionAbsolute: {
      x: -223.33077031264818,
      y: 374.1395885355403,
    },
    dragging: false,
  },
  {
    id: "3",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 49.076485273780605,
      y: 90.64663791870622,
    },
    width: 70,
    height: 70,
    selected: false,
    positionAbsolute: {
      x: 49.076485273780605,
      y: 90.64663791870622,
    },
    dragging: false,
  },
  {
    id: "4",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: -76.38467160842364,
      y: 239.95209399785426,
    },
    width: 70,
    height: 70,
    selected: false,
    positionAbsolute: {
      x: -76.38467160842364,
      y: 239.95209399785426,
    },
    dragging: false,
  },
  {
    id: "5",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 708.8317393286403,
      y: 409.6184538012201,
    },
    width: 70,
    height: 70,
    selected: false,
    positionAbsolute: {
      x: 708.8317393286403,
      y: 409.6184538012201,
    },
    dragging: false,
  },
  {
    id: "6",
    type: "instanceInputNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: -804.6753424271412,
      y: 96.62656832796809,
    },
    width: 100,
    height: 100,
    selected: false,
    positionAbsolute: {
      x: -804.6753424271412,
      y: 96.62656832796809,
    },
    dragging: false,
  },
  {
    id: "7",
    type: "instanceNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: -485.62715732256345,
      y: 123.57723915927113,
    },
    width: 120,
    height: 120,
    selected: false,
    positionAbsolute: {
      x: -485.62715732256345,
      y: 123.57723915927113,
    },
    dragging: false,
  },
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    type: "straight",
    source: "6",
    sourceHandle: null,
    target: "7",
    targetHandle: null,
    id: "reactflow__edge-6-7",
  },
  {
    type: "straight",
    source: "7",
    sourceHandle: null,
    target: "3",
    targetHandle: null,
    id: "reactflow__edge-7-3",
  },
  {
    type: "straight",
    source: "7",
    sourceHandle: null,
    target: "4",
    targetHandle: null,
    id: "reactflow__edge-7-4",
  },
  {
    type: "straight",
    source: "7",
    sourceHandle: null,
    target: "2",
    targetHandle: null,
    id: "reactflow__edge-7-2",
  },
  {
    type: "straight",
    source: "4",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-4-0",
  },
  {
    type: "straight",
    source: "2",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-2-0",
  },
  {
    type: "straight",
    source: "3",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-3-0",
  },
  {
    type: "straight",
    source: "0",
    sourceHandle: null,
    target: "5",
    targetHandle: null,
    id: "reactflow__edge-0-5",
  },
  {
    type: "straight",
    source: "1",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-1-0",
  },
];
// 커스텀 노드 타입
const nodeTypes = {
  customDefault: CustomNode,
  customInput: CustomNode,
  customOutput: CustomNode,
  instanceNode: InstanceNode,
  instanceInputNode: InstanceInputNode,
  instanceSmallNode: InstanceSmallNode,
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
  console.log("nodes: ", nodes);
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
      </ReactFlowProvider>
    </DashboardWrapperStyled>
  );
};

export default DashboardWrap;
