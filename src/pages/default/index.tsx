import { ReactFlowLayoutStyled } from "@/styles/common/topologyStyle";
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
    id: "1",
    type: "input",
    data: {
      label: "Input Node",
    },
    position: {
      x: 636,
      y: 76,
    },
  },
  {
    id: "2",
    data: {
      label: "Default Node",
    },
    position: {
      x: 636,
      y: 176,
    },
  },
  {
    id: "3",
    type: "output",
    data: {
      label: "Output Node 01",
    },
    position: {
      x: 440,
      y: 330,
    },
  },
  {
    id: "4",
    type: "output",
    data: {
      label: "Output Node 02",
    },
    position: {
      x: 840,
      y: 330,
    },
  },
];
// 간선의 초깃값
const initialEdges: Edge[] = [
  {
    id: "reactflow__edge-1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "reactflow__edge-2-3",
    source: "2",
    target: "3",
    type: "step",
  },
  {
    id: "reactflow__edge-2-4",
    source: "2",
    target: "4",
    type: "step",
  },
];

const DefaultPage = () => {
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
  // console.log("edges", edges);
  return (
    <ReactFlowLayoutStyled>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </ReactFlowLayoutStyled>
  );
};

export default DefaultPage;
