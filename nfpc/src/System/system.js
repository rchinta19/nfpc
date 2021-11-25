import React, { useState, useEffect } from "react";
import Table from "./table.js";
import axios from "axios";
// import data from "./threshold.json";

import { TiArrowUnsorted } from "react-icons/ti";

const System = () => {
  // const [contacts, setContacts] = useState();
  const [tabler,setTabler]= useState();


  useEffect(()=>{ 
axios
.get('/table')
.then(res=> {
  // setContacts(res.data);
  // console.log(contacts);
  const x = []
  res.data.map(ele=>{
    x.push(<Table key={Math.random().toString()}itm={ele}/>)
  })
  setTabler([...x])
})
.catch(err=>console.log(err))  

},[])


  return (
    <>
    
      <div className="tablecontainer">
        <h3>System Threshold </h3>
        <form className="form">
          <table className="table">
           
            <thead>
              <tr>  
              
                <th className="th">
                  S.no
                  <TiArrowUnsorted /> 
                </th>
                <th className="th">Scratches</th>
                <th className="th">Foreign Particles</th>
                <th className="th">Discoloration</th>
                <th className="th">Model Name</th>
                <th className="th">Action</th>
                
              </tr>
            </thead>
            
            <tbody>
              {tabler}
            </tbody>
          </table>
        </form>
      </div>
     
    </>
  );
};
export default System;
