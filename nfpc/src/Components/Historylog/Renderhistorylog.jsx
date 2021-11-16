import React from "react";
import './historylog.modules.css';

const Renderhistory = (props) => {
  
  return (
    <tr>
      <td className="tdf"> {props.hditm.Sl_No}</td>
      <td className="tdf">{props.hditm.User_Name}</td>
      <td className="tdf">{props.hditm.Time_Stamp}</td>
      <td className="tdf">{props.hditm.Item_Modified}</td>
      <td className="tdf">{props.hditm.Table_Name}</td>
      <td className="tdf">{props.hditm.Old_Value}</td>
      <td className="tdf">{props.hditm.New_Value}</td>
    </tr>
  );
};

export default Renderhistory;