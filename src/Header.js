import { Drawer, IconButton } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './logo.png'
import discord from './discord.png'
import twitter from './twitter.png'
import logoDollarWhite from './logodollarWhite.png'
import logoDollar from './logodollar.png'
import logoWhite from './logoWhite.png'
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import Web3Modal from "web3modal"
import {ethers} from "ethers"

const HeaderContainer = styled.div`
    position: relative;
    width: 100%;
    height: 15%;
    border-bottom: 1px solid ${(props) => props.theme.search_cursor};
    display: flex;
    align-items: center;
    justify-content: center;

    .header-logo {
        position: absolute;
        height: 45%;
        left: 5%;
    }

    .header-burger {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: 80%;
        width: 20%;
        right: 0%;
        color: ${(props) => props.theme.search_cursor};
    }   

    .header-buttons {
        display: none;
    }

    @media only screen and (min-width: 480px) {
        .header-buttons {
            display: none;
        }
    }

    @media only screen and (min-width: 768px) {
        .header-burger {
            display: none;
        }

        .header-buttons {
            position: absolute;
            right: 1%;
            height: 100%;
            width: 60%;
            display: flex;
            align-items: center;
            justify-content: right;

            .mode-div {
                position: relative;
                height: 50%;
                display: flex;
                align-items: center;
                justify-content: right;

                .theme-button-dark-drawer {
                    position: relative;
                    aspect-ratio : 1 / 1;
                    height: 100%;
                    border-radius: 15px;
                    background: transparent;
                    color: ${(props) => props.theme.search_cursor};
                    font-size: 24px;
                    border: 1px solid ${(props) => props.theme.search_cursor};
            
                    :hover {
                        background: white;
                        color: black;
                    }
                }
            
                .theme-button-light-drawer {
                    position: relative;
                    aspect-ratio : 1 / 1;
                    height: 100%;
                    border-radius: 15px;
                    background: transparent;
                    font-size: 24px;
                    border: 1px solid ${(props) => props.theme.search_cursor};  
                    color: ${(props) => props.theme.search_cursor};
            
                    :hover {
                        background: black;
                        color: white;
                    }
                }    
            }

            .connect-button {
                    position: relative;
                    height: 50%;
                    width: fit-content;
                    margin-top: 5%;
                    margin-bottom: 5%;
                    padding-left: 15px;
                    padding-right: 15px;
                    border-radius: 15px;
                    color: ${(props) => props.theme.search_cursor};
                    border: 1px ${(props) => props.theme.search_cursor} solid;
                    font-size: 18px;
                    font-weight: bold;
                    margin-right: 1%;

                    .button-text {
                        position: relative;
                        width: 100%;
                    }

                :hover {
                    background: ${(props) => props.theme.column_background};
                }
            }

            .header-links {
                position: relative;
                height: 70%;
                width: 30%;
                color: ${(props) => props.theme.search_cursor};
                font-size: 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: right;

                .links-button {
                    height: fit-content;
                    color: ${(props) => props.theme.search_cursor};
                    width: 20%;

                    .img-links {
                        aspect-ratio: 1/1;
                        width: 100%;
                    }
                }
            }
        }
    }

    @media only screen and (min-width: 1280px) {
    }    
`;

const DrawerStyled = styled.div`
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.search_cursor};
    display: flex;
    flex-direction: column;
    align-items: center;

    .close-button {
        margin-top: 5%;
        color: ${(props) => props.theme.search_cursor};
    }

    .divider-drawer {
        background: ${(props) => props.theme.search_cursor};
    }
    
    .launch-app-drawer {
        height: 10%;
        width: 80%;
        margin-top: 5%;
        margin-bottom: 5%;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 15px;
        color: ${(props) => props.theme.search_cursor};
        border: 1px ${(props) => props.theme.search_cursor} solid;
        font-size: 18px;
        font-weight: bold;

        .button-text {
            position: relative;
            width: 100%;
        }
    }

    .links-button-drawer {
            width: 25%;
            height: fit-content;
            color: ${(props) => props.theme.search_cursor};
            font-size: 20px;
            display: flex;
            margin: auto;
            margin-top: 5%;
            border-radius: 50%;
            
            .img-drawer {
                width: 100%;
            }
    }

    .mode-div-drawer {
        position: absolute;
        width: fit-content;
        height: 10%;
        bottom: 0;
        margin-bottom: 10%;
        display: flex;
        align-items: center;
        justify-content: center;

        .theme-button-dark-drawer {
            aspect-ratio : 1 / 1;
            height: 100%;
            border-radius: 15px;
            background: transparent;
            color: ${(props) => props.theme.search_cursor};
            font-size: 24px;
            border: 1px solid ${(props) => props.theme.search_cursor};
    
            :hover {
                background: white;
                color: black;
            }
        }
      
        .theme-button-light-drawer {
            aspect-ratio : 1 / 1;
            height: 100%;
            border-radius: 15px;
            background: transparent;
            font-size: 24px;
            border: 1px solid ${(props) => props.theme.search_cursor};  
            color: ${(props) => props.theme.search_cursor};
    
            :hover {
                background: black;
                color: white;
            }
        }    
    }
    
    @media only screen and (min-width: 480px) {
        .launch-app-drawer {
            font-size: 22px;    
        }

        .links-button-drawer {
            width: 15%;
            height: fit-content;
            color: ${(props) => props.theme.search_cursor};
            font-size: 20px;
            display: flex;
            margin: auto;
            margin-top: 1%;
            border-radius: 50%;
            
            .img-drawer {
                width: 100%;
            }
        }

    }

    @media only screen and (min-width: 768px) {
        display: none;
    }
`;


const providerOptions = {}

function Header({theme, setTheme, web3Provider, setWeb3Provider})  {

    const [open, setState] = useState(false);

    //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
    const toggleDrawer = (open) => () => {
        setState(open);
    };

    function openLink(link) {
        window.open(link, "_blank")
    }

    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const links = [
        {name: "FreeNFT site",
         link: "https://www.freenft.xyz/",
         icon: theme == "light" ?  logoDollar : logoDollarWhite},
        {name: "FreeNFT discord",
        link: "https://discord.gg/freenft",
        icon: discord},
        {name: "FreeNFT twitter",
        link: "https://twitter.com/freenft_xyz",
        icon: twitter}
    ]

    async function connectWallet() {
        try {
            let web3modal = new Web3Modal( {
                cacheProvider: false,
                providerOptions
            })
            const web3ModalInstance = await web3modal.connect()
            const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance)
            if(web3ModalProvider) {
                setWeb3Provider(web3ModalProvider)               
            }
        } catch (error) {
            console.error(error)
        }
    }


        return (
            <HeaderContainer>
                <img className='header-logo' src={theme == "light" ? logo : logoWhite}></img>
                    <div className='header-buttons'>
                        <Box className='header-links'>
                            {links.map((item, name) => {
                                return <Button key={item.name} className='links-button' onClick={() => openLink(item.link)}> <img className='img-links' src={item.icon}></img> </Button>
                            })}
                        </Box>
                        <Button className='connect-button' onClick={() => connectWallet()}>
                            {web3Provider != null ? 
                            <div className='button-text'>{(web3Provider.provider.selectedAddress.substring(0,6)) + "..." + web3Provider.provider.selectedAddress.substring(web3Provider.provider.selectedAddress.length-6) }</div>
                            : 
                            <div className='button-text'>Connect wallet</div>}
                        </Button>
                        <div className='mode-div'>
                            { theme == "dark" ? 
                            <IconButton className='theme-button-dark-drawer' onClick={themeToggler}>
                                <LightModeIcon/>
                            </IconButton> :
                            <IconButton className='theme-button-light-drawer' onClick={themeToggler}>
                                <DarkModeOutlinedIcon/>
                            </IconButton>
                            }
                        </div>
                    </div>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleDrawer(true)}
                    className='header-burger'
                    >   
                        <MenuIcon sx={{fontSize:"32px"}}/>
                    </IconButton>
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                        width: '75%',
                        background: "#161615"
                        }
                    }}            
                >
                    <DrawerStyled>
                        <IconButton className='close-button' onClick={toggleDrawer(false)}>
                            <CloseIcon sx={{fontSize:"32px"}}/>
                        </IconButton>                    
                        <Divider variant='middle' flexItem className='divider-drawer'/>
                        <Button className='launch-app-drawer' onClick={() => connectWallet()}>
                            {web3Provider != null ? 
                            <div className='button-text'>{(web3Provider.provider.selectedAddress.substring(0,6)) + "..." + web3Provider.provider.selectedAddress.substring(web3Provider.provider.selectedAddress.length-6) }</div>
                            : 
                            <div className='button-text'>Connect wallet</div>}
                            
                        </Button>
                        <Box>
                            {links.map((item, name) => {
                                return <Button key={item.name} className='links-button-drawer' onClick={() => openLink(item.link)}> <img className='img-drawer' src={item.icon}></img> </Button>
                            })}
                        </Box>
                        <div className='mode-div-drawer'>
                            { theme == "dark" ? 
                            <IconButton className='theme-button-dark-drawer' onClick={themeToggler}>
                                <LightModeIcon/>
                            </IconButton> :
                            <IconButton className='theme-button-light-drawer' onClick={themeToggler}>
                                <DarkModeOutlinedIcon/>
                            </IconButton>
                            }
                        </div>
                    </DrawerStyled>
                </Drawer>
            </HeaderContainer>
        );
}

export default Header;