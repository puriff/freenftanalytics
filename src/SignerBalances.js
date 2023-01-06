import React, {useState, useEffect, ReactElement} from 'react';
import logo from './logo.svg';
import './App.css';
import styled, {ThemeProvider} from "styled-components";
import Header from './Header';
import { lightTheme, darkTheme } from "./theme";
import {ethers} from "ethers"
import { Button } from '@mui/material';

const SignerBalancesContainer = styled.div`
    overflow-x: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;

    .content {
      color: ${(props) => props.theme.search_cursor};
      position: relative;
      width: 95%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 5%;
      background: ${(props) => props.theme.content_div};
      padding-top: 5%;
      border-radius: 10px;
      margin-bottom: 5%;

      .nft-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 50%;
        width: 90%;
        margin-bottom: 5%;
        padding-top: 5%;
        padding-bottom: 5%;
        background: ${(props) => props.theme.column_background};
        border-radius: 10px;

        .item-name {
          color: ${(props) => props.theme.search_cursor};
          font-size: 24px;
          margin-bottom: 0;
        }

        .cargo-streak {
          color: ${(props) => props.theme.search_cursor};
          font-size: 16px;
          margin-top: 0;
        }

        .img-nft {
          width: 80%;
          aspect-ratio: 1/1;
          border-radius: 10px;
        }
      }
    }

    @media only screen and (min-width: 480px) {
    }

    @media only screen and (min-width: 768px) {
      overflow-x: hidden;
      display: flex;
      align-items: center;
      flex-direction: column;

      .content {
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        .nft-item {
          flex-direction: column;
          width: 30%;
          margin-left: 1%;
          margin-right: 1%;
          background: ${(props) => props.theme.column_background};
          border-radius: 10px;

          .item-name {
            color: ${(props) => props.theme.search_cursor};
            font-size: 20px;
            margin-bottom: 0;
          }

          .cargo-streak {
            position: absolute;
            bottom: 0;
            color: ${(props) => props.theme.search_cursor};
            font-size: 14px;
            margin-top: 0;
          }

          .img-nft {
            width: 80%;
            aspect-ratio: 1/1;
            border-radius: 10px;
          }
        }
      }
    }

    @media only screen and (min-width: 1280px) {
      overflow-x: hidden;
      display: flex;
      align-items: center;
      flex-direction: column;

      .content {
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 1%;
        padding-top: 1%;

        .nft-item {
          flex-direction: column;
          width: 15%;
          padding-top: 1%;
          padding-bottom: 3%;
          margin-bottom: 1%;
          margin-bottom: 1%;
          margin-left: 5px;
          margin-right: 5px;
          background: ${(props) => props.theme.column_background};
          border-radius: 10px;

          .item-name {
            color: ${(props) => props.theme.search_cursor};
            font-size: 20px;
            margin-bottom: 0;
          }

          .cargo-streak {
            position: absolute;
            bottom: 0;
            color: ${(props) => props.theme.search_cursor};
            font-size: 14px;
            margin-top: 0;
          }

          .img-nft {
            width: 80%;
            aspect-ratio: 1/1;
            border-radius: 10px;
          }
        }
      }
    }  
    
`;

const freeNfts = [
  { id: "royal",
    name: "Royal Aura",
    address: "0x84E2dcD16B69e874B467e5fd77B64071b66Cd780",
    image: "https://gateway.pinata.cloud/ipfs/QmbDM4eHdoWZSWUNefQfjT2yKBqFwadmLEp7nsJTf7AYuG"},
  { id: "gold",
    name: "Gold Aura",
    address: "0xFDb1a33d1630aefa999eF43cc9Ddfd9f23eddeae",
    image: "https://gateway.pinata.cloud/ipfs/QmRWkECynN5X1HgQ3HTd3Zfs2oPDoi13DZtP3dqxEbP65w"},
  { id: "og",
    name: "FreeNFT OG Pass",
    address: "0xfADc04b92DB0B0307773D53e207B055708A63639",
    image: "https://gateway.pinata.cloud/ipfs/QmYEhJ7e51jF1A4Z9hSoCysnYEVC5SmCnh3B7i4JpLrB3C"},
  { id: "launch",
    name: "Launch Ticket",
    address: "0x671F3B17628B1498dB264e8Ac77da4E78167Ba9E",
    image: "https://gateway.pinata.cloud/ipfs/Qmay1gyWLq7zdaiETeNzGdVPMu5YJmcxJKCp7csaKNVLxG"},
  { id: "cargo",
    name: "Daily Cargo",
    address: "0xCa6D7604ae55BA1bA864c26692a91979f25Cdb96",
    image: "",
    streak: 0}
]

const abiERC721 = [
  "function balanceOf(address owner) public view returns (uint256) ",
  "function getAddressStreak(address _address) public view returns (uint256)"
]


function SignerBalances({web3Provider}) {

  const [balances, setBalances] = useState([])

  /*useEffect(() => {
    if(web3Provider != null) {
        getBalances()
    }
    
  }, [web3Provider])*/

  async function getBalances(){
    let signer = web3Provider?.getSigner()
    let address = await signer?.getAddress()
    for (let index = 0; index < freeNfts.length; index++) {
      let contract = new ethers.Contract(freeNfts[index].address,abiERC721,signer)
      let balance = Number(await contract.balanceOf(address)).toString()
      let name = freeNfts[index].name
      let streak = 0
      let image = ""
      if(freeNfts[index].id == "cargo") {
        const [imgResponse, streakResponse] = await getDailyCargoStreak(contract, address)
        image = imgResponse
        streak = streakResponse
      }
      else {
        image = freeNfts[index].image
      }
      let NFTBalance = {id: freeNfts[index].id ,name: name, balance: balance, image: image, streak: streak }
      setBalances(oldBalances => [NFTBalance,...oldBalances])
    }
  }   

  async function getDailyCargoStreak(contract, address) {
    let streak = Number(await contract.getAddressStreak(address))
    let img = "https://a2vh8vk6r7.execute-api.us-east-1.amazonaws.com/prod/daily_chest_image/"+streak
    return [img, streak]
  }

  return (
      <SignerBalancesContainer>
        <div className='content'>
          {web3Provider != null ? 
            balances.map((item) => (
              <div className='nft-item' key={item.name}> 
                    <img className='img-nft' src={item.image}></img>
                    <h1 className='item-name'>{item.name + " :  " +item.balance}</h1>
                    <h3 className='cargo-streak'><div>{item.id == "cargo" ? "Ongoing highest streak : "+ item.streak : null }</div></h3>
              </div>
            ))
           : 
           "Not connected" }
        </div>
        <Button onClick={() => getBalances()}>LOAD BALANCES</Button>
      </SignerBalancesContainer>
  );
}

export default SignerBalances;
