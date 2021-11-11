import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicChart from "../DynamicChart";
import { Bar, Pie } from "react-chartjs-2";
import PieChart from "../PieChart";
import LineChart from "../LineChart";
import DefectLogTables from "../DefectLogTables";
import axios from "axios";
import DefectsTable from '../DefectsTable'
import {
  FormGroup,
  Checkbox,
  Paper,
  FormControlLabel,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { yellow } from '@mui/material/colors'
import { filterHandler } from "../../features/filter/filterSlice";
import { defectSettingHandler } from "../../features/DatesettingSlice";

import "./Dashboard.modules.css";
function Dashboard() {
  const [value, setValue] = useState({ fromd: "", tod: "" });
  const filterConditions = useSelector((state) => state.filter);
  const [checkBox, setCheckBox] = useState(false)
  const [tab, settab] = useState(true)
  const x = new Date()
  let givenDate = `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`
  const [checkedValues, setCheckedValues] = useState({
    fromDate:givenDate,
    toDate: givenDate,
    typeA:false,
    typeB: false,
    Scratches: false,
    Discoloration: false,
    "Foreign Particles": false,
    All: false,
  });
 
 
 
  const defectTypes_Count = useSelector((state) => state.dataset.typeA);
  console.log(defectTypes_Count);
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };
  const dispatch = useDispatch();

  const [table, setTable] = useState(true);
  const changeToTableHandler = () => {
    setTable(!table);
  };
  const applyFilterHandler = (e) => {
    dispatch(filterHandler({ ...checkedValues }));
    console.log(filterConditions);
    axios.post("/data/filter", checkedValues, config).then((res) => {
      console.log("here")
      console.log(res.data);
      dispatch(defectSettingHandler({ typeA: res.data }));
  
    });

 
  };
 

  useEffect(() => {
  
    axios.get("/data").then((res) => {
        const [typea, typeb] = res.data;
        dispatch(defectSettingHandler({ typeA: typea, typeB: typeb }));
      });
    // console.log("executed")
    // axios.post('/data/filter',{filterString:"",queryParams:[]},config).then(res=>{
    //   console.log(res)
    // }).catch(err=>console.error(err))
  }, []);

  return (
    <Grid container xs={12} >
    <h1>Dashboard</h1>
      <Grid xs={12}>
        <Paper elevation={3} className="form">
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
              className="dtpicker"
                label="From Date"
                value={checkedValues.fromDate}
                sx={{ backgroundColor: "black" }}
                onChange={(value) => {
                  setValue((prev) => {
                    return { ...prev, fromd: value };
                  });
                  setCheckedValues({ ...checkedValues, fromDate:`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}` });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="to"
                value={checkedValues.toDate}
                className="dtpicker"
                onChange={(value) => {
                  setValue((prev) => {
                    return { ...prev, tod: value };
                  });
                  setCheckedValues({ ...checkedValues, toDate:`${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`});
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <FormGroup className="checks">
            Bottle Types
            <div>
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label="TypeA"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, typeA: !prev.typeA };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="TypeB"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, typeB: !prev.typeB};
                });
              }}
            />
            </div>
          </FormGroup>
          <FormGroup className="checks">
            <span> Defect Types</span>
            <div>
            <FormControlLabel
              control={<Checkbox />}
              label="Scratch"
              onChange={(e) => {
                console.log(e.target.value);
                setCheckedValues((prev) => {
                  return { ...prev, Scratches: !prev.Scratches};
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Foreign Particle"
              onChange={(e) => {
                console.log(e);
                setCheckedValues((prev) => {
                  return { ...prev, "Foreign Particles": !prev["Foreign Particles"] };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Discoloration"
              onChange={(e) => {
                setCheckedValues((prev) => {
                  return { ...prev, Discoloration: !prev.Discoloration };
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="All"
              onChange={(e) => {
                console.log("clicked");
                setCheckedValues((prev) => {
                  return { ...prev, All: e.target.value };
                });
              }}
            />
            </div>
          </FormGroup>
          <Button type="submit" className="submit-btn" onClick={applyFilterHandler} >
            Submit
          </Button>
        </Paper>
 
        <div style={{padding:"11px",display:"flex"}}>
        <button onClick={()=>settab(true)} style={{width:"50vw",height:"5vh"}} >Graphs</button>
<button onClick={()=>settab(false)} style={{width:"50vw",height:"5vh"}}>Defect log table</button>
    </div>


      </Grid>

{tab ? (<>
      <Grid xs={4} >
        <Paper className="bar-chart" onClick={changeToTableHandler}>
          <DynamicChart />
        </Paper>
      </Grid>
      {table ? (
        <>
          <Grid xs={4}>
            <Paper className="bar-chart ">
              <PieChart />
            </Paper>
          </Grid>
          <Grid xs={4}>
            <Paper className=" bar-chart">
              <LineChart />
            </Paper>
          </Grid>
        </>
      ) : (
        <Grid xs={6}>
          <Paper className="bar-chart">
            <DefectLogTables />
          </Paper>
        </Grid>
      )}</>) : 
        <Grid xs={12}>
          <Paper>
          <DefectsTable fromDate={checkedValues.fromDate} toDate={checkedValues.toDate}/>
          </Paper>
        </Grid>

      }
    </Grid>
  );
}

export default Dashboard;
