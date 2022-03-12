import React from 'react';
import pi_logo from './pi_logo.png';
import './header.css';
import { NonceAccount } from '@solana/web3.js';
import Connect2Phantom from './Connect2Phantom';
import { useMediaQuery } from 'react-responsive';
import { findByLabelText } from '@testing-library/react';
function Header() {

  const buttonsPc={
    display:'flex',
    flex: 'row',
    alignItems: 'center'
  }
  const buttonsMobile={
    marginTop:'20px',
    display:'flex',
    flexDirection :'row'
  }

  const IsPc = useMediaQuery({
    query : "(min-width : 1024px)"
})
  return (
    <div className="Header">
        <img className="Header_img" src={pi_logo} alt='React'  />  
 
        <input/>
        <div style={IsPc? buttonsPc:buttonsMobile as React.CSSProperties}>
        <button>Explore</button>
        <button>Minting</button>
        <Connect2Phantom/>
        </div>
    </div>
  );
}

export default Header;