import { Container, Typography, MenuItem, InputLabel,Select} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import React from "react";
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { CryptoState } from "../CryptoContext";
const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const {currency,setCurrency} = CryptoState();
  console.log(currency);
  const darkTheme = createTheme({
    palette: {
        primary:{
            main:"#484848",
        },
      mode: 'dark',
    },
  });
  function HandleClick() {
    navigate("/");
  }
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <ThemeProvider className='header' theme={darkTheme}>
    <AppBar  position="static">
      <Container>
        <toolbar>
          <Typography onClick={HandleClick} className={classes.title} variant="h6" >
            <div id="title">CoinTracker</div>
          </Typography>
      
       <Select variant="outlined"
      style={{
        width: 100,
        height: 40,
       backgroundColor:"transparent",
        marginLeft: 1200,
        marginRight:15,
        border: "2px solid black",
        
      }}

        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={selectedValue}
        // onChange={handleChange}
        value={currency}
        onChange={(e)=> setCurrency(e.target.value)}
      >
        <MenuItem value={"INR"}>INR</MenuItem>
        <MenuItem value={"USD"}>USD</MenuItem>
       
      </Select>

        
        </toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};
