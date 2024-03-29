import { useCallback } from "react";
import {
  useStore,
  getStraightPath,
  EdgeProps,
  EdgeLabelRenderer,
} from "reactflow";
import { getEdgeParams } from "./FloatingUtils";
import { InstanceEdgeLabelStyled } from "@/styles/common/handlerBoxStyle";

function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style,
  data,
}: EdgeProps) {
  const sourceNode = useStore(
    useCallback(store => store.nodeInternals.get(source), [source]),
  );
  const targetNode = useStore(
    useCallback(store => store.nodeInternals.get(target), [target]),
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  );

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        style={style}
      />
      {data && (
        <EdgeLabelRenderer>
          <InstanceEdgeLabelStyled
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="nodrag nopan"
          >
            <span className="text">{data?.time}</span>
            <span className="sub-text">{data?.calls}</span>
          </InstanceEdgeLabelStyled>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default FloatingEdge;
