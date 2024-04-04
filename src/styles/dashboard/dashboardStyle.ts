import styled from "styled-components";

export const DashboardLayoutStyled = styled.div`
  width: 100%;
  height: 100%;
  .list {
    & > li {
      a {
        display: block;
        font-size: 2rem;
        padding: 1rem;
      }
    }
  }
`;
export const DashboardWrapperStyled = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  height: 100%;
`;
