import React, { useCallback, useState } from "react";
import HandlerBox from "@/components/common/HandlerBox";
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
import { DashboardWrapperStyled } from "@/styles/dashboard/dashboardStyle";
import CustomNode from "@/components/common/CustomNode";

// 노드의 초깃값
const initialNodes: Node[] = [];
// 간선의 초깃값
const initialEdges: Edge[] = [];
// 커스텀 노드 타입
const nodeTypes = {
  custom: CustomNode,
};

const DashboardWrap = () => {
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
  console.log("nodes: ", nodes);
  // console.log("edges: ", edges);
  return (
    <DashboardWrapperStyled>
      {/* 토폴로지 */}
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {/* 토폴로지 커스텀 핸들러 박스 */}
      <HandlerBox nodes={nodes} setNodes={setNodes} />
    </DashboardWrapperStyled>
  );
};

export default DashboardWrap;
