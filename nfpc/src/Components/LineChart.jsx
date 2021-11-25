import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels'
// plugins: {

//   datalabels: {

//     backgroundColor: function(context) {

//       return context.dataset.backgroundColor;

//     },

//     borderRadius: 4,

//     color: 'white',

//     font: {

//       weight: 'bold'

//     },

//     formatter: Math.round,

//     padding: 6

//   }

// },
// plugins={[ChartDataLabels]}
const LineChart = () => {
  const defectTypesAndCount = useSelector(state => state.dataset.typeA)
  console.log(defectTypesAndCount)
  const lables = []
  const dataset = []
  const clrs= []
  try{
   defectTypesAndCount[0].map((ele,index)=>{
    lables.push(ele.Time_Stamp)
    dataset.push(ele.TotalCount)
  })
}catch(err){
  console.log(err)
}
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
    plugins: {

      datalabels: {

        backgroundColor: function(context) {

          return context.dataset.backgroundColor;

        },

        borderRadius: 4,

        color: 'white',

        font: {

          weight: 'bold'

        },

        formatter: Math.round,

        padding: 6

      }

    },
  };
  return(
  <>
    <Line data={data} options={options} plugins={[ChartDataLabels]}/>
  </>
  )
};

export default LineChart;
