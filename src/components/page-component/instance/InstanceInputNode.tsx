import React from "react";
import { Position } from "reactflow";
import { ConfigProvider, Progress } from "antd";
import CustomHandle from "@/components/common/CustomHandle";
import { InstanceInputNodeStyled } from "@/styles/page-component/instance/instanceStyle";

const InstanceInputNode = () => {
  return (
    <>
      <InstanceInputNodeStyled>
        <div className="contents-wrapper">
          {/* 출발 */}
          <CustomHandle type="source" position={Position.Right} />
          <ConfigProvider
            theme={{
              components: {
                Progress: {
                  circleTextColor: "#000",
                },
              },
              token: {
                colorSuccess: "#000",
              },
            }}
          >
            <Progress
              type="circle"
              percent={50}
              size={75}
              trailColor="#07BB62"
              strokeColor="#ee5d50"
              format={percent => percent + "%"}
            />
          </ConfigProvider>
        </div>
        <div className="instance-title-contents">
          <b>AVAILABILITY</b>
          <p> </p>
        </div>
        <div className="instance-status-bar">
          <ul>
            <li>
              <i className="icon">🌏</i>
            </li>
            <li>
              <span className="count">+2</span>
            </li>
          </ul>
        </div>
      </InstanceInputNodeStyled>
    </>
  );
};

export default React.memo(InstanceInputNode);
