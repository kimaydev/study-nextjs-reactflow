import React from "react";
import { EdgeStyled } from "@/styles/page-component/default/defaultNodeStyle";
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  useReactFlow,
} from "reactflow";

const CustomEdge = ({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = { stroke: "#FF0072" },
  markerEnd,
}: EdgeProps) => {
  const { getEdge, setEdges } = useReactFlow();
  // console.log("간선", data.baseEdge);
  // baseEdge 값에 따라 간선의 형태 변경(기본값은 베지어 곡선)
  type baseEdgeType = () => [string, number, number];
  const baseEdge: baseEdgeType = () => {
    if (data.baseEdge === "straight") {
      const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
      return [edgePath, labelX, labelY];
    } else if (data.baseEdge === "step") {
      const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        borderRadius: 0,
      });
      return [edgePath, labelX, labelY];
    } else if (data.baseEdge === "smoothstep") {
      const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        borderRadius: 5,
      });
      return [edgePath, labelX, labelY];
    }
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
    return [edgePath, labelX, labelY];
  };
  const [edgePath, labelX, labelY] = baseEdge();
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <EdgeStyled
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          <span className="label">{data.baseEdge}</span>
        </EdgeStyled>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
