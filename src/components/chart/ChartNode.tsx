import React, { useState } from "react";
import { Position } from "reactflow";
import CustomHandle from "../common/CustomHandle";
import { ChartNodeStyled } from "@/styles/chart/chartStyle";
import EChartsReact from "echarts-for-react";

const ChartNode = () => {
  const [options, setOptions] = useState({
    title: {
      text: "Chart Node",
    },
    grid: {
      left: "10%",
      right: "3%",
      top: "20%",
      bottom: "12%",
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });
  return (
    <ChartNodeStyled>
      {/* 출발 */}
      <CustomHandle type="source" position={Position.Right} />
      <div className="contents-wrapper">
        <div className="chart-wrapper">
          <EChartsReact
            option={options}
            opts={{ renderer: "canvas", width: "auto", height: "auto" }}
          />
        </div>
      </div>
      {/* 도착 */}
      <CustomHandle type="target" position={Position.Left} />
    </ChartNodeStyled>
  );
};

export default ChartNode;
