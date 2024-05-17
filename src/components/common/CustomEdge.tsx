import React from "react";
import { EdgeStyled } from "@/styles/page-component/default/defaultNodeStyle";
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
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
  // 베지어 곡선 형태
  // const [edgePath, labelX, labelY] = getBezierPath({
  //   sourceX,
  //   sourceY,
  //   sourcePosition,
  //   targetX,
  //   targetY,
  //   targetPosition,
  // });
  // 직선 형태
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  // console.log(
  //   "getStraightPath",
  //   getStraightPath({
  //     sourceX,
  //     sourceY,
  //     targetX,
  //     targetY,
  //   }),
  // );
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
