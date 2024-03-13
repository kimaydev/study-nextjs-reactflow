import React from "react";
import CustomHandle from "./CustomHandle";
import { Position } from "reactflow";

const CustomNode = () => {
  return (
    <div
      style={{ background: "white", padding: 16, border: "1px solid black" }}
    >
      <CustomHandle type="target" position={Position.Top} isConnectable={1} />
      <div>Connection Limit 1</div>
    </div>
  );
};

export default CustomNode;
