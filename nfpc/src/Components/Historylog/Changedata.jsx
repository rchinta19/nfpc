import React ,{useState,useEffect} from "react";
import Renderhistory from "./Renderhistorylog";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import './historylog.modules.css';
import axios from 'axios';
const Changedata = () =>{
  let fromdaydate = new Date().getFullYear() +  "-" +    (new Date().getMonth() + 1) +    "-" + pad2(new Date().getDate())   
  let todaydate =  new Date().getFullYear() +  "-" +    (new Date().getMonth() + 1) +    "-" +   pad2(new Date().getDate())
  const filterConditions = useSelector((state) => state.filter);
    const [from,setfrom] = useState(fromdaydate);
    const [to,setto] = useState(todaydate);

  const [historydata, sethistorydata] = useState([]);
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [dates, setdates] = useState({
    fromDate:fromdaydate,
    toDate: todaydate,
  });
  function pad2(n) {

    return (n < 10 ? '0' : '') + n;

  }
  
  const nextPage = () => {
      setSkip(skip + limit)
      axios
      .post("/historyfilternextpage",
      {
        from:from,
        to:to,
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
      sethistorydata([...hdfn])
        
      })
      .catch(err=>console.log(err))  
      // setfrom("")
      // setto("")
      };

  

  const previousPage = () => {
      if(skip!=0){
        setSkip(skip-limit)
      
      axios
      .post("/historyfilterpreviouspage",
      {
        from:from,
        to:to,
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
      sethistorydata([...hdfp])
        
      })
      .catch(err=>console.log(err))  
      // setfrom("")
      // setto("")
      }
      else
      {setSkip(0)}
    
      };

const handlehistoryinputfrom = (e) =>{
  setfrom(e.target.value)
  setSkip(0)
}
const handlehistoryinputto = (e) =>{
  setto(e.target.value)
  setSkip(0)
}

useEffect(()=>{ 
      
  axios
  .post("/historydaydata",
  {
    from:from,
    to:to,
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
hd.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
// hd.push(res.data)
})
sethistorydata([...hd])
    
  })
  .catch(err=>console.log(err))  
  
},[skip, limit])


const applyFilterHandler = (e) => {
   
  axios
.post("/historyfilter",
{
  from:from,
  to:to,
  skip:skip,
  limit:limit
} )
.then((res) => {
  console.log(res.data);
  // sethistorydata(res.data)
  const hdf = []
res.data.map(ele=>{
hdf.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
})
sethistorydata([...hdf])
  
})
.catch(err=>console.log(err))  
// setfrom("")
// setto("")
};


  return(
  <>
   <h1>History Logs</h1>
<div className="history-filter">
                  

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
            Submit
          </button>
          </div>
  <div  className="historytable">
  <table >
              <thead >
                <tr>
                  <th className="thf">
                    S.No
                    <TiArrowUnsorted />
                    </th>
                  <th className="thf" >User Name</th>
                  <th className="thf">Time Stamp</th>
                  <th className="thf">Item Modified</th>
                  <th className="thf">Table Name</th>
                  <th className="thf">Old Value</th>
                  <th className="thf">New Value</th>
                </tr>
              </thead>
               <tbody>
                {historydata}
               </tbody>
            </table>
    </div>
            <div className="pages"> 
            <button onClick={previousPage}
            style={{backgroundColor:skip==0 ? "grey" : "#0f206c"}} 
             className="pagebutton" 
            disabled={skip==0 ? true : false} 
            > Previous Page </button>
            <button onClick={nextPage}  className="pagebutton" > Next Page </button> 
        </div>

 </>
  );
};

export default Changedata;