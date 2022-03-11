import React from 'react';
import wave_img from './wave_img.png';
import './sloganPart.css';
import { useMediaQuery } from 'react-responsive';

function SloganPart() {
    const sloganPc={
        display:'flex',
        flex:'row',
        alignItems:'center',
        justifyContent : 'space-between'
    }
    const sloganMobile={
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent : 'space-between'
    }
    const slogan_img={
        marginBottom :'-55px',
        float :'right',
        width:'500px',
        height : '400px'
    }
    const slogan_h1 ={
        fontSize:'50px',
    }
    const IsPc = useMediaQuery({
        query : "(min-width : 1024px)"
    })

    return (
        <div className="sloganPart">
      <div style={IsPc?sloganPc:sloganMobile as React.CSSProperties} >
           <div className="slogan_text">
          <h1 style={slogan_h1}>Paint Us with Your NFTs</h1>
          <p>Pi-market is an NFT market where you can mint and freely<br/>
          purchase NFT works related to the school you belong to.<br/>
          Sell and purchase any works of art, including photos, pictures,<br/>
          videos, music, etc. from your beloved school.</p>
          
          </div>

          <img style={slogan_img as React.CSSProperties} src={wave_img}/>
      </div>
      <p>Trending Auction</p>
      <hr/>
      
      </div>
    );
  }
  
  export default SloganPart;