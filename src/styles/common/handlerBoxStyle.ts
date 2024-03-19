import styled from "styled-components";

export const HandlerBoxStyled = styled.div`
  /* position: absolute;
  z-index: 99;
  top: 3%;
  left: 1%; */
  background: #fff;
  border: 0.05rem solid #ddd;
  box-shadow: 0px 0px 17px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  isolation: isolate;
  form {
    position: relative;
    height: 100%;
    .submit-button {
      position: absolute;
      bottom: 0;
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
    & > ul {
      height: calc(100% - 4.6rem);
      overflow-y: auto;
      & > li {
        border-bottom: 0.05rem solid #ddd;
        &:last-of-type {
          border-bottom: 0;
        }
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
      display: block;
      width: 100%;
      border: 0.05rem solid #999;
      font-size: 1em;
      margin-top: 4px;
      padding: 0.4rem 0.6rem;
      border-radius: 4px;
      &:first-of-type {
        margin-top: 0;
      }
    }
    ol {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
`;
export const ImageButtonStyled = styled.div`
  & > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    & > li {
      position: relative;
      label {
        display: block;
        cursor: pointer;
        span {
          display: block;
          width: 100%;
          text-align: center;
          margin-top: 4px;
          font-size: 14px;
          background: #fff;
          border: 0.05rem solid #999;
          color: #000;
          padding: 4px 0;
          border-radius: 4px;
        }
      }
      input[type="radio"] {
        position: absolute;
        background-color: red;
      }
      input[type="radio"]:checked + label {
        span {
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
        }
      }
    }
  }
`;
export const RadioButtonStyled = styled.div`
  margin-bottom: 0.6rem;
  &:last-of-type {
    margin-bottom: 0;
  }
  & > ul {
    display: flex;
    align-items: center;
    & > li {
      position: relative;
      width: 100%;
      border: 0.05rem solid #999;
      border-right: 0;
      overflow: hidden;
      isolation: isolate;
      &:first-of-type {
        border-radius: 0.6rem 0 0 0.6rem;
      }
      &:last-of-type {
        border-right: 0.05rem solid #999;
        border-radius: 0 0.6rem 0.6rem 0;
      }
      label {
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 4rem;
        background: #fff;
        line-height: 1;
        cursor: pointer;
        .arrow {
          margin-right: 0.2rem;
        }
      }
      input[type="radio"] {
        position: absolute;
      }
      input[type="radio"]:checked + label {
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        .arrow {
          color: #fff;
        }
      }
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
