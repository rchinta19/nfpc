import React from "react";
import { useState } from "react";
import "./table.modules.css";
import axios from "axios";

const Table = (props) => {
  const handleEdit = () => {
    setedit(false);
  };
  const handleCancel = () => {
    setedit(true);
  };
  const save = (e) => {
    if(editvalue){
      if(editvalue.length<=3){
    e.preventDefault();
    axios
    .post('/edit', {
      editvalue:editvalue + "%",
      Sl_No:props.itm.Sl_No,
    })
  }
    window.location.reload()
    // if (!newName.trim()) {
    //   return;
    // }
    setstore("");
    setstore([editvalue]);
    seteditvalue("");
    setedit(false);
  
  }
  };

  const [edit, setedit] = useState(true);
  const [editvalue, seteditvalue] = useState();
  const [store, setstore] = useState(props.itm.Score);

  return (
    <tr>
      <td className="td"> {props.itm.Sl_No}</td>
      <td className="td">{props.itm.Defect}</td>
      {/* <td>{props.itm.Description}</td> */}
      <td>
     
        {edit ? (store
          
        ) : (
          <>
          
            <input
              type="number"
              required
              style={{width:"60px"}}
              name="phoneNumber"
                max="100"
               min="0"
              defaultValue={editvalue || store}
              onChange={(e) => seteditvalue(e.target.value)}
            />
            
          </>
        )}
        
      </td>
      <td className="td">
        {edit ? (<div onClick={(event) => handleEdit(event)} style={{color:"#005FFF"}}>Edit</div>
         
        ) : ( <div >
          <button type="submit" 
          onClick={save}
          className="editbutton"
          >
            Save
          </button>
          <button type="button" onClick={handleCancel}
          className="editbutton"
          >
            Cancel
          </button>
        </div>
          
        )}
      </td>
    </tr>
  );
};

export default Table;
