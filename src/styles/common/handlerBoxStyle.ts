import styled from "styled-components";

export const HandlerBoxStyled = styled.div`
  position: absolute;
  z-index: 99;
  top: 3%;
  left: 1%;
  background: #fff;
  border: 0.05rem solid #ddd;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 15px;
  overflow: hidden;
  isolation: isolate;
  ul {
    & > li {
      border-bottom: 0.05rem solid #ddd;
      .submit-button {
        display: block;
        width: 100%;
        padding: 1.4rem;
        font-size: 1.8rem;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        &:hover {
          background: rgba(0, 0, 0, 1);
        }
      }
      &:last-of-type {
        border-bottom: 0;
      }
    }
  }
  .form-box {
    padding: 1.4rem;
    font-size: 1.6rem;
    .form-item-title {
      display: block;
      font-size: 1em;
      margin-bottom: 0.6rem;
    }
    .input-text {
      width: 100%;
      border: 0.05rem solid #999;
      font-size: 1em;
      padding: 0.4rem 0.6rem;
    }
    ol {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
`;
export const NodeColorRadioStyled = styled.label<{ $value: string }>`
  display: block;
  width: 4rem;
  height: 4rem;
  border: 0.05rem solid #ddd;
  border-radius: 0.6rem;
  overflow: hidden;
  isolation: isolate;
  input {
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
    border: 0.4rem solid transparent;
    background: ${props => {
      switch (props.$value) {
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
    cursor: pointer;
    &:checked {
      border-color: rgba(0, 0, 0, 0.8);
    }
  }
`;
