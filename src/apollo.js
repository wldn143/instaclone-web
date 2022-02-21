import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE"
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token)=>{
    localStorage.setItem(TOKEN,token)
    isLoggedInVar(true);
}

export const logUserOut = (history)=>{
    localStorage.removeItem(TOKEN)
    history?.replace();
    window.location.reload();
}

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode=()=>{
    localStorage.setItem(DARK_MODE,"enable")
    darkModeVar(true)
}

export const disableDarkMode=()=>{
    localStorage.setItem(DARK_MODE,"disable")
    darkModeVar(false);
}

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});