import  React,{useState,useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import {useSelector} from 'react-redux'
const columns = [
  { field: "id", headerName: "s.No", width: 70 },
  {
    field: "totalbootles",
    headerName: "Number of bottles",
    type: "number",
    width: 130,
  },
  { field: "Scratches", headerName: "Scratches", type: "number", width: 130 },
  {
    field: "Discoloration",
    headerName: "discoloration",
    type: "number",
    width: 130,
  },
  {
    field: "Foreign Particles",
    headerName: "Foreign Particles",
    type: "number",
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 2,
    Scratch: 30,
    totalbootles: 100,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 3,
    Scratch: 120,
    totalbootles: 100,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 4,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 5,
    totalbootles: 100,
    Scratch: 120,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 6,
    totalbootles: 100,
    Scratch: 30,
    discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 7,
    totalbootles: 100,
    Scratch: 120,
    Discoloration: 35,
    foreignparticles: 80,
  },
  {
    id: 8,
    totalbootles: 100,
    Scratch: 30,
    foreignparticles: 80,
    Discoloration: 35,
  },
];

export default function DefectLogTables() {
  const [totalBottleCount,settotalBottleCount] = useState()
  const  tbData =  useSelector((state) => state.dataset.typeA) 
  
 
  let x = {totalbootles:200,id:1}
 for(const ele of tbData){
 x = {...x,[ele.Defect_Type]:ele.count,totalbootles:x.totalbootles+ele.count}
    
 }

  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        rows={[x]}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
