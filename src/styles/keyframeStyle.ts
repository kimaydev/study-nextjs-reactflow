import { keyframes } from "styled-components";

export const NodeAlarmKeyframe = keyframes`
  0%{
    opacity: 0.4;
    box-shadow: 0px 0px 6px 2px rgba(197, 12, 0, 0.3) inset;
  }
  100%{
    opacity: 1;
    box-shadow: 0px 0px 6px 2px rgba(197, 12, 0, 0.9) inset;
  }
`;
