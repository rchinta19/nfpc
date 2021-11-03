import React from "react";

const Renderhistory = (props) => {
  
  return (
    <tr>
      <td className="td"> {props.hditm.Sl_No }</td>
      <td className="td">{props.hditm.User_Name}</td>
      <td className="td">{props.hditm.Time_Stamp}</td>
      <td className="td">{props.hditm.Item_Modified}</td>
      <td className="td">{props.hditm.Table_Name}</td>
      <td className="td">{props.hditm.Old_Value}</td>
      <td className="td">{props.hditm.New_Value}</td>
    </tr>
  );
};

export default Renderhistory;