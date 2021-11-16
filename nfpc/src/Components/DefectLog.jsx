import React ,{useState,useEffect} from "react";
import Renderhistory from "./Renderdefectlog";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import './Defectlog.modules.css';

import axios from 'axios';
const Defectlog = (props) =>{
//   let fromdaydate = new Date().getFullYear() +  "-" +    (new Date().getMonth() + 1) +    "-" + pad2(new Date().getDate())   
//   let todaydate =  new Date().getFullYear() +  "-" +    (new Date().getMonth() + 1) +    "-" +   pad2(new Date().getDate()+1)
  const filterConditions = useSelector((state) => state.filter);
    // const [from,setfrom] = useState(fromdaydate);
    // const [to,setto] = useState(todaydate);

//   const [historydata, sethistorydata] = useState([]);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [totalBottleCount,settotalBottleCount] = useState([])
  const [ticked,setticked]=useState(false)
//   const [dates, setdates] = useState({
//     fromDate:fromdaydate,
//     toDate: todaydate,
//   });
//   function pad2(n) {

//     return (n < 10 ? '0' : '') + n;

//   }
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};
const checkBoxSelectionHandler = (check,sno)=>{
  
        console.log(check)
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
            // 
              console.log(res.data)
             
            })
            setticked(!ticked)

      }
    }
  //  const renderCell = (params)=>{
  //     if(params.row.Mark_False_Positive==1){
  //     return <input type="checkbox" checked onChange={(e)=>{checkBoxSelectionHandler(e.target.checked,params.id)}}  />
  //    }
  //    else{
  //     return <input type="checkbox"  onChange={(e)=>{checkBoxSelectionHandler(e.target.checked,params.id)}}  />
  
  //    }
  //   }
  
  const nextPage = () => {
      setSkip(skip + limit)
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
      hdfn.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
      })
      settotalBottleCount([...hdfn])
        
      })
      .catch(err=>console.log(err))  
      // setfrom("")
      // setto("")
      };

  

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
        // sethistorydata(res.data)
        const hdfp = []
      res.data.map(ele=>{
      hdfp.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
      })
      settotalBottleCount([...hdfp])
        
      })
      .catch(err=>console.log(err))  
      // setfrom("")
      // setto("")
      }
      else
      {setSkip(0)}
    
      };

// const handlehistoryinputfrom = (e) =>{
//   setfrom(e.target.value)
//   setSkip(0)
// }
// const handlehistoryinputto = (e) =>{
//   setto(e.target.value)
//   setSkip(0)
// }

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
    const hd = []
    res.data.map(ele=>{
hd.push(<Renderhistory key={Math.random().toString()} hditm={ele} selectHandler={checkBoxSelectionHandler} checkValue={ele.Mark_False_Positive} />)

})
settotalBottleCount([...hd])
    
  })
  .catch(err=>console.log(err))  
  
},[skip, limit,props.fromDate,ticked])


// const applyFilterHandler = (e) => {
   
//   axios
// .post("/historyfilter",
// {
//   from:from,
//   to:to,
//   skip:skip,
//   limit:limit
// } )
// .then((res) => {
//   console.log(res.data);
//   // sethistorydata(res.data)
//   const hdf = []
// res.data.map(ele=>{
// hdf.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
// })
// sethistorydata([...hdf])
  
// })
// .catch(err=>console.log(err))  
// // setfrom("")
// // setto("")
// };

  return(
  <>
   <h1>Recent Defect logs</h1>
{/* <div className="history-filter">
                  

<input className='history-input'
type="date"
value={from}
name="from"
onChange={handlehistoryinputfrom}
/>

<input className='history-input'
type="date"
name="to"
value={to}
onChange={handlehistoryinputto}
/>
     <button type="submit" className="history-submitbtn" onClick={applyFilterHandler} >
            Search
          </button>
          </div> */}
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