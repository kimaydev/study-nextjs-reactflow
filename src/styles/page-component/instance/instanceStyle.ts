import styled from "styled-components";

export const InstanceNodeStyled = styled.div`
  position: relative;
  .react-flow__handle {
    width: 30%;
    height: 90%;
    background-color: transparent;
    border: 0;
    &.react-flow__handle-left {
      left: -4%;
      border-radius: 100% 0 0 100%;
    }
    &.react-flow__handle-right {
      right: -4%;
      border-radius: 0 100% 100% 0;
    }
  }
  .contents-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: #fff;
    .text-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      gap: 0.2em;
      & > b {
        font-size: 2em;
      }
      .alarm-list {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        & > li {
          & > i,
          & > span {
            display: inline-block;
          }
          & > i {
            vertical-align: top;
            margin-right: 0.1rem;
            &.bell {
              color: #ffc246;
            }
            &.warn {
              color: #ee5d50;
            }
          }
        }
      }
    }
  }
  .instance-title-contents {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    text-align: center;
    b,
    p {
      white-space: pre;
    }
    p {
      margin-top: 2px;
      color: #999;
    }
  }
  .instance-status-bar {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    & > ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 2rem;
      & > li {
        .count {
          display: inline-block;
          background-color: #1786c4;
          font-size: 0.6em;
          padding: 0 6px;
          color: #fff;
          height: 16px;
          line-height: 15px;
          border-radius: 10px;
        }
      }
    }
  }
`;
export const InstanceInputNodeStyled = styled(InstanceNodeStyled)`
  width: 100px;
  height: 100px;
  .contents-wrapper {
    border: 1px solid #999;
    .ant-progress {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
export const InstanceSmallNodeStyled = styled(InstanceInputNodeStyled)`
  width: 70px;
  height: 70px;
  .contents-wrapper {
    .instance-image-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 4rem;
    }
  }
`;
export const InstanceEdgeLabelStyled = styled.div`
  span {
    display: block;
    &.text {
      border: 1px solid #999;
      text-align: center;
      padding: 6px 14px;
      border-radius: 20px;
      background-color: #fff;
    }
    &.sub-text {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 6px;
      text-align: center;
      white-space: nowrap;
    }
  }
`;
