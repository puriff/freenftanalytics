import React, {useState, useEffect, ReactElement} from 'react';
import logo from './logo.svg';
import './App.css';
import styled, {ThemeProvider} from "styled-components";
import Header from './Header';
import { lightTheme, darkTheme } from "./theme";
import {ethers} from "ethers"

const SignerBalancesContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.background};
    overflow-x: hidden;

    .connected {
      color: ${(props) => props.theme.search_cursor};
    }
`;

const freeNfts = [
  {name: "RoyalAura",
  address: "0x84E2dcD16B69e874B467e5fd77B64071b66Cd780"},
  {name: "GoldAura",
  address: "0xFDb1a33d1630aefa999eF43cc9Ddfd9f23eddeae"},
  {name: "FreeNFTOGPass",
  address: "0xfADc04b92DB0B0307773D53e207B055708A63639"},
  {name: "LaunchTicket",
  address: "0x671F3B17628B1498dB264e8Ac77da4E78167Ba9E"},
  {name: "DailyCargo",
  address: "0xCa6D7604ae55BA1bA864c26692a91979f25Cdb96"}
]

const abiERC721 = [
  "function balanceOf(address owner) public view returns (uint256) "
]


function SignerBalances({web3Provider}) {

  const [balance, setBalance] = useState("")

  useEffect(() => {
    if(web3Provider != null) {
        let signer = web3Provider?.getSigner()
        const address = async () => {
            let address = await signer?.getAddress()
            console.log(address)
        }
        address()
        getBalance()
    }
    
  }, [web3Provider])

  async function getBalance(){
    let signer = web3Provider?.getSigner()
    let address = await signer?.getAddress()
    let launchTicketContract = new ethers.Contract(freeNfts[3].address,abiERC721,signer)
    let launchTicketBalance = Number(await launchTicketContract.balanceOf(address)).toString()

    setBalance(launchTicketBalance)  
  }   

  return (
      <SignerBalancesContainer>
        <div className='connected'>
          {web3Provider != null ? 
            balance
           : 
           "Not connected" }
        </div>
      </SignerBalancesContainer>
  );
}

export default SignerBalances;
