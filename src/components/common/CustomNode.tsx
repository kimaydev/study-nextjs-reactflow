import React, { useState } from "react";
import CustomHandle from "./CustomHandle";
import { NodeProps, Position } from "reactflow";

interface ICustomNodeProps extends NodeProps {
  style?: React.CSSProperties;
}

const CustomNode = ({
  data,
  style,
  targetPosition,
  sourcePosition,
  type,
}: ICustomNodeProps) => {
  // props를 통해 마지막으로 추가된 노드의 값을 가져올 수 있다.
  // source: 출발 지점
  // target: 도착 지점
  return (
    <>
      <div
        style={{
          background: style?.backgroundColor,
          padding: 16,
          border: `1px solid #000`,
          borderColor: style?.borderColor,
        }}
      >
        {type === "customDefault" || type === "customInput" ? (
          // 출발
          <CustomHandle
            type="source"
            position={
              (sourcePosition === "right" && Position.Right) ||
              (sourcePosition === "bottom" && Position.Bottom)
            }
            // isConnectable={data?.edgesLimit ? data?.edgesLimit : true}
          />
        ) : null}
        <div>{data?.label}</div>
        {type === "customDefault" || type === "customOutput" ? (
          // 도착
          <CustomHandle
            type="target"
            position={
              (targetPosition === "left" && Position.Left) ||
              (targetPosition === "top" && Position.Top)
            }
            // isConnectable={data?.edgesLimit ? data?.edgesLimit : true}
          />
        ) : null}
      </div>
    </>
  );
};

export default CustomNode;
