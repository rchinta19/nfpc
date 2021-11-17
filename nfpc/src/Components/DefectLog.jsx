import React ,{useState,useEffect} from "react";
import Renderdefectlog from "./Renderdefectlog";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import './Defectlog.modules.css';

import axios from 'axios';
const Defectlog = (props) =>{

  const filterConditions = useSelector((state) => state.filter);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalBottleCount,settotalBottleCount] = useState([])
  const [ticked,setticked]=useState(false)

  function pad2(n) {

    return (n < 10 ? '0' : '') + n;

  }
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};
const checkBoxSelectionHandler = (check,sno)=>{
  
        console.log(check + "hai")
        console.log(sno)
        let checkCondition = check
        if(checkCondition==0){
        setticked(!ticked)
          console.log("in if else")
          axios.post("/markfalsepositiveto1",{Sl_No:sno},
            config)
            .then((res)=>{
              // if (res.data) {
              //   console.log(res);
              //   setticked(res.data);
              //   props.ticked(res.data);
              // }
              console.log(res.data)
            })
          }
        else if(checkCondition==1){
           axios.post("/markfalsepositiveto0",{Sl_No:sno},config)
          .then((res)=>{
            // if (res.data) {
            //   console.log(res);
            //   // props.notticked(res.data);
            
              console.log(res.data)
             
            })
            setticked(!ticked)

      }
    }
 
  
  const nextPage = () => {
      setSkip(skip + limit)
      try{
      axios
      .post("/defectfilternextpage",
      {
        from:props.fromDate,
        to:props.toDate,
        skip:skip,
        limit:limit
      } )
      .then((res) => {
        console.log(res.data);
        // sethistorydata(res.data)
        const dlfn = []
      res.data.map(ele=>{
      dlfn.push(<Renderdefectlog key={Math.random().toString()} dlitm={ele}/>)
      })
      settotalBottleCount([...dlfn])
        
      })
      .catch(err=>console.log(err))  
      // setfrom("")
      // setto("")
      }catch(err){
        console.log(err)
      }
    }
  

  const previousPage = () => {
      if(skip!=0){
        setSkip(skip-limit)
      
      axios
      .post("/defectfilterpreviouspage",
      {
        from:props.fromDate,
        to:props.toDate,
        skip:skip,
        limit:limit
      } )
      .then((res) => {
        console.log(res.data);
        const dffp = []
      res.data.map(ele=>{
      dffp.push(<Renderdefectlog key={Math.random().toString()} dlitm={ele}/>)
      })
      settotalBottleCount([...dffp])
        
      })
      .catch(err=>console.log(err))  
      }
      else
      {setSkip(0)}
      };


useEffect(()=>{ 
      
  axios
  .post("/defectlogdaydata",
  {
    from:props.fromDate,
    to:props.toDate,
    skip:skip,
    limit:limit
  }
  // dates
  )
  .then((res) => {
    console.log(res.data);
    // sethistorydata(res.data)
    const ld = []
    res.data.map(ele=>{
ld.push(<Renderdefectlog key={Math.random().toString()} dlitm={ele} selectHandler={checkBoxSelectionHandler} checkValue={ele.Mark_False_Positive} />)

})
settotalBottleCount([...ld])
    
  })
  .catch(err=>console.log(err))  
  
},[skip, limit,props.fromDate,ticked])


  return(
  <>
   <h1>Recent Defect logs</h1>

  <div  className="historytable">
  <table >
              <thead >
                <tr>
                  <th className="thf">
                    S.No
                    <TiArrowUnsorted />
                    </th>
                  <th className="thf">Time Stamp</th>
                  <th className="thf">Bottle Type</th>
                  <th className="thf">Defect</th>
                  <th className="thf">Defect Type</th>
                  <th className="thf">Image</th>
                  <th className="thf">Score 1</th>
                  <th className="thf">Mark False Postive</th>
                </tr>
              </thead>
               <tbody>
                {totalBottleCount}
               </tbody>
            </table>
    </div>
            <div className="pages"> 
            <button onClick={previousPage}  className="pagebutton" > Previous Page </button>
            <button onClick={nextPage}  className="pagebutton" > Next Page </button> 
        </div>

 </>
  );
};

export default Defectlog;