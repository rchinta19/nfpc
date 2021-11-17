import  React,{useState,useEffect} from "react";
import { DataGrid, GridToolbarContainer,
  GridToolbarExport,
  gridClasses, } from "@mui/x-data-grid";
import {useSelector} from 'react-redux'
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Checkbox } from "@material-ui/core";

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
function getSl_No(params) {
  return `${params.getValue(params.id, 'Sl_No')  }`;
}
// const handlemarkfalsepositive = (val) => {
 
//   if(Checkbox.checked === true){
  //   axios.post("/markfalsepositiveto1" ,val).then((res )=>{
  //      console.log("marked false positive")
  //   })
  // }
//   else{
//     axios.post("/markfalsepositiveto0", val).then((res )=>{
//       console.log("marked false positive")
//    })
//   }
// }



const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

const DefectsTable = (props) => {
  const [totalBottleCount,settotalBottleCount] = useState([])
  const [ticked,setticked]=useState(new Array(totalBottleCount.length).fill(false))
  // const handleCellClick = (params,event)=>{
  //   // console.log(params.row.)
  //   let markValue
  //   axios.post("/checkdefectlogValue",{Sl_No:params.id+1},config).then(res=>{
  //       console.log(res.data)
  //     if(res.data==0){
  //       axios.post("/markfalsepositiveto1",{Sl_No:params.id+1},config).then(res=>{
  //         console.log(res)
  //       })
  //     }else{
  //       axios.post("/markfalsepositiveto0",{Sl_No:params.id+1},config).then(res=>{
  //         console.log(res) 
  //       })
  //   }
  
    // if(params.ro=="Mark_False_Positive"){
     
    // }
    // console.log(params)
//   })
// }

const checkBoxSelectionHandler = (check,sno)=>{
  setticked(!ticked)
        console.log(check)
        console.log(sno)
        let checkCondition = check
        if(checkCondition){
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
            return
        }
        else if(!checkCondition){
          axios.post("/markfalsepositiveto0",{Sl_No:sno},config)
          .then((res)=>{
            // if (res.data) {
            //   console.log(res);
            //   // props.notticked(res.data);
            // }
              console.log(res.data)
            })
      }
    }
        
    const handleOnChange = (position,check,sno) => {
      const updatedCheckedState = ticked.map((item, index) =>
        index === position ? !item : item
      );
      setticked(updatedCheckedState);
      updatedCheckedState.reduce(
        (sum, currentState, index) => {
          if (currentState === true) {
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
            return totalBottleCount[index].getSl_No;
          }
          else if(currentState === true){
            axios.post("/markfalsepositiveto0",{Sl_No:sno},config)
            .then((res)=>{
              // if (res.data) {
              //   console.log(res);
              //   // props.notticked(res.data);
              // }
                console.log(res.data)
              })
        }
          return totalBottleCount[index].getSl_No;
        },
      );
    }
      
          
          
const columns = [
  // { field: "Sno", headerName: "S.No", width: 70 },
  {
    field: "Sl_No",
    headerName: "S.No",
    type: "number",
    width: 130,
  },
  // { field: "Time_stamp", headerName: "Time Stamp", type: "text", width: 130 },
  {
    field: "Time_Stamp",
    headerName: "Time Stamp",
    type: "text",
    width: 130,
  },
  { 
    field: "Bottle_Type",
    headerName: "Bottle Type",
    type: "text",
    width: 130,
  },
  {
    field: "Defect",
    headerName: "Defect",
    type: "text",
    width: 130,
  },
  {
    field: "Defect_Type",
    headerName: "Defect Type",
    type: "text",
    width: 130,
  },
  {
    field: "Image",
    headerName: "Image",
    type: "BLOB",
    width: 130,
  },
  {
    field: "Score1",
    headerName: "Score",
    type: "number",
    width: 130,
  },
  // {
  //   field: "checkboxSelection",
  //   headerName: "Mark_FalsePositive",
  //   type: "number",
  //   width: 180,
  // },
  {

    field: "Mark_False_Positive",
    headerName: 'Mark False Positive',
    type: "number",
    width: 250,
    valueGetter: getSl_No,
   renderCell: (cellValues) => {
    {totalBottleCount.map((index) => {
    return (
      <Checkbox key={index} checked={ticked[index]} onChange={() => handleOnChange(index)} id={`custom-checkbox-${index}`}  ></Checkbox>
    );
  }
    );
}
}
  }
];
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};
  
  useEffect(() => {
    axios.post("/defectlog",{from:props.fromDate,to:props.toDate},config).then((res) => {
      console.log(res.data)
       settotalBottleCount(res.data)
      });
    // console.log("executed")
    // axios.post('/data/filter',{filterString:"",queryParams:[]},config).then(res=>{
    //   console.log(res)
    // }).catch(err=>console.error(err))
  }, [props.fromDate,ticked]);

 
 

  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "white",marginTop:"600px" }}>
      <DataGrid
      components={{
        Toolbar: CustomToolbar,
      }}
        rows={totalBottleCount}
        getRowId = {(row)=>row.Sl_No}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
export default DefectsTable;