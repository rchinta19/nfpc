import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";


const LineChart = () => {
  const defectTypesAndCount = useSelector(state => state.dataset.typeA)
  console.log(defectTypesAndCount)
  const lables = []
  const dataset = []
  const clrs= []
   defectTypesAndCount.map((ele,index)=>{
    lables.push(ele.Defect_Type)
    dataset.push(ele.count)
  })
  const data = {
    labels: lables,
    datasets: [
      {
        label: "Defect type and count",
        data: dataset,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 9, 136, 0.6)",
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return(
  <>
    <Line data={data} options={options} />
  </>
  )
};

export default LineChart;
