import React from "react";
import { NodeProps, NodeResizer } from "reactflow";
import { GroupNodeStyled } from "@/styles/page-component/default/defaultNodeStyle";

const CustomGroupNode = ({ data, selected }: NodeProps) => {
  // console.log("data props: ", data);
  return (
    <>
      <NodeResizer
        color="#000"
        isVisible={selected}
        minWidth={100}
        minHeight={100}
      />
      <GroupNodeStyled $color={data?.color} />
    </>
  );
};

export default React.memo(CustomGroupNode);
