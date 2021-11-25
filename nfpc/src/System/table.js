import React from "react";
import { useState } from "react";
import "./table.modules.css";
import axios from "axios";

const Table = (props) => {
  const defecttypes = 
    {Scratches:props.itm.Scratches,ForeignParticles:props.itm.Foreign_Particles, Discoloration:props.itm.Discoloration};
  

  const [edit, setedit] = useState(true);
  // const [editvalue, seteditvalue] = useState([defecttypes]);
 
  
      const [store, setstore] = useState(defecttypes);

    

  const handleEdit = () => {
  
    let Scratche = props.itm.Scratches.slice(0,-1)
    let ForeignParticle = props.itm.Foreign_Particles.slice(0,-1)
    let  Discoloratio = props.itm.Discoloration.slice(0,-1)
   
    setstore({Scratches:Scratche,ForeignParticles:ForeignParticle, Discoloration:Discoloratio})
    setedit(false);
    console.log(store)
  };
  const handleCancel = () => {
    setedit(true);
  };
  const handlesave = (e) => {

    e.preventDefault();
    axios
    .post('/edit', {
       store,
      Sl_No:props.itm.Sl_No,
      
    })
 
    window.location.reload()
    setedit(true);
  };
  
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
           //suffix={'%'}
            
            min="1"
            max="100" 
           value={ store.Scratches}
           onChange={(e) => setstore({...store,Scratches:e.target.value})
          }
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
            //pattern="/[^0-9-%]/*"
            //pattern="^-?[0-9]\d*\.?\d*$"
         
           defaultValue={ store.ForeignParticles}
           onChange={(e) => setstore({...store,ForeignParticles:e.target.value})
          }
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
              // required
              style={{width:"60px"}}
              name="Discoloration"
                max="100"
               min="0"
              defaultValue={ store.Discoloration }
              onChange={(e) => setstore({...store,Discoloration:e.target.value})
            }
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