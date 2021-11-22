import React ,{useState,useEffect} from "react";
import Renderdefectlog from "./Renderdefectlog";
import { TiArrowUnsorted } from "react-icons/ti";
import {  useSelector } from "react-redux";
import { CSVLink } from "react-csv";
import './Defectlog.modules.css';

import axios from 'axios';
const Defectlog = (props) =>{

  const filterConditions = useSelector((state) => state.filter);

  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalBottleCount,settotalBottleCount] = useState([])
  const [ticked,setticked]=useState(false)
  const [vsc ,setvsc] = useState([])

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
        const hdfn = []
      res.data.map(ele=>{
      hdfn.push(<Renderdefectlog key={Math.random().toString()} hditm={ele}/>)
      })
      settotalBottleCount([...hdfn])
        
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
        const hdfp = []
      res.data.map(ele=>{
      hdfp.push(<Renderdefectlog key={Math.random().toString()} hditm={ele}/>)
      })
      settotalBottleCount([...hdfp])
        
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
    setvsc(res.data)
    // sethistorydata(res.data)
    const hd = []
    res.data.map(ele=>{
hd.push(<Renderdefectlog key={Math.random().toString()} hditm={ele} selectHandler={checkBoxSelectionHandler} checkValue={ele.Mark_False_Positive} />)

})
settotalBottleCount([...hd])
    
  })
  .catch(err=>console.log(err))  
  
},[skip, limit,props.fromDate,ticked])
// csv below by Muppa

const headers = [
  { label: "Sl_No", key: "Sl_No" },
  { label: "Time_Stamp", key: "Time_Stamp" },
  { label: "Bottle_Type", key: "Bottle_Type" },
  { label: "Defect", key: "Defect" },
  { label: "Defect_Type", key: "Defect_Type" },
  { label: "Image", key: "Image" },
  { label: "Score", key: "Score" },
  { label: "Mark_False_Positive", key: "Mark_False_Positive" }
];

const csvReport = {
  data: vsc,
  headers: headers,
  filename: 'Defectlog.csv'
};
// csv above by Muppa

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
<>
{/* const csvReport = {
  totalBottleCount= {totalBottleCount},
  headers= {headers},
  filename= 'Defectlog.csv'
}; */}
    <CSVLink 
    {...csvReport}
    >Export to CSV</CSVLink>
    </>
            <div className="pages"> 
            <button onClick={previousPage}  className="pagebutton" > Previous Page </button>
            <button onClick={nextPage}  className="pagebutton" > Next Page </button> 
        </div>

 </>
  );
};

export default Defectlog;