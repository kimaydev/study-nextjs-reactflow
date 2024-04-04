import ChartNode from "@/components/chart/ChartNode";
import React, { useCallback, useState } from "react";
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
} from "reactflow";

// 노드의 초깃값
const initialNodes: Node[] = [
  {
    id: "0",
    type: "chartNode",
    data: {
      label: "Node 1",
    },
    position: {
      x: 703,
      y: 374,
    },
  },
];
// 간선의 초깃값
const initialEdges: Edge[] = [];
// 커스텀 노드 타입
const nodeTypes = {
  chartNode: ChartNode,
};

const ChartPage = () => {
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
    params => setEdges(eds => addEdge(params, eds)),
    [],
  );
  // console.log("nodes", nodes);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default ChartPage;
