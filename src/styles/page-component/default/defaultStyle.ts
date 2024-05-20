import styled from "styled-components";

export const DefaultLayoutStyled = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  height: 100%;
  .react-flow__pane {
    .react-flow__node {
      &.selected {
        .text-box {
          box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
`;
export const DefaultPanelListStyled = styled.nav`
  position: absolute;
  right: 10px;
  bottom: 20px;
  z-index: 10;
  button {
    display: block;
    width: 120px;
    padding: 10px 8px;
    font-size: 1.4rem;
    font-weight: 700;
    text-align: left;
    border: 1px solid #ddd;
    border-bottom: 0;
    background-color: #fff;
    &:hover {
      background-color: #f9f9f9;
    }
    i {
      display: inline-block;
      vertical-align: -2px;
      margin-right: 2px;
    }
  }
  & > ul {
    & > li {
      &:last-of-type {
        button {
          border-bottom: 1px solid #ddd;
        }
      }
    }
  }
`;
export const DefaultHandlerBoxStyled = styled.div`
  background: #fff;
  border: 0.5px solid #ddd;
  box-shadow: 0px 0px 17px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  isolation: isolate;
  width: 280px;
  height: 100%;
  h2 {
    display: flex;
    align-items: center;
    height: 4rem;
    padding: 0 1rem;
    font-size: 1.6rem;
    font-weight: 900;
    border-bottom: 0.5px solid #ddd;
    i {
      display: inline-block;
      vertical-align: top;
      margin-right: 0.4rem;
    }
  }
  form {
    position: relative;
    height: calc(100% - 4rem);
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
    .form-wrapper {
      height: calc(100% - 4.6rem);
      overflow-y: auto;
      & > ul {
        & > li {
          border-bottom: 0.5px solid #ddd;
          &:last-of-type {
            border-bottom: 0;
          }
        }
      }
    }
  }
  .form-box {
    padding: 1rem;
    font-size: 1.4rem;
    .form-item-title {
      display: block;
      font-size: 0.8em;
      margin-bottom: 0.6rem;
    }
    .input-text {
      display: block;
      width: 100%;
      border: 0.5px solid #999;
      font-size: 1em;
      margin-bottom: 6px;
      padding: 0.4rem 0.6rem;
      border-radius: 4px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    ol {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: center;
      gap: 1rem;
      label {
        width: 100%;
        height: 46.8px;
      }
      &.flex-list {
        grid-template-columns: auto 1fr;
        margin-top: 6px;
        label {
          height: auto;
        }
      }
    }
  }
`;
export const DefaultImageButtonStyled = styled.div`
  & > ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    & > li {
      position: relative;
      label {
        display: block;
        cursor: pointer;
        span {
          display: block;
          width: 100%;
          text-align: center;
          margin-top: 8px;
          font-size: 14px;
          background: #fff;
          border: 0.5px solid #999;
          color: #000;
          padding: 4px 0;
          border-radius: 4px;
        }
      }
      input[type="radio"] {
        position: absolute;
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
export const DefaultRadioButtonStyled = styled.div`
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
      border: 0.5px solid #999;
      overflow: hidden;
      isolation: isolate;
      &:last-of-type {
        border-right: 0.5px solid #999;
      }
      label {
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 3rem;
        background: #fff;
        line-height: 1;
        text-transform: capitalize;
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
export const DefaultRadioButtonTwoLineStyled = styled(DefaultRadioButtonStyled)`
  & > ul {
    flex-wrap: wrap;
    & > li {
      width: 50%;
    }
  }
`;
export const DefaultNodeColorRadioStyled = styled.div<{ $value: string }>`
  display: block;
  width: 4rem;
  height: 4rem;
  border: 0.5px solid #ddd;
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
    &.group-node {
      background: ${props => {
        switch (props.$value) {
          case "white":
            return "rgba(0, 0, 0, 0.05)";
          case "red":
            return "rgba(238, 93, 80, 0.5)";
          case "yellow":
            return "rgba(255, 194, 70, 0.5)";
          case "blue":
            return "rgba(91, 147, 255, 0.5)";
          case "green":
            return "rgba(7, 187, 98, 0.5)";
        }
      }};
    }
  }
`;
