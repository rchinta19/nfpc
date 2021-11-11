const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3");
const fileUpload = require('express-fileupload');
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const byCrypt = require('bcrypt');
const port = process.env.PORT || 1919;
const fs = require('fs');

app.use(express.static('public'))
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser())
const dealy = 1000*60*60*24
app.use(sessions({
  secret:"Su[pposed",
  name:"nfpc Session",
  cookie:{maxAge:dealy}
}))

let session
const db = new sqlite3.Database("./db/nfpcf.db", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to db");
});
let userMail
let users = []
app.post('/Login', function (req, res) {
  console.log(req)

  db.get('SELECT * FROM Userlogins where Email_Id=? and Password=?', [req.body.Email,req.body.Password], function(err, rows){ 
 
    try{
      if(rows.Email_Id == req.body.Email && rows.Password==req.body.Password){
        users.push(req.body.Email)
        req.session.userName=users[0]
         userMail=rows.Email_Id;
        res.send(true)
        const d = new Date()
        const hrs = d.getHours()
        const mins= d.getMinutes()
        const millsec = d.getMilliseconds()
        const dt = d.getDate()
        const mnth = d.getMonth()
        const yer = d.getFullYear()
        console.log(userMail)
        const updateLogger = `UPDATE Userlogins SET Login_Time=?  Where Email_Id=?`
        db.run(updateLogger,[`${hrs}:${mins}:${millsec} ${dt}-${mnth}-${yer}`,userMail],()=>{
          console.log("updated")
        })
        return
      }
    }catch(err){
      console.log(err)
    } 

})
})
const checkSignIn = (req,res,next)=>{
  console.log(req.session)
  if(req.session.userName){
    console.log(req.session)
    try{
      next()
    }catch(err){
      console.log(err)
    }
  }
  else{
    console.log("User does not exist")
    next()
    return

  }
}
app.get('/logout',function(req,res){
  console.log(req.session.page_views)
  const d = new Date()
  const hrs = d.getHours()
  const mins= d.getMinutes()
  const millsec = d.getMilliseconds()
  const dt = d.getDate()
        const mnth = d.getMonth()
        const yer = d.getFullYear()
  if(userMail){
    const updateLogger = `UPDATE Userlogins SET Logout_Time=? Where Email_Id=?`
    db.run(updateLogger,[`${hrs}:${mins}:${millsec} ${dt}-${mnth}-${yer}`,userMail],()=>{
      console.log("updated")
    })
    res.send(true)
}

 userMail=""
})



// below is for upload model
app.post('/uploadfile', (req, res) => {
  console.log("request arrived for file upload");
  const modelname=req.body.value
  const folder = `./modelfiles/${modelname}`
if (!fs.existsSync(folder)){
    fs.mkdirSync(folder, { recursive: true });
}
  if (!req.files) {
    console.log("failed");
      return res.status(500).send({ msg: "file is not found" })
  }
  const File=req.files.file;
  console.log(req.body.value)
  console.log(req.files.file)
  console.log(folder)
  console.log("request arrived for files upload");
 // Use the mv() method to place the file somewhere on your server
  File.mv(`${__dirname}/${folder}/${File.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "error" });
      }
      return res.send({ file: File.name, path: `/${File}`, ty: File.type });
  });
})
// above is for upload model

// upload data in model status in below
app.post('/upload', function (req,res) {

  let date = new Date().getDate() +  "/" +    (new Date().getMonth() + 1) +    "/" +    new Date().getFullYear()
  
  db.run(`insert into Modelstatuslist(Model,Version,Last_Update,Status) values(?,?,?,"inactive")`,[req.body.value,req.body.version,date], function(err,uploadata) {
    if (err) {
      return console.log(err.message);
    }
    
    if(uploadata){
   return console.log(uploadata);
    }
  //  res.send();
  });
  });
  // upload data in model status in above
// Harsha Update
app.post('/historyfilter', (req,res) => {

  // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
  db.all(`select * from historylog where Time_Stamp BETWEEN ? AND ?`,[req.body.from,req.body.to+1],(err, hfrows) => {
    console.log(req.body)
    console.log(req.body.from)
    console.log(req.body.to)
    if (err) {
      throw err;
    }
    
    res.send(hfrows);
    console.log(hfrows + " data retrieved")
    console.log(hfrows )
  })

});

  app.post('/historydaydata', (req,res) => {
    console.log("request arrived")

    // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
    db.all(`select * from historylog where Time_Stamp BETWEEN ? AND ?`,[req.body.from,req.body.to],(err, hdrows) => {
      
      console.log(req.body.from)
      console.log(req.body.to)
      if (err) {
        throw err;
      }
      
      res.send(hdrows);
      console.log(hdrows + " data retrieved")
      console.log(hdrows )
    })

  });
  //end 
// edit data in system thershold in below
app.post('/edit' , function(req,res){
  let data = [req.body.editvalue,req.body.Sl_No];
  let sql = `UPDATE SystemThreshold SET Score = ? WHERE Sl_No = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
    if(edit)
    {return console.log(edit);}
  
  });
  });
  
  // edit data in system thershold in above
  // amar---update
  // defectlog table rendering
app.post("/defectlog", (req, res) => {
  const sql3 = `Select * from Defectlog where Time_Stamp between ? and ?`;

  db.all(sql3,[String(req.body.from),String(req.body.to)], (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);

  });
});
// defectlog table rendering


//marking false positive to 1
app.post("/markfalsepositiveto1",(req,res) =>{
  console.log(req.body.Sl_No) 
  let data = [1,req.body.Sl_No];//removed Sl_No
  let sql = `UPDATE Defectlog SET Mark_False_Positive = ? WHERE Sl_No = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
   return ;
  
  });
});
app.post("/markfalsepositiveto0",(req,res) =>{
  console.log(req.body.Sl_No)
  let data = [0,req.body.Sl_No];//removed Sl_No
  let sql = `UPDATE Defectlog SET Mark_False_Positive = ? WHERE Sl_No = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
   return ;
  
  });
});

app.post("/checkdefectlogValue",(req,res)=>{
  let data = [req.body.Sl_No-1];//removed Sl_No
  let sql = `Select Mark_False_Positive from Defectlog where Sl_No=?`;

    db.all(sql, data, function(err,row){
    if (err) {
      return console.error(err.message);
    }
    console.log(row)
   return res.send(row.Mark_False_Positive);
  
  });
})

  //amar

// system threshold table renedering
app.get('/table',  (req, res) => {
  let sql = `SELECT * from SystemThreshold`;
  // let Sno = ;
  // console.log(sql);
  
  // first row only
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
  res.send(rows);
  });
  });
// system threshold table renedering


//model status table rendering
app.get('/status',  (req, res) => {
  let sql = `SELECT * from Modelstatuslist`;
  
  // first row only
  db.all(sql, (err, rowm) => {
    if (err) {
      
      throw err;
    }
  
    res.send(rowm);
    
  });
  });
//model status table rendering

app.get("/data", (req, res) => {
  const defectTypes_Count = [];
  const sql1 = `SELECT Defect_Type,count(*) as count FROM Defectlog WHERE Bottle_Type=? GROUP BY Defect_Type`;
  const sql = `SELECT Defect_Type,count(*) as count FROM Defectlog WHERE Bottle_Type=? GROUP BY Defect_Type`;

  db.all(sql1, ["typeA"], (err, rows) => {
    if (err) {
      console.log(err);
    }
    defectTypes_Count.push(rows);
  });
  db.all(sql, ["typeB"], (err, rows) => {
    if (err) {
      console.log(err);
    }
    defectTypes_Count.push(rows);
    res.send(defectTypes_Count);
  });
});
app.post("/data/filter",checkSignIn, (req, res) => {
  let filters = [];
  let bottletypes = []
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      filters.push(key);
    } 
  }
  if(filters.includes("typeA")){
    bottletypes.push("typeA")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("typeB")){
    bottletypes.push("typeB")
  }else{
    bottletypes.push("")
  }
   if(filters.includes("Discoloration")){
    bottletypes.push("Discoloration")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Scratches")){
    bottletypes.push("Scratches")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Foreign Particles")){
    bottletypes.push('Foreign Particles')
  }else{
    bottletypes.push("")
  }


  console.log(bottletypes)

  console.log(filters);
  let sqlString = `SELECT Defect_Type,COUNT(*) as count FROM Defectlog WHERE Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?) GROUP BY Defect_Type;`

  db.all(sqlString,bottletypes,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
    console.log(rows)
  })
  console.log(bottletypes)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
