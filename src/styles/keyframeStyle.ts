import { keyframes } from "styled-components";

export const NodeAlarmKeyframe = keyframes`
  0%{
    opacity: 0.4;
    box-shadow: 0px 0px 15px 5px rgba(197, 12, 0, 0.3) inset;
  }
  100%{
    opacity: 1;
    box-shadow: 0px 0px 15px 5px rgba(197, 12, 0, 0.9) inset;
  }
`;
