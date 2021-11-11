// import Button from "@mui/material/Button";
import "../App.css";
import { Grid, Button, InputBase, Appbar, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import nfpc from "../Assets/Images/nfpc.png";
import appsteklogo from "../Assets/Images/appsteklogo.png";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import Sidenav from "./Sidenav/Sidenav";
import SearchIcon from "@mui/icons-material/Search";
import Dashboard from "./Dashboard/Dashboard";
import DefectLogTables from "./DefectLogTables";
import SecuredRoute from "./SecuredRoute";
import { LoggingUser } from "../features/loggingHandler";
import { useDispatch ,useSelector} from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
  withRouter,
} from "react-router-dom";
import Modelstatuslist from "../Model/Modelstatuslist";
import Login from "../login/Login";
import Helper from "./Helper";
import { useState, useEffect } from "react";
import axios from "axios";
import Changedata from "./Historylog/Changedata";

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

  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const LogoutHandler = () => {

    axios.get("/logout").then((res) => {
      console.log(res);
      setIsLoggedIn(!res.data);
    });
    dispatch(LoggingUser({UserPresent:false}))

    
  };
  let CurrentLocation = props.location
  let currentUserPath = useSelector((state)=>state.userLog.currentPath)
  console.log(currentUserPath)
  const [p,setP] = useState(currentUserPath)



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
          
          
            <PersonOutlineOutlinedIcon
              className={classes.IconStyles + ` icon-not`}
            />
            <PowerSettingsNewOutlinedIcon
              onClick={(e) => {
                LogoutHandler();
                localStorage.clear() 
              }}
            
              className={classes.IconStyles + ` icon-not`}
            />
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
          <Route path="/homeDashboard/changedata">
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
