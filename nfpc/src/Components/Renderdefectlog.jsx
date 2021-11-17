import React from "react";
import './Defectlog.modules.css';

const Renderdefectlog = (props) => {
  
  return (
    <tr>
      <td className="tdf"> {props.dlitm.Sl_No}</td>
      <td className="tdf">{props.dlitm.Time_Stamp}</td>
      <td className="tdf">{props.dlitm.Bottle_Type}</td>
      <td className="tdf">{props.dlitm.Defect}</td>
      <td className="tdf">{props.dlitm.Defect_Type}</td>
      <td className="tdf"><img src={props.dlitm.Image} style={{width:"10px",heigt:"10px"}} /></td>
      <td className="tdf">{props.dlitm.Score1}</td>
      <td className="tdf"><input type="checkbox" id="topping" name="topping" value={props.dlitm.Mark_False_Positive} onChange={()=>{props.selectHandler(props.dlitm.Mark_False_Positive,props.dlitm.Sl_No)}} checked={props.checkValue==0?false:true} /></td>
    </tr>
  );
};

export default Renderdefectlog;