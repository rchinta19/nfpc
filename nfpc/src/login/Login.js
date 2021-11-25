import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import {ReactComponent as Logo} from '../../assets/instagram.svg'
import appsteklogo from "./appsteklogo.svg";
import nfpclogo from "./nfpclogo.png";
import axios from "axios";
import "./Login.css";
import { LoggingUser } from "../features/loggingHandler";
import { useDispatch,useSelector } from "react-redux";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import CloseIcon from '@mui/icons-material/Close';


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 350,
  height:200,
  bgcolor: 'white',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const Login = (props) => {
  const dispatch = useDispatch()
  const [email, setemail] = useState("");
  const [pwd, setpwd] = useState("");

  const [isLogged, setisLogged] = useState(false);
  const [remember,setRemember]=useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userPresent = useSelector(state => state.userLog.UserName)
 // console.log(userPresent)
  function handleChange() {
    // alert("Do you want to save credentials of login in the browser")
    console.log(typeof remember);
    const value = remember  ? false : true;
    setRemember(value);
    localStorage.setItem('remember',value);
    
  };
  function rememberme() {

  }
  useEffect(() => {
 
    // Update the document title using the browser API
    const rememberMe = localStorage.getItem('remember') ?  localStorage.getItem('remember') : false  ;
  
    (rememberMe == 'true')?  setRemember(true) : setRemember(false);
    
   
      const email = remember ? localStorage.getItem('email') : '';
      const pwd = remember ? localStorage.getItem('pwd') : '';
    
    
    setemail(email)
    setpwd(pwd) 
  },[]);
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const currentUser = useSelector((state)=>state.userLog.UserName)

  const sumbitAcessesHandler = async (e) => {
    e.preventDefault();
   await axios
      .post(
        "/Login",
        {
          Email: email,
          Password: pwd,
        },
        config
      )
      .then((res) => {
        console.log(res)
        
        if (res.data==true) {
         localStorage.setItem("userPresent",res.data)
        
         dispatch(LoggingUser({UserPresent:res.data,path:"/homeDashboard/Dashboard",UserName:email}))
         
        }
       else if(remember){
          localStorage.setItem('email',`${email}`)
          localStorage.setItem('pwd',`${pwd}`)
        }
        else if(res.data==false){
          console.log("Invalid User Credentials")
          alert("invalid User Credentials")
        }
      })
  };
 
 
// const hai = (e) => {​​      
//   alert("Please contact Administrator")
// }​​





  //   .catch(error =>
  //     { console.error(`invalid credentials`)
  // });
  return (
    <div className="body">
      <div className="div-login">
        <div className="div-login-logo">
          <a>
            <img src={appsteklogo} style={{ height: "8vh", width: "8vw" }} />
          </a>
          <a>
            <img src={nfpclogo} style={{ height: "8vh", width: "6vw" }} />
          </a>
        </div>
        <div>
          <form>
            {/* <span>Username</span> */}
            <label className="label" for="uname">
              User Name
            </label>

            <input
              className="mail"
              type="email"
              name="email"
              placeholder="Enter User name"
              required
              onChange={(e) => setemail(e.target.value)}
              // onChange={this.handleChange}
            />

            {/* <span>Password</span> */}
            <label className="label" for="psw">
              Password
            </label>

            <input
              className="mail"
              type="password"
              name="pwd"
              placeholder="Enter password"
              required
              onChange={(e) => setpwd(e.target.value)}
             
            />
            {/* <div>
            <input type="
            checkbox" name="remember" /> Remember me
            
            <div class="container" style={{ backgroundColor: "#f1f1f1" }}>

              <span class="psw">
                
                <a href="#">Forgot password?</a>
              </span>
            </div>   */}
            {/* </div> */}
            <div className="remember">
              <a>
                <input className="checkbox" type="checkbox" name="rememberMe" checked={remember}  onClick={() => {
          handleChange();
          rememberme();
        }}/>
                <label for="checkbox">Remember Me-{typeof remember}</label> 
              </a>
          <a onClick={handleOpen} style={{cursor:"pointer"}}>Forgot Passoword</a><StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
        <button onClick={(e)=>setOpen(false)} style={{float: "right",color:"red"}}> <CloseIcon  /> </button>
       <em style={{paddingTop:"4em"}}> Please Contact Your Administrator</em>
        </Box>
      </StyledModal>
            </div>

            <button
              type="submit"
              onClick={sumbitAcessesHandler}
              className="login-btn"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;