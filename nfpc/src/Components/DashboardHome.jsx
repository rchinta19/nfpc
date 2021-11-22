// import Button from "@mui/material/Button";
import "../App.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Button, InputBase, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import nfpc from "../Assets/Images/nfpc.png";
import appsteklogo from "../Assets/Images/appsteklogo.png";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import Sidenav from "./Sidenav/Sidenav";
// import SearchIcon from "@mui/icons-material/Search";
import Dashboard from "./Dashboard/Dashboard";
// import DefectLogTables from "./DefectLogTables";
// import SecuredRoute from "./SecuredRoute";
import { LoggingUser } from "../features/loggingHandler";
import { useDispatch ,useSelector} from "react-redux";
import {
  BrowserRouter,
  Switch,
  Route,
  // useHistory,
  // Redirect,
  withRouter,
} from "react-router-dom";
import Modelstatuslist from "../Model/Modelstatuslist";
// import Login from "../login/Login";
import Helper from "./Helper";
import { useState } from "react";
import axios from "axios";
import Changedata from "./Historylog/Changedata";
import Popover from '@mui/material/Popover';
// import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { fontWeight } from "@mui/system";
// import OutlinedInput from '@mui/material/OutlinedInput';
// import { typography } from "@mui/system";

const useStyles = makeStyles({
  searchStyles: {
    border: "1px solid #E2E0E1",
    borderRadius: "10px",
    backgroundColor: "#FAF8FF",
    width: "20vw",
    height: "48px",
    padding: "0 30px",
  },
  IconStyles: {
    border: "2px solid #E2E0E1 ",
    borderRadius: "40px",
    cursor:"pointer"
  },
});

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function DashboardHome(props) {
  const dispatch = useDispatch()
console.log(props.location)
console.log(props.match)
console.log(props.history)
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const LogoutHandler = () => {

    axios.get("/logout").then((res) => {
      console.log(res);
      setIsLoggedIn(!res.data);
    });
    dispatch(LoggingUser({UserPresent:false}))
    
  };
  let User =useSelector((state)=>state.userLog.UserName)
  let CurrentLocation = props.location
  let currentUserPath = useSelector((state)=>state.userLog.currentPath)
  // const [p,setP] = useState(currentUserPath)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    justifyContent:'center',
    paddingLeft:'20px',
    marginBottom:'20px'
  };
  const header ={
    // paddingLeft:'70px',
    // paddingRight:'50px',
    // marginBottom:'20px'
      textAlign:"center",
      color:"#0f206c"
  }
  const [open1, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose1 = () => setOpen(false);
  const [name, setName] = React.useState('');
  const [Newpassword, setNewpassword] = React.useState('');
  const [reenternewpassword,setreenternewpassword] = React.useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handlenewpassword =(e) =>{
    setNewpassword(e.target.value);
  };
  const handlereenterpassword =(e) =>{
    setreenternewpassword(e.target.value);
  };
  const ChangepasswordHandler =(e) =>{
    axios.post("/changepassword",{
      Email_Id:User,
      Password:name,
      Newpassword:Newpassword,
      reenternewpassword: reenternewpassword
    }).then((res) => {
      console.log(res);
     alert("password is changed sucessfully")
    })
    .catch((err)=>{
      alert("password is not changed ")
    });
  }
console.log(User)
  return (
    <Grid container className="App">
      <Grid item xs={12} sx={{ border: "2px solid black", height: "100px" }}>
        <AppBar className="top-grid">
          <div className="logos">
            <img
              src={appsteklogo}
              alt="appstek-logo"
              className="appstek-logo"
            />
            <img src={nfpc} alt="logo" className="nfpc-logo" />
          </div>
          <div className="search-icons">
          <PersonOutlineOutlinedIcon className={classes.IconStyles + ` icon-not`} aria-describedby={id} variant="contained" onClick={handleClick}
  />
  <p style={{fontWeight:'bold', fontSize:'1.5rem'}}>{User}</p>
<Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
    alignItems: 'left',

  }}
  
  >
    <Button onClick={handleOpen}>
        Change Password
      </Button>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form"
      sx={style}
      noValidate
      autoComplete="off">
        <Typography variant="h5" component="h2" style={header}>Change Password</Typography>
        <FormControl variant="standard" style={{width:"250px",padding:"2px"}}>
        <InputLabel htmlFor="component-simple">Enter Current Password</InputLabel>
        <Input id="component-simple" value={name} onChange={handleChange} />
      </FormControl>
      <FormControl variant="standard" style={{width:"250px",padding:"2px"}}>
        <InputLabel htmlFor="component-helper">Enter New Password</InputLabel>
        <Input
          id="component-helper"
          value={Newpassword}
          onChange={handlenewpassword}
          aria-describedby="Enter New Password"
        />
      </FormControl>
      <FormControl variant="standard" style={{width:"250px",padding:"2px"}}>
        <InputLabel htmlFor="component-helper">Re-Enter New Password</InputLabel>
        <Input
          id="component-helper"
          value={reenternewpassword}
          onChange={handlereenterpassword}
          aria-describedby="Re-Enter New Password"
        />
      </FormControl>
      <Button style={{background:"#0f206c",color:"white",textAlign:"center",margin:"10px", width:"230px",}} onClick={(e) => {
                ChangepasswordHandler();
              }}>SUBMIT</Button>
        </Box>
      </Modal>
            <Button
              onClick={(e) => {
                LogoutHandler();
                localStorage.clear()
              }} 
              className={classes.IconStyles + ` icon-not`}>Logout
           </Button>
            </Popover>
          </div>
          
        </AppBar>
      </Grid>

      <Grid xs={1} className="nav-tab">
        <Sidenav />
      </Grid>

      <Grid xs={11} className="nav-content">
        <Switch>
          <Route exact={true} path="/homeDashboard/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/homeDashboard/Configuration">
            <Modelstatuslist />
          </Route>
          <Route path="/homeDashboard/History">
            <Changedata />
          </Route>

          <Route path="/homeDashboard/help">
            <Helper />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
}

export default withRouter(DashboardHome);
