import { InstanceSmallNodeStyled } from "@/styles/common/handlerBoxStyle";
import React from "react";
import { FcCalendar } from "react-icons/fc";
import CustomHandle from "./CustomHandle";
import { Position } from "reactflow";

const InstanceSmallNode = () => {
  return (
    <InstanceSmallNodeStyled>
      <div className="contents-wrapper">
        {/* 출발 */}
        <CustomHandle type="source" position={Position.Right} />
        <div className="instance-image-wrapper">
          <FcCalendar />
        </div>
        {/* 도착 */}
        <CustomHandle type="target" position={Position.Left} />
      </div>
      <div className="instance-title-contents">
        <b>AVAILABILITY</b>
        <p>AZURE QUEUE</p>
      </div>
    </InstanceSmallNodeStyled>
  );
};

export default React.memo(InstanceSmallNode);
