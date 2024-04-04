import styled from "styled-components";

export const ChartNodeStyled = styled.div`
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  .react-flow__handle {
    background-color: pink;
    width: 15px;
    height: 100%;
    border-radius: 0;
    border: 0;
    &.react-flow__handle-left {
      left: -14px;
      border-radius: 6px 0 0 6px;
    }
    &.react-flow__handle-right {
      right: -14px;
      border-radius: 0 6px 6px 0;
    }
  }
  .contents-wrapper {
    width: 350px;
    height: 240px;
    overflow: hidden;
    padding: 10px;
    .chart-wrapper {
      height: 100%;
      .echarts-for-react {
        height: 100% !important;
      }
    }
  }
`;
