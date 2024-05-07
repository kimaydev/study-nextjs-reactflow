import styled from "styled-components";

export const HeaderStyled = styled.header`
  position: relative;
  height: 60px;
  background: #000;
  nav {
    .list {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      height: 100%;
      & > li {
        height: 100%;
      }
      a {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 20px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
`;
