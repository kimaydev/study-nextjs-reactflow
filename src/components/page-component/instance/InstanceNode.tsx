import React from "react";
import { Position } from "reactflow";
import { PiBellSimpleFill, PiWarningCircleFill } from "react-icons/pi";
import { ConfigProvider, Progress } from "antd";
import CustomHandle from "@/components/common/CustomHandle";
import { InstanceNodeStyled } from "@/styles/page-component/instance/instanceStyle";

const InstanceNode = () => {
  return (
    <InstanceNodeStyled>
      <div className="contents-wrapper">
        {/* 출발 */}
        <CustomHandle type="source" position={Position.Right} />
        <div className="text-box">
          <b>1</b>
          <span>instance</span>
          <ul className="alarm-list">
            <li>
              <i className="bell">
                <PiBellSimpleFill />
              </i>
              <span>63</span>
            </li>
            <li>
              <i className="warn">
                <PiWarningCircleFill />
              </i>
              <span>3%</span>
            </li>
          </ul>
        </div>
        {/* 도착 */}
        <CustomHandle type="target" position={Position.Left} />
      </div>
      <div className="instance-title-contents">
        <b>CH-RetailAppAI</b>
        <p> </p>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Progress: {
              defaultColor: "#07BB62",
            },
          },
        }}
      >
        <Progress
          type="circle"
          percent={3}
          trailColor="#07BB62"
          strokeColor="#ee5d50"
          showInfo={false}
        />
      </ConfigProvider>
    </InstanceNodeStyled>
  );
};

export default React.memo(InstanceNode);
