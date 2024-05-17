import styled, { css } from "styled-components";
import { NodeAlarmKeyframe } from "@/styles/keyframeStyle";

export const ReactFlowLayoutStyled = styled.div`
  width: 100%;
  height: 100%;
`;
interface NodeStyledType {
  $alaramToggle: string;
  $color: string;
}
export const NodeStyled = styled.div<NodeStyledType>`
  width: 100px;
  .image-box {
    position: relative;
    padding: 10px;
    text-align: center;
    .alarm {
      position: absolute;
      top: 15px;
      right: 10px;
      z-index: 1;
      font-size: 12px;
      border-top: 0;
      border-right: 0;
      color: #fff;
      font-weight: 600;
      background: #ff5f67;
      border-radius: 100px;
      min-width: 25px;
      height: 24px;
      line-height: 23px;
      padding: 0 6px;
    }
  }
  .text-box {
    position: relative;
    background: ${props => {
      switch (props.$color) {
        case "white":
          return "#fff";
        case "red":
          return "#ee5d50";
        case "yellow":
          return "#ffc246";
        case "blue":
          return "#5b93ff";
        case "green":
          return "#07bb62";
      }
    }};
    border: 1px solid #000;
    padding: 4px 8px;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    color: ${props => {
      switch (props.$color) {
        case "white":
          return "#000";
        case "red":
          return "#fff";
        case "yellow":
          return "#000";
        case "blue":
          return "#fff";
        case "green":
          return "#fff";
      }
    }};
    p {
      font-size: 0.7em;
      margin-top: 2px;
      color: ${props => {
        switch (props.$color) {
          case "white":
            return "#000";
          case "red":
            return "#fff";
          case "yellow":
            return "#000";
          case "blue":
            return "#fff";
          case "green":
            return "#fff";
        }
      }};
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      ${({ $alaramToggle }) =>
        $alaramToggle === "on" &&
        css`
          animation: ${NodeAlarmKeyframe} 0.8s infinite alternate;
        `}
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
    background: #fff;
    border: 1px solid #000;
    box-shadow: 0px 7px 13px 0px rgba(0, 0, 0, 0.15);
    font-size: 1.4rem;
    overflow: hidden;
    isolation: isolate;
    .text-list {
      padding: 10px;
      border-bottom: 1px solid #000;
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
        border-bottom: 1px solid #000;
        &:last-of-type {
          border: 0;
        }
      }
      button {
        display: block;
        width: 100%;
        border: none;
        padding: 0.5em;
        text-align: left;
        background: #fff;
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
export const EdgeStyled = styled.div`
  position: absolute;
  pointer-events: all;
  .label {
    display: block;
    max-width: 100px;
    padding: 5px 10px;
    word-wrap: break-word;
    line-height: 1.5;
    background: #ff0072;
    color: #fff;
  }
`;
