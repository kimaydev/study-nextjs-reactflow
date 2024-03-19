import styled, { css } from "styled-components";
import { NodeAlarmKeyframe } from "../keyframeStyle";

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
`;
