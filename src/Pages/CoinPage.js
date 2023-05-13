import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/Api';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core';
import axios from "axios";
import CoinInfo from '../components/CoinInfo';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../components/Banner/Carousel';

export const CoinPage = () => {
  
   const { id }= useParams();
   const [coin,setCoin]=useState();
   const {currency,symbol} =  CryptoState();
   const fetchCoins = async( )=>{
    const {data}= await axios.get(SingleCoin(id));
    setCoin(data);
   };
   console.log(coin);
   useEffect(()=>{
    fetchCoins();

   },[]); 
//    const useStyles = makeStyles((theme)=>({
//         container:{
//             display:"flex",
//             [theme.breakpoints.down("md")]:{
//                 flexDirection:"column",
//                 alginItems:"center",
//             },
//         },
        //  sidebar:{
        //     width:"30%",
        //     [theme.breakpoints.down("md")]:{
        //         width:"100%",
        //     },
        //     display:"flex",
        //     flexDirection:"column",
        //     alginItems:"center",
        //     marginTop:25,
        //     borderRight:"2px solid grey"
        //  },
        // heading:{
        //     fontWeight:"bold",
        //     marginBottom:20,
        //     fontFamily:"montserrat"
        // }
        // description:{
        //     width:"100%",
        //     fontFamily:"Montserrat",
        //     padding:25,
        //     paddingBottom:15,
        //     paddingTop:0,
        //     textAlign:"justify"
        // }
        
//    }));
  
//    const classes= useStyles();
if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>

   return (
    <div className="containers">
      <div   className="sidebar">
       <img
         src={coin?.image.large}
         alt={coin?.name}
         height="200"
         style={{marginBottom:20}}/>
         <Typography variant='h3' className="heading">
            {coin?.name}
         </Typography>
         <Typography variant='subtitle1' className='description'>
            {ReactHtmlParser(coin?.description.en.split(".")[0])}
         </Typography>
         <div className='marketData'>
         <span style={{display:"flex"}}>
                <Typography variant='h5' className='heading'
                >
                    Rank:
                </Typography>
                
                <Typography variant='h5'
                style={{
                    fontFamily:"Montserrat"
                }}
                >
                   {coin?.market_cap_rank}
                </Typography>
                </span>
            <span style={{display:"flex"}}>
                <Typography variant='h5' className='heading'
                >
                    Current Price:
                </Typography>
               
                <Typography variant='h5'
                style={{
                    fontFamily:"Montserrat"
                }}
                >
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Typography>
            </span>
            
            
            <span style={{display:"flex"}}>
                <Typography variant='h5' className='heading'
                >
                    Market Cap:
                </Typography>
               
                <Typography variant='h5'
                style={{
                    fontFamily:"Montserrat"
                }}
                >
                   {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
                </Typography>
            </span>

         </div>
      </div> 
      {/* chart */}
      <CoinInfo coin={coin}/>
    </div>
   )
  
};
export default CoinPage;