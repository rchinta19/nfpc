import React, { useState } from "react";

const Render = (props) => {
  const [update, setupdate] = useState(false);

  const toggle = () => {
    setupdate(false);
  };

  const toggle1 = () => {
    setupdate(true);
  };
  return (
    <tr>
      <td className="td"> {props.itm.Sl_No }</td>
      <td className="td">{props.itm.Model}</td>
      <td className="td">{props.itm.Version}</td>
      <td className="td">{props.itm.Last_Update}</td>
      <td className="td">
        {/* {props.contact.Status} */}

        {update ? (
          <>
            <div onClick={(event) => toggle()}>active</div>
          </>
        ) : (
          <>
            <div onClick={() => toggle1()}>inactive</div>
          </>
        )}
      </td>
    </tr>
  );
};

export default Render;
