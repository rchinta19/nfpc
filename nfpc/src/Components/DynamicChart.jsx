import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartDataLabels from 'chartjs-plugin-datalabels'


const VerticalBar = () => {
  const defectTypesAndCount = useSelector((state) => state.dataset.typeA);
  const lables = [];
  const dataset= [{
    label: `Discoloration`,
    data: [],
    backgroundColor: "#ffff33",
    stack: "Stack 1",
  },{
    label: 'Scratches',
    data: [],
    backgroundColor: "rgb(255, 99, 155)",
    stack: "Stack 1",
  },{
    label: 'Foreign Particles',
    data: [],
    backgroundColor: "#ffCfA3",
    stack: "Stack 1",
  }]
  
  try {
    defectTypesAndCount[2].forEach(ele=>{
     
          dataset.forEach((item,index)=>
              {
              if(item.label===ele.Defect_Type){
                  if(lables.includes(ele.Bottle_Type)){
                    
                  }
                  else{
                    lables.push(ele.Bottle_Type)
                  }
                  dataset[index].data.push(ele.count)
                return 
              }
              return

          }
          )

      
  })
  } catch (err) {
    console.log(err);
  }
  console.log(dataset);
  //
  console.log(dataset)

  const data = {
    labels: lables,
    datasets: dataset,
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
  return (
    <>
      <Bar data={data} options={options}  plugins={[ChartDataLabels]}/>
    </>
  );
};

export default VerticalBar;
