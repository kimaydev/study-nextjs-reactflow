import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";
import BackgroundNode from "./BackgroundNode";

// 간선 스타일
const EDGES_STYLE = {
  strokeWidth: 5,
  stroke: "rgba(127,255,212,0.8)",
};
// 노드의 초깃값
const initialNodes: Node[] = [
  {
    id: "0",
    type: "backgroundNode",
    data: {},
    position: { x: 0, y: 0 },
    zIndex: -1,
    draggable: false,
    selectable: false,
  },
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 567, y: 116 },
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 407, y: 267 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 737, y: 267 } },
  { id: "4", data: { label: "Node 4" }, position: { x: 737, y: 423 } },
  { id: "5", data: { label: "Node 5" }, position: { x: 407, y: 423 } },
  { id: "6", data: { label: "Node 6" }, position: { x: 949, y: 423 } },
  { id: "7", data: { label: "Node 7" }, position: { x: 984, y: 608 } },
  { id: "8", data: { label: "Node 8" }, position: { x: 172, y: 533 } },
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    id: "reactflow__edge-1-2",
    source: "1",
    target: "2",
    type: "step",
    style: EDGES_STYLE,
  },
  {
    id: "reactflow__edge-1-3",
    source: "1",
    target: "3",
    type: "step",
    style: EDGES_STYLE,
  },
  {
    id: "reactflow__edge-3-4",
    source: "3",
    target: "4",
    type: "step",
    style: EDGES_STYLE,
  },
  {
    id: "reactflow__edge-2-5",
    source: "2",
    target: "5",
    type: "step",
    style: EDGES_STYLE,
  },
  {
    id: "reactflow__edge-3-6",
    source: "3",
    target: "6",
    type: "step",
    style: EDGES_STYLE,
  },
  {
    id: "reactflow__edge-6-7",
    source: "6",
    target: "7",
    type: "step",
    style: EDGES_STYLE,
    animated: true,
  },
  {
    id: "reactflow__edge-5-8",
    source: "5",
    target: "8",
    type: "step",
    style: EDGES_STYLE,
    animated: true,
  },
  {
    id: "reactflow__edge-4-7",
    source: "4",
    target: "7",
    type: "step",
    style: EDGES_STYLE,
    animated: true,
  },
];
// 커스텀 노드 타입
const nodeTypes = {
  backgroundNode: BackgroundNode,
};

const BackgroundWrap = () => {
  const [nodes, setNodes] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges] = useEdgesState<Edge[]>(initialEdges);
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
  // console.log("nodes", nodes);
  // console.log("edges", edges);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default BackgroundWrap;
