import styled from "styled-components";

export const HeaderStyled = styled.header`
  background: #000;
  nav {
    .list {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      a {
        display: block;
        padding: 15px 20px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
`;
