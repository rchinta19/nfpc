import React ,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Renderhistory from "./Renderhistorylog";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {TextField,Button} from "@mui/material";
import { filterHandler } from "../../features/filter/filterSlice";
import { TiArrowUnsorted } from "react-icons/ti";
import PaginationItem from '@mui/material/PaginationItem';
import { Link, MemoryRouter, Route } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';

function Changedata() {



  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }


  let fromdaydate = new Date().getFullYear() +  "-" +    (new Date().getMonth() + 1) +    "-" + pad2(new Date().getDate())   
  let todaydate =  new Date().getFullYear() +  "-" +    (new Date().getMonth() + 1) +    "-" +   pad2(new Date().getDate()+1)
    const [historydata,sethistorydata]=useState([]);
    // const [value, setValue] = useState({ fromf: "", tof: "" });
    const filterConditions = useSelector((state) => state.filter);
    const [from,setfrom] = useState();
    const [to,setto] = useState();
    const[sample , setsample] = useState();
    // const x = new Date()
    // let givenDate = `${x.getMonth()+1}/${x.getDate()}/${x.getDate()}`
    const [dates, setdates] = useState({
      fromDate:fromdaydate,
      toDate: todaydate,
    });
    // const dispatch = useDispatch();

    const applyFilterHandler = (e) => {
   
      axios
    .post("/historyfilter",
    {
      from:from,
      to:to,
    } )
    .then((res) => {
      console.log(res.data);
      sethistorydata(res.data)
      // const hdf = []
// res.data.map(ele=>{
// hdf.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
// })
// sethistorydata([...hdf])
      
    })
    .catch(err=>console.log(err))  
   setfrom("")
   setto("")
    };
   


    useEffect(()=>{ 
      
    axios
    .post("/historydaydata",
    {
      from:dates.fromDate,
      to:dates.toDate,
    }
    // dates
    )
    .then((res) => {
      console.log(res.data);
      sethistorydata(res.data)
      // const hd = []
// res.data.map(ele=>{
// hd.push(<Renderhistory key={Math.random().toString()} hditm={ele}/>)
// hd.push(res.data)
// })
// sethistorydata([...hd])
      
    })
    .catch(err=>console.log(err))  
    
  },[ ])
  const useStyles = makeStyles({
    root: {
      '& .super-app-theme--header': {
        backgroundColor: 'rgba(255, 7, 0, 0.55)',
      },
    },
  });

// below is sample
const columns = [
    {
  
      field: "Sl_No",  
      headerName: "Sl_No",
  headerClassName: 'super-app-theme--header',
  
      type: "number",
  
      width: 100,
  
  
    },
  {
  
        field: "User_Name",
    
        headerName: "User_Name",
    headerClassName: 'super-app-theme--header',
    
        type: "text",
    
        width: 100,
    
      },
   
    {
  
      field: "Time_Stamp",
  
      headerName: "Time_Stamp",
  headerClassName: 'super-app-theme--header',
  
      type: "text",
  
      width: 150,
  
    },
  
   
  
    {
  
      field: "Item_Modified",
  
      headerName: "Item_Modified",
  headerClassName: 'super-app-theme--header',
  
      type: "text",
  
      width: 100,
  
    },
  
    {
  
      field: "Table_Name",
  
      headerName: "Table_Name",
  headerClassName: 'super-app-theme--header',
  
      type: "text",
  
      width: 150,
  
    },
  
    {
  
      field: "Old_Value",
  
      headerName: "Old_Value",
  headerClassName: 'super-app-theme--header',
  
      type: "text",
  
      width: 100,
  
    },
  
    {
  
      field: "New_Value", 
  
      headerName: "New_Value",
  headerClassName: 'super-app-theme--header',
  
      type: "text",
  
      width: 100,
  
    },
    
  ];
// above is sample


const classes = useStyles();
// function getSl_No(params) {
//   return `${params.getValue(params.id, 'Sl_No') }`}



    return (
        <>
        
    <h1>History Logs</h1>
          <div>
                  

<input
type="date"
value={from}
name="from"
onChange={(e) => setfrom(e.target.value)}
/>

<input
type="date"
name="to"
value={to}
onChange={(e) => setto(e.target.value)}
/>



            <Button type="submit" className="submit-btn" onClick={applyFilterHandler} >
            Search
          </Button>
          </div>



        {/* <table className="table" >
              <thead >
                <tr>
                  <th className="th">
                    Sl_No
                    <TiArrowUnsorted />
                    </th>
                  <th className="th">User_Name</th>
                  <th className="th">Time_Stamp</th>
                  <th className="th">Item_Modified</th>
                  <th className="th">Table_Name</th>
                  <th className="th">Old_Value</th>
                  <th className="th">New_Value</th>
                </tr>
              </thead>

              <tbody>
                {historydata}
               
              </tbody>
            </table> */}




            {/* below is sample */}
            <div style={{ height: 450, width: "100%", backgroundColor: "white" }} className={classes.root}>

      <DataGrid
          rows={historydata} 

     getRowId = {(row) => row.Sl_No}
  
     columns={columns} 

         pageSize={10} 
        
         rowsPerPageOptions={[10]} 
        
      />

    </div>
            {/* avove is sample */}
        </>
    )
}

export default Changedata;

