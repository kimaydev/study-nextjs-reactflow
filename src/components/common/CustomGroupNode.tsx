import React, { useRef } from "react";
import { NodeProps, NodeResizer } from "reactflow";
import { GroupNodeStyled } from "@/styles/page-component/default/defaultNodeStyle";

const CustomGroupNode = ({ data, selected }: NodeProps) => {
  const ref = useRef<any>(null);
  // const pane = ref.current?.getBoundingClientRect();
  // console.log("pane", pane);
  return (
    <>
      <NodeResizer
        color="#000"
        isVisible={selected}
        minWidth={100}
        minHeight={100}
      />
      <GroupNodeStyled $color={data?.color} ref={ref} />
    </>
  );
};

export default React.memo(CustomGroupNode);
