import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import styled, {ThemeProvider} from "styled-components";
import Header from './Header';
import SignerBalances from './SignerBalances';
import { lightTheme, darkTheme } from "./theme";
import {ethers} from "ethers"

const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    background: ${(props) => props.theme.background};
    overflow-x: hidden;
`;

function App() {

  const [theme, setTheme] = useState("dark")
  const [web3Provider, setWeb3Provider] = useState(null)

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <Header theme={theme} setTheme={setTheme} web3Provider={web3Provider} setWeb3Provider={setWeb3Provider}/>
        <SignerBalances web3Provider={web3Provider}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
