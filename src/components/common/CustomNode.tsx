import React, { useState } from "react";
import CustomHandle from "./CustomHandle";
import { NodeProps, Position } from "reactflow";
import Image from "next/image";
import { NodeStyled } from "@/styles/common/topologyStyle";

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
  // console.log("data props: ", data);
  return (
    <>
      <NodeStyled $alaramToggle={data?.alaramToggle}>
        {type === "customDefault" || type === "customInput" ? (
          // 출발
          <CustomHandle
            type="source"
            position={
              (sourcePosition === "right" && Position.Right) ||
              (sourcePosition === "bottom" && Position.Bottom)
            }
          />
        ) : null}
        <div className="image-box">
          <i className="alarm">{data?.alaram >= 100 ? "99+" : data.alaram}</i>
          <Image
            src={`/assets/images/${(data?.nodeImage === "demoOne" && "icon_demo_001.png") || (data?.nodeImage === "demoTwo" && "icon_demo_002.png") || (data?.nodeImage === "demoThree" && "icon_demo_003.png")}`}
            width="60"
            height="60"
            priority={true}
            alt="데모001"
          />
        </div>
        <div className="text-box">
          <b>{data?.label}</b>
          <p>{data?.desc}</p>
        </div>
        {type === "customDefault" || type === "customOutput" ? (
          // 도착
          <CustomHandle
            type="target"
            position={
              (targetPosition === "left" && Position.Left) ||
              (targetPosition === "top" && Position.Top)
            }
          />
        ) : null}
      </NodeStyled>
    </>
  );
};

export default CustomNode;
