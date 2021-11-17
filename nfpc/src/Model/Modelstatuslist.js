import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Render from "./Render.js";
import System from "../System/system.js";
// import data from "./data.json";
import { TiArrowUnsorted } from "react-icons/ti";
import "./model.Modules.css";
import  tick from "./tick/tick.png";

const Modelstatuslist = (props) => {
  // const [contacts, setContacts] = useState(data);
  const [value, setvalue] = useState("");
  const [version, setversion] = useState("");
  const [display, setDisplay] = useState(false);
  // const [newfile, setNewfile] = useState(null);
  // const [imgname, setImgName] = useState("");

  // const uploaddata = (e) => {
  //   axios
  //   .post('/upload', {
  //     value:value,
  //     version:version,

  //   })
  //   window.location.reload();

  //     e.preventDefault();

  // if(value){
  //   if(version){

  //     const newContact = {
  //       Model: value,
  //       Version: version,
  //       LastUpdate:
  //         new Date().getDate() +
  //         "/" +
  //         (new Date().getMonth() + 1) +
  //         "/" +
  //         new Date().getFullYear(),
  //       Status: "inactive"
  //     };

  //     // const newContacts = [...contacts, newContact];
  //     // setContacts(newContacts);
  //     setNewfile("");
  //     setImgName("");
  //     setvalue("");
  //     setversion("");
  //   }}
  // };

  // const handleChange = (event) => {
  //   setNewfile(URL.createObjectURL(event.target.files[0]));
  //   setImgName(event.target.files[0].name);
  // };

  // the below code is for data base
  const [mstatus, setmstatus] = useState([]);
 
  useEffect(() => {
    axios
      .get("/status")
      .then((res) => {
        // setContacts(res.data);
        // console.log(contacts);
        const x = [];
        res.data.map((ele) => {
          x.push(<Render key={Math.random().toString()} itm={ele} />);
        });
       setmstatus(...x)
        // console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  // the above code is for data base

 


  const getReqHandler = ()=>{
    axios
  .get('/status')
  .then(res=> {
 
  
  const x = []
  res.data.map(ele=>{
    x.push(<Render key={Math.random().toString()}itm={ele}/>)
  })
  setmstatus([...x])
 
  })
  .catch(err=>console.log(err))  
  
  }
  
  
  // the above code is for data base
  
  
  // below file upload
  
  const [file, setFile] = useState([]);
      const [data, getFile] = useState({ name: "", path: "" });
      const [progress, setProgess] = useState(0);
      const el = useRef();
  
  
      const handlefilechange = (e) => {
        setProgess(0)
        const file = e.target.files;
        // let file =[]
        //   let newarray=[...file,e.target.files[0]]
        console.log(file);
        console.log(file.length);
        setFile(file)
    }
    const uploadFile = () => {
      if(value){
      for(var i= 0; i<file.length; i++){
        const formData = new FormData();
        formData.append('file', file[i])
        formData.append('value',value)
        formData.append('version',version)
        console.log(file)
        axios.post('/uploadfile', formData, {
         
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress)
            }
        }).then(res => {
            console.log(res);
            setDisplay(true);
            
             })
            window.location.reload();
            // setDisplay(false);
        }
       
  
          }
        }

   useEffect(()=>{

    getReqHandler()
   
    },[display])
// above file upload



  

  // above file upload

  return (
    <>
      <div className="div-configpage">
      {/* {itm.Sl_No } */}
      {/* {mrstatus.Sl_No} */}
        <h1>SYSTEM CONFIGURATION </h1>
        <div className="div-model-1">
          <div className="tablecontainer">
            <h3>Model Status List</h3>
            <form className="form">
              <table className="table">
                <thead>
                  <tr>
                    <th className="th">
                      Sno
                      <TiArrowUnsorted />
                    </th>
                    <th className="th">Model</th>
                    <th className="th">Version</th>
                    <th className="th">LastUpdate</th>
                    <th className="th">Status</th>
                  </tr>
                </thead>
                <tbody>
          { mstatus}
          </tbody>
         
     
    
              </table>
            </form>
          </div>

          <div>
            <System />
          </div>
        </div>

        {/* below is insertion page */}
        <div className="div-model-2">
          <div>
            <h3>Upload a model</h3>
            {/* <form method="post" action="/upload" > */}
            <div className="configupload">
              <div className="config-uploadmodel">
                <label className="option" for="value">
                  Select Model
                </label>
                <br />
                <input
                  className="select"
                  type="text"
                  name="value"
                  placeholder="Enter a Model Name..."
                  required
                  // className="configinput"
                  // requiredTxt
                  // onChange={(e) => addchange(e)}
                  onChange={(e) => setvalue(e.target.value)}
                  value={value}
                  maxlength="15"
                />
              </div>
              <div className="config-uploadmodel">
                <label className="option" for="version">
                  Version
                </label>
                <br />
                <input
                  className="select"
                  type="text"
                  name="version"
                  placeholder="Enter a Version..."
                  maxlength="8"
                  required
                  // className="configinput"
                  // onChange={handleAddFormChange}
                  onChange={(e) => setversion(e.target.value)}
                  value={version}
                />
              </div>

              <div className="fileupload">
                <div className="config-uploadmodel">
                  <label for="fileInput" className="option">
                    Upload file
                  </label>
                  <br />
                  <label htmlFor="fileInput">
                    <input
                      type="text"
                      value={file.length +  " files selected"}
                      placeholder="No file choosen"
                      // className="configbrowse"
                      className="select"
                      // className="configinput"
                    />

                    <span className="configbrowse"> Browse </span>
                  </label>

                  <input
                    // className="select"
                    type="file"
                    id="fileInput"
                    ref={el}
                    multiple
                    onChange={handlefilechange}
                    // accept=".jpg, .jpeg, .png"
                    // onChange={(e) => handleChange(e)}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <button
                // onClick={(e) => {
                //   uploaddata(e);
                // }}
                onClick={uploadFile}
                type="submit"
                className="uploadbutton"
              >
                Upload
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>

        {/* below code is upload image */}

        {/* <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handlefilechange} />
                <div className="progessBar" style={{ width: progress }}>{progress}</div>
                <button onClick={uploadFile} className="upbutton">upload</button>
            </div>
            <hr />
            {data.path && <div><textarea value={data.path} onChange={uploadFile} /></div>}
            {/* {data.path && <img src={data.path} alt={data.name} />} */}
        {/* </div>
         */}

        {/* below code is upload image */}

        {display ? (
          <>
            <div className="sucess"  onClick={()=>setDisplay(false)} >
              <div className="abcdef">
                <img
                  className="sucesslogo"
                  src={tick}
                 
                />
                <div className="sucesstext">
                
                  Model has been uploaded successfully.
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default Modelstatuslist;
