import React from "react";
import { NodeProps, NodeResizer } from "reactflow";
import { GroupNodeStyled } from "@/styles/page-component/default/defaultNodeStyle";

const CustomGroupNode = ({ data, selected }: NodeProps) => {
  // console.log("data props: ", data);
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <GroupNodeStyled $color={data?.color}>{data.label}</GroupNodeStyled>
    </>
  );
};

export default React.memo(CustomGroupNode);
