import axios from "axios";
import { appendFile, readSync } from "fs";
import { prependOnceListener } from "process";
import React, { useState } from "react";

const Render = (props) => {
const handletoggle = () => {
  
  axios.post("/updatestatus",{Sl_No:props.itm.Sl_No }).then((res) =>{
      console.log ("status updated")
      console.log(res.data)
   })
    .catch((err)=>{console.log("status is not updated")})
    window.location.reload();
  };
   return (
    <tr>
      <td className="td"> {props.itm.Sl_No }</td>
      <td className="td">{props.itm.Model}</td>
      <td className="td">{props.itm.Version }</td>
      <td className="td">{props.itm.Last_Update }</td>
      <td className="td" onClick={handletoggle} style={{ cursor: "pointer"}} >{props.itm.Status}</td> 
      </tr>
     );
    };

export default Render;
