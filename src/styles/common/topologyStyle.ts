import styled, { css } from "styled-components";
import { NodeAlarmKeyframe } from "../keyframeStyle";

export const ReactFlowLayoutStyled = styled.div`
  width: 100%;
  height: 100%;
`;

export const NodeStyled = styled.div<{ $alaramToggle: string }>`
  width: 100px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    ${({ $alaramToggle }) =>
      $alaramToggle === "on" &&
      css`
        animation: ${NodeAlarmKeyframe} 0.8s infinite alternate;
      `}
  }
  .image-box {
    position: relative;
    padding: 10px;
    text-align: center;
    .alarm {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      font-size: 12px;
      border: 2px solid #fff;
      border-top: 0;
      border-right: 0;
      color: #fff;
      font-weight: 600;
      background: #ff5f67;
      border-radius: 0px 0px 0px 10px;
      min-width: 25px;
      height: 24px;
      line-height: 22px;
      padding: 0 6px;
    }
  }
  .text-box {
    border-top: 1px solid #000;
    padding: 8px;
    text-align: center;
    font-size: 14px;
    p {
      font-size: 0.8em;
      margin-top: 2px;
      color: #ed8e00;
    }
  }
  .react-flow__handle {
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
    border-radius: 100%;
    z-index: 2;
    &.react-flow__handle-top {
      top: -5px;
    }
    &.react-flow__handle-bottom {
      bottom: -5px;
    }
    &.react-flow__handle-left {
      left: -5px;
    }
    &.react-flow__handle-right {
      right: -5px;
    }
  }
`;
export const ContextMenuStyled = styled.div`
  & > div {
    position: absolute;
    z-index: 10;
    width: 16rem;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 6px;
    box-shadow: 0px 5px 17px 0px rgba(0, 0, 0, 0.3);
    font-size: 1.4rem;
    .text-list {
      padding: 10px;
      border-bottom: 1px solid #eee;
      li {
        margin-bottom: 6px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
      .list-title,
      .list-content {
        display: block;
      }
      .list-title {
        font-size: 0.85em;
        margin-bottom: 6px;
        font-weight: 600;
      }
      .list-content {
      }
      .top-list {
        .list-title {
          font-size: 1.2em;
          margin-bottom: 4px;
        }
        .list-content {
          font-size: 0.85em;
          color: #ed8e00;
        }
      }
    }
    .button-list {
      li {
        padding: 4px;
        border-bottom: 1px solid #eee;
      }
      button {
        display: block;
        width: 100%;
        border: none;
        padding: 0.5em;
        text-align: left;
        background: #fff;
        border-radius: 4px;
        &:hover {
          background: #eee;
        }
        i,
        span {
          display: inline-block;
        }
        i {
          vertical-align: top;
          margin-right: 2px;
        }
      }
    }
  }
`;
