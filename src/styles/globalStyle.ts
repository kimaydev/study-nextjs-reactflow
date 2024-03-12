import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
// reset
  *,
*::before,
*::after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

html {
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
    box-sizing: border-box;
}

body,
button,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
input,
legend,
li,
ol,
p,
select,
table,
td,
textarea,
th,
ul,
figure,
figcaption {
    margin: 0;
    padding: 0;
}

a,
a:hover,
a:focus {
    text-decoration: none;
}

button,
html input[type='button'],
input[type='reset'],
input[type='submit'] {
    appearance: button;
    cursor: pointer;
}

input,
textarea,
button,
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    -o-border-radius: 0;
    border-radius: 0;
}
table,
input,
button,
select,
optgroup,
textarea {
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight: normal;
}
ul,li {
    list-style: none;
}
em,
address {
    font-style: normal;
}
strong {
    font-weight: normal;
}

table {
    border: 0;
    border-collapse: collaspe;
    border-spacing: 0;
    width: 100%;
}
/* global style */
html,
body {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: -0.42px;
  line-height: 1;
  color: #000;
}
main{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
h2{
  font-size: 1.4rem;
  font-weight: 700;
}
h3 {
  font-size: 1.6rem;
  font-weight: 700;    
  }
button{
    border: 0;
    background: transparent;
}
i {
    font-style: normal;
}
`;
