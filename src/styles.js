import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

export const LightTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",
};
  
export const darkTheme = {
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
  bgColor: "#000",
  fontColor: "white",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.fontColor};

    }
    form{
          background-color:${(props) => props.theme.bgColor};
        }
    a {
      text-decoration: none;
    }
`;