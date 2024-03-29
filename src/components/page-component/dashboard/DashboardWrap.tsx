import React, { useCallback, useRef, useState } from "react";
import HandlerBox from "@/components/common/HandlerBox";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  EdgeProps,
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
import ContextMenu from "@/components/common/ContextMenu";
import { INodeContextMenuType } from "@/utils/type/interface";
import HandlerEditBox from "@/components/common/HandlerEditBox";
import InstanceNode from "@/components/common/InstanceNode";
import InstanceInputNode from "@/components/common/InstanceInputNode";
import InstanceSmallNode from "@/components/common/InstanceSmallNode";
import FloatingEdge from "@/components/floating_edge/FloatingEdge";
import FloatingConnectionLine from "@/components/floating_edge/FloatingConnectionLine";

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
    positionAbsolute: {
      x: 290.7585098840026,
      y: 365.07355959139346,
    },
  },
  {
    id: "1",
    type: "instanceInputNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 344.1981907726394,
      y: 695.9600723003543,
    },
    width: 100,
    height: 100,
    positionAbsolute: {
      x: 344.1981907726394,
      y: 695.9600723003543,
    },
  },
  {
    id: "2",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: -110.78710749019235,
      y: 376.02307163665665,
    },
    width: 70,
    height: 70,
    positionAbsolute: {
      x: -110.78710749019235,
      y: 376.02307163665665,
    },
  },
  {
    id: "3",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 254.52641821166594,
      y: 41.895806374123225,
    },
    width: 70,
    height: 70,
    positionAbsolute: {
      x: 254.52641821166594,
      y: 41.895806374123225,
    },
  },
  {
    id: "4",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 81.35002527850976,
      y: 197.7643861117085,
    },
    width: 70,
    height: 70,
    positionAbsolute: {
      x: 81.35002527850976,
      y: 197.7643861117085,
    },
  },
  {
    id: "5",
    type: "instanceSmallNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 616.5533796192511,
      y: 425.2883639405503,
    },
    width: 70,
    height: 70,
    positionAbsolute: {
      x: 616.5533796192511,
      y: 425.2883639405503,
    },
  },
  {
    id: "6",
    type: "instanceInputNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: -443.73680299641256,
      y: -218.00774631773115,
    },
    width: 100,
    height: 100,
    positionAbsolute: {
      x: -443.73680299641256,
      y: -218.00774631773115,
    },
  },
  {
    id: "7",
    type: "instanceNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: -170.45558409406735,
      y: -36.49395182799088,
    },
    width: 120,
    height: 120,
    positionAbsolute: {
      x: -170.45558409406735,
      y: -36.49395182799088,
    },
  },
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    type: "floating",
    source: "6",
    sourceHandle: null,
    target: "7",
    targetHandle: null,
    id: "reactflow__edge-6-7",
    data: {
      time: "3s",
      calls: "116 tests",
    },
  },
  {
    type: "floating",
    source: "7",
    sourceHandle: null,
    target: "3",
    targetHandle: null,
    id: "reactflow__edge-7-3",
    data: {
      time: "10.4ms",
      calls: "1.4K calls",
    },
  },
  {
    type: "floating",
    source: "7",
    sourceHandle: null,
    target: "4",
    targetHandle: null,
    id: "reactflow__edge-7-4",
    data: {
      time: "14.9ms",
      calls: "453 calls",
    },
  },
  {
    type: "floating",
    source: "7",
    sourceHandle: null,
    target: "2",
    targetHandle: null,
    id: "reactflow__edge-7-2",
    data: {
      time: "11.7ms",
      calls: "1.8K calls",
    },
  },
  {
    type: "floating",
    source: "4",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-4-0",
    data: {
      time: "8.7ms",
      calls: "202 calls",
    },
  },
  {
    type: "floating",
    source: "2",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-2-0",
    data: {
      time: "10.7ms",
      calls: "760 calls",
    },
  },
  {
    type: "floating",
    source: "3",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-3-0",
    data: {
      time: "11.7ms",
      calls: "570 calls",
    },
  },
  {
    type: "floating",
    source: "0",
    sourceHandle: null,
    target: "5",
    targetHandle: null,
    id: "reactflow__edge-0-5",
    data: {
      time: "21.4ms",
      calls: "36 calls",
    },
  },
  {
    type: "floating",
    source: "1",
    sourceHandle: null,
    target: "0",
    targetHandle: null,
    id: "reactflow__edge-1-0",
    data: {
      time: "1.2s",
      calls: "385 tests",
    },
  },
];
// 커스텀 노드 타입
const nodeTypes = {
  instanceNode: InstanceNode,
  instanceInputNode: InstanceInputNode,
  instanceSmallNode: InstanceSmallNode,
};
// 커스텀 엣지 타입
const edgeTypes = {
  floating: FloatingEdge,
};

const DashboardWrap = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  // contextMenu state
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
    params =>
      setEdges(eds =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerStart: {
              type: MarkerType.ArrowClosed,
              orient: "auto-start-reverse",
            },
            markerEnd: { type: MarkerType.Arrow },
          },
          eds,
        ),
      ),
    [setEdges],
  );
  // 노드 마우스 오른쪽 클릭 이벤트
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
  // console.log("nodes: ", nodes);
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
          // onNodeContextMenu={onNodeContextMenu}
          fitView
          edgeTypes={edgeTypes}
          connectionLineComponent={FloatingConnectionLine}
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
