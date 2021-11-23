import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

const VerticalBar = () => {
//   // const defectTypesAndCount = useSelector((state) => state.dataset.typeA);
//   const lables = ["typeA", "typeB"];
//   const dataset = [];
//   const clrs = [];
 
//   defectTypesAndCount.map((ele, index) => {
//     for (let [key, value] of Object.entries(ele)) {
//       if (ele.Bottle_type === "typeA") {
//         dataset.push({
//           label: `${ele.Defect_type}`,
//           data: [ele.count],
//           backgroundColor: "rgb(255, 99, 132)",
//           stack: "Stack 0",
//         });
//       } else {
//         dataset.push({
//           label: `${ele.Defect_type}`,
//           data: [ele.count],
//           backgroundColor: "rgb(255, 99, 132)",
//           stack: "Stack 0",
//         });
//       }
//     }
//     // lables.push(ele.Defect_Type)
//     // dataset.push(ele.count)
//   });
//   console.log(dataset)
//   //
//   console.log(defectTypesAndCount);

//   try {
//   } catch (err) {
//     console.error(err);
//   }

//   const data = {
//     labels: lables,
//     datasets: dataset,
//   };

//   const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };
  return (
    <>
      <Bar  />
    </>
  );
};

export default VerticalBar;
