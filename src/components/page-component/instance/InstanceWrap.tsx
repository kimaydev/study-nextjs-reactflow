import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import InstanceNode from "./InstanceNode";
import InstanceInputNode from "./InstanceInputNode";
import InstanceSmallNode from "./InstanceSmallNode";
import FloatingEdge from "@/components/common/floating_edge/FloatingEdge";
import FloatingConnectionLine from "@/components/common/floating_edge/FloatingConnectionLine";

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
  },
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    type: "floating",
    source: "6",
    target: "7",
    id: "reactflow__edge-6-7",
    data: {
      time: "3s",
      calls: "116 tests",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "7",
    target: "3",
    id: "reactflow__edge-7-3",
    data: {
      time: "10.4ms",
      calls: "1.4K calls",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "7",
    target: "4",
    id: "reactflow__edge-7-4",
    data: {
      time: "14.9ms",
      calls: "453 calls",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "7",
    target: "2",
    id: "reactflow__edge-7-2",
    data: {
      time: "11.7ms",
      calls: "1.8K calls",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "0",
    target: "4",
    id: "reactflow__edge-0-4",
    data: {
      time: "8.7ms",
      calls: "202 calls",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "0",
    target: "2",
    id: "reactflow__edge-0-2",
    data: {
      time: "10.7ms",
      calls: "760 calls",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "0",
    target: "3",
    id: "reactflow__edge-0-3",
    data: {
      time: "11.7ms",
      calls: "570 calls",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "0",
    target: "5",
    id: "reactflow__edge-0-5",
    data: {
      time: "21.4ms",
      calls: "36 calls",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    type: "floating",
    source: "1",
    target: "0",
    id: "reactflow__edge-1-0",
    data: {
      time: "1.2s",
      calls: "385 tests",
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
// 커스텀 노드 타입
const nodeTypes = {
  instanceNode: InstanceNode,
  instanceInputNode: InstanceInputNode,
  instanceSmallNode: InstanceSmallNode,
};
// 커스텀 간선 타입
const edgeTypes = {
  floating: FloatingEdge,
};

const InstanceWrap = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
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
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds,
        ),
      ),
    [setEdges],
  );
  // console.log("edges", edges);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      connectionLineComponent={FloatingConnectionLine}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default InstanceWrap;
