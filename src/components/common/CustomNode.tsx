import React from "react";
import Image from "next/image";
import { NodeProps, Position } from "reactflow";
import { getImage, getImageAlt } from "@/hooks/useTrans";
import CustomHandle from "./CustomHandle";
import { NodeStyled } from "@/styles/page-component/default/defaultNodeStyle";

interface ICustomNodeProps extends NodeProps {
  style?: React.CSSProperties;
}

const CustomNode = ({
  data,
  targetPosition,
  sourcePosition,
  type,
}: ICustomNodeProps) => {
  // props를 통해 마지막으로 추가된 노드의 값을 가져올 수 있다.
  // source: 출발 지점 | target: 도착 지점
  // console.log("data props: ", data);
  return (
    <>
      <NodeStyled $alaramToggle={data?.alarm} $color={data?.color}>
        <div className="image-box">
          <i className="alarm">
            {data?.alarmCount >= 100 ? "99+" : data.alarmCount}
          </i>
          {data?.image && (
            <Image
              src={`/assets/images/${getImage(data.image)}`}
              width="60"
              height="60"
              priority={true}
              alt={getImageAlt(data.image)}
            />
          )}
        </div>
        <div className="text-box">
          <b>{data?.title}</b>
          <p>{data?.desc}</p>
          {/* 출발 */}
          {type === "customDefault" || type === "customInput" ? (
            <CustomHandle
              type="source"
              position={
                (sourcePosition === "right" && Position.Right) ||
                (sourcePosition === "bottom" && Position.Bottom)
              }
            />
          ) : null}
          {/* 도착 */}
          {type === "customDefault" || type === "customOutput" ? (
            <CustomHandle
              type="target"
              position={
                (targetPosition === "left" && Position.Left) ||
                (targetPosition === "top" && Position.Top)
              }
            />
          ) : null}
        </div>
      </NodeStyled>
    </>
  );
};

export default React.memo(CustomNode);
