import React from "react";
import { useState } from "react";
import "./table.modules.css";
import axios from "axios";

const Table = (props) => {
  const defecttypes = {
    Scratches:"",
    ForeignParticles:"",
    Discoloration:""
    };

  const [edit, setedit] = useState(true);
  const [editvalue, seteditvalue] = useState([defecttypes]);
  const [store, setstore] = useState({Scratches:props.itm.Scratches,
    ForeignParticles:props.itm.Foreign_Particles,
    Discoloration:props.itm.Discoloration});


  const handleEdit = () => {
    setedit(false);
  };
  const handleCancel = () => {
    setedit(true);
  };
  const handlesave = (e) => {
    if(editvalue.Scratches){
    
    e.preventDefault();
    axios
    .post('/edit', {
       editvalue,
      Sl_No:props.itm.Sl_No,
    })
  }
  console.log(editvalue)
    // window.location.reload()
    setedit(true);
  };
  const changevalue=(e)=>{
    seteditvalue({...editvalue,[e.target.name]:e.target.value})
  }

  
  return (
  <>

    <tr>
      
      <td className="td"> {props.itm.Sl_No}</td>
      <td>
     
     {edit ? (store.Scratches
       
     ) : (
       <>
       
         <input
           type="number"
           required
           style={{width:"60px"}}
           name="Scratches"
           suffix={'%'}
             max="100"
            min="0"
           defaultValue={editvalue.Scratches || store.Scratches}
           onChange={(e) => changevalue(e)}
         />
         
       </>
     )}
     
   </td>
    
      <td>
     
     {edit ? (store.ForeignParticles
       
     ) : (
       <>
       
         <input
           type="number"
           required
           style={{width:"60px"}}
           name="ForeignParticles"
             max="100"
            min="0"
           defaultValue={editvalue.ForeignParticles || store.ForeignParticles}
           onChange={(e) => changevalue(e)}
         />
         
       </>
     )}
     
   </td>
      
      {/* <td>{props.itm.Description}</td> */}
      <td>
     
        {edit ? (store.Discoloration 
          
        ) : (
          <>
          
            <input
              type="number"
              required
              style={{width:"60px"}}
              name="Discoloration"
                max="100"
               min="0"
              defaultValue={editvalue.Discoloration  || store.Discoloration }
              onChange={(e) => changevalue(e)}
            />
            
          </>
        )}
        
      </td>
      <td className="td">{props.itm.Model_Name}</td>
      <td className="td">
        {edit ? (<div onClick={(event) => handleEdit(event)} style={{color:"#005FFF",cursor:"pointer"}}>Edit</div>
         
        ) : ( <div >
          <button type="submit" 
          onClick={handlesave}
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
    </>
  );
};

export default Table;
