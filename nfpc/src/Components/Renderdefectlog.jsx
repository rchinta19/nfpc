import React from "react";
import './Defectlog.modules.css';

const Renderdefectlog = (props) => {
  
  return (
    <tr>
      <td className="tdf"> {props.hditm.Sl_No}</td>
      <td className="tdf">{props.hditm.Time_Stamp}</td>
      <td className="tdf">{props.hditm.Bottle_Type}</td>
      <td className="tdf">{props.hditm.Defect}</td>
      <td className="tdf">{props.hditm.Defect_Type}</td>
      <td className="tdf">{props.hditm.Image}</td>
      <td className="tdf">{props.hditm.Score1}</td>
      <td className="tdf"><input type="checkbox" id="topping" name="topping" value={props.hditm.Mark_False_Positive} onChange={()=>{props.selectHandler(props.hditm.Mark_False_Positive,props.hditm.Sl_No)}} checked={props.checkValue==0?false:true} /></td>
    </tr>
  );
};

export default Renderdefectlog;