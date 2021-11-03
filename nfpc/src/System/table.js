import React from "react";
import { useState } from "react";
import "./table.modules.css";
import axios from "axios";

const Table = (props) => {
  const handleEdit = () => {
    setedit(true);
  };
  const handleCancel = () => {
    setedit(false);
  };
  const save = (e) => {
    if(editvalue){
    e.preventDefault();
    axios
    .post('/edit', {
      editvalue:editvalue,
      store:store,
           
    })
    // if (!newName.trim()) {
    //   return;
    // }
    setstore("");
    setstore([editvalue]);
    seteditvalue("");
    setedit(false);
  }
  };

  const [edit, setedit] = useState(false);
  const [editvalue, seteditvalue] = useState();
  const [store, setstore] = useState(props.itm.Score);

  return (
    <tr>
      <td className="td"> {props.itm.Sl_No}</td>
      <td className="td">{props.itm.Defect}</td>
      {/* <td>{props.itm.Description}</td> */}
      <td>
      {/* <form method="post" action="/edit"> */}
        {edit ? (
          <>
          
            <input
              type="text"
              required
              style={{width:"60px"}}
              name="phoneNumber"
              required
              defaultValue={editvalue || store}
              onChange={(e) => seteditvalue(e.target.value)}
            />
            
          </>
        ) : (
          store
        )}
        {/* </form> */}
      </td>
      <td className="td">
        {edit ? (
          <div >
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
        ) : (
          <div onClick={(event) => handleEdit(event)} style={{color:"#005FFF"}}>Edit</div>
        )}
      </td>
    </tr>
  );
};

export default Table;
