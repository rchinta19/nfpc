import React,{useEffect,useState} from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';



const PieChart = () => {

  const defectTypesAndCount = useSelector(state => state.dataset.typeA)
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
        label: '# of Votes',
        data: dataset,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return(
  <>
    <Pie data={data} />
  </>
)};

export default PieChart;