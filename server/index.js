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
const path = require("path");
app.use("/Images", express.static(path.join(__dirname, "/Images")));
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
const db = new sqlite3.Database("./db/nfpc.db", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to db");
});
let userMail
let users = []
app.post('/Login', function (req, res) {
  db.get('SELECT * FROM Userlogins where Email_Id=? and Password=?', [req.body.Email,req.body.Password], function(err, rows){
    try{
      if(rows.Email_Id == req.body.Email && rows.Password==req.body.Password){
        console.log(rows)
         userMail=rows.Email_Id;
        res.send(true)
        const d = new Date()
        const hrs = d.getHours()
        
        const mins= d.getMinutes()
        const millsec = d.getSeconds()
        const dt = d.getDate()
        const mnth = d.getMonth()
        const yer = d.getFullYear()
        console.log(userMail)
        const logoutLogger = `UPDATE Userlogins SET Logout_Time=?  Where Logout_Time IS NULL AND Login_Time IS NOT NULL `
        db.run(logoutLogger,[`${dt}/${mnth+1}/${yer} ${hrs}:${mins}:${millsec}`],()=>{
          console.log("previous users logged out")
        })
        const updateLogger = `UPDATE Userlogins SET Login_Time=?  Where Email_Id=?` 
        db.run(updateLogger,[`${dt}/${mnth+1}/${yer} ${hrs}:${mins}:${millsec}`,userMail],()=>{
          console.log(`${hrs}:${mins}:${millsec}`)
        })
        const updateloggerlogout = `UPDATE Userlogins SET Logout_Time=? Where Email_Id=?`
        db.run(updateloggerlogout,[,userMail],()=>{
          console.log("logout time is updated")
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

app.post("/changepassword",(req,res) =>{
  console.log("request for change password is arrived")
  let data=[req.body.Email_Id,req.body.Password,req.body.Newpassword,req.body.reenternewpassword]
  console.log(data)

  db.get(`SELECT * FROM Userlogins where Email_Id=? and Password=?`, [req.body.Email_Id,req.body.Password], function(err, rows) {
 
    if(rows.Email_Id == req.body.Email_Id && rows.Password==req.body.Password){
      console.log("query executed")
      if(req.body.Newpassword==req.body.reenternewpassword)
    db.run(`UPDATE Userlogins SET Password = ? WHERE Email_Id = ?`,[req.body.Newpassword,req.body.Email_Id],function(err, urows){
      console.log("password is changed")
      res.send()
    })
    else {
      console.log("password is not changed")
    }
  }
  else {
    console.log("password is not changed")
  }  
  
  })
  
  });
  
  



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
  console.log(req.body.version)
  console.log(req.files.file)
  // console.log(folder)
  console.log("request arrived for files upload");
  let Path=`${__dirname}/${folder}/${File.name}`
  console.log(Path)
  let date = new Date().getDate() +  "/" +    (new Date().getMonth() + 1) +    "/" +    new Date().getFullYear()
 // Use the mv() method to place the file somewhere on your server
  File.mv(`${Path}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "error" });
      }else{
        db.run(`insert into Modelstatuslist(Model,Version,Last_Update,Status,File_Path) values(?,?,?,"inactive",?)`,[req.body.value,req.body.version,date,`${Path}`], function(err,uploadata) {
          console.log("model statuslist is updated")
          res.send()
        })
      return res.send({ file: File.name, path: `/${File}`, ty: File.type });
      }
  });
})


 


  app.post("/updatestatus" , (req,res) =>{
 console.log ("request arrived for active status")
  console.log(req.body.Sl_No)
  db.serialize(function(){
  db.all(`UPDATE Modelstatuslist  SET Status = ? WHERE Status = ? `,["Inactive","Active"])
  db.all(`UPDATE Modelstatuslist  SET Status = ? WHERE Sl_No = ? `,["Active",req.body.Sl_No])
  db.all(`select * from Modelstatuslist`,function(err,statusrows){
  console.log ("model status is updated as active")
    res.send(statusrows)
    console.log(statusrows)
  }
  )}
  );

    
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
// new deflog render
// app.post('/defectlogdaydata', (req,res) => {
 
//   let value = (req.body.skip);
//   console.log(value);
 
//   // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
//  db.all(`select * from Defectlog where Time_Stamp BETWEEN ? AND ?   LIMIT ? OFFSET  ?`,[`${req.body.from}`,`${req.body.to}`,req.body.limit,value],(err, dlrows) => {
    
//    //db.all(`select * from historylog (MULTISET (SELECT SKIP ? FIRST ?) where Time_Stamp BETWEEN ? AND ?  `,[req.body.skip,req.body.limit,req.body.from,req.body.to],(err, hdrows) => {
//     if (err) {
//       throw err;
//     }
    
//     res.send(dlrows);
   
//     console.log(dlrows )
//   })

// });
app.post("/defectlogdaydata",checkSignIn, (req, res) => {
    console.log(req.body)
    let dlfilters = [];
    let dlbottletypes = []
   let {from,to,limit,skip} = req.body
   
  
    for (const [dlkey, dlvalue] of Object.entries(req.body.filterConditions)) {
      if (dlvalue) {
        dlfilters.push(dlkey);
      } 
    }
    if(dlfilters.includes("typeA")){
      dlbottletypes.push("typeA")
    }else{
      dlbottletypes.push("")
    }
    if(dlfilters.includes("typeB")){
      dlbottletypes.push("typeB")
    }else{
      dlbottletypes.push("")
    }
     if(dlfilters.includes("Discoloration")){
      dlbottletypes.push("Discoloration")
    }else{
      dlbottletypes.push("")
    }
    if(dlfilters.includes("Scratches")){
      dlbottletypes.push("Scratches")
    }else{
      dlbottletypes.push("")
    }
    if(dlfilters.includes("Foreign Particles")){
      dlbottletypes.push('Foreign Particles')
    }else{
      dlbottletypes.push("")
    }
  
  console.log(from,to,...dlbottletypes)
  
  
    console.log(dlfilters);
    let sqlString = `SELECT Sl_No,Time_Stamp,Bottle_Type,Defect,Defect_Type,Image,Score1,Mark_False_Positive FROM Defectlog WHERE  Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?) LIMIT ? OFFSET  ?;`
    db.all(sqlString,[`${from}`,`${to}`,...dlbottletypes,`${limit}`,`${skip}`],(err,drows)=>{
      if(err){
        console.log(err)
      }
      res.send(drows) 
      console.log(drows)
    })
    console.log(dlbottletypes) 
  })
  
// defectlog table rendering
app.post('/defectfilternextpage', (req,res) => {
  let dlfilters = [];
  let dlbottletypes = []
 let {from,to,limit,skip} = req.body
 

  for (const [dlkey, dlvalue] of Object.entries(req.body.filterConditions)) {
    if (dlvalue) {
      dlfilters.push(dlkey);
    } 
  }
  if(dlfilters.includes("typeA")){
    dlbottletypes.push("typeA")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("typeB")){
    dlbottletypes.push("typeB")
  }else{
    dlbottletypes.push("")
  }
   if(dlfilters.includes("Discoloration")){
    dlbottletypes.push("Discoloration")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Scratches")){
    dlbottletypes.push("Scratches")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Foreign Particles")){
    dlbottletypes.push('Foreign Particles')
  }else{
    dlbottletypes.push("")
  }

console.log(from,to,...dlbottletypes)


  console.log(dlfilters);
  let sqlString = `SELECT Sl_No,Time_Stamp,Bottle_Type,Defect,Defect_Type,Image,Score1,Mark_False_Positive FROM Defectlog WHERE  Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?) LIMIT ? OFFSET  ?;`
  db.all(sqlString,[`${from}`,`${to}`,...dlbottletypes,`${limit}`,`${skip}`],(err, dlnrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(dlnrows);
    console.log(dlnrows )
  })

});

app.post('/defectfilterpreviouspage', (req,res) => {
  let dlfilters = [];
  let dlbottletypes = []
 let {from,to,limit,skip} = req.body
 

  for (const [dlkey, dlvalue] of Object.entries(req.body.filterConditions)) {
    if (dlvalue) {
      dlfilters.push(dlkey);
    } 
  }
  if(dlfilters.includes("typeA")){
    dlbottletypes.push("typeA")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("typeB")){
    dlbottletypes.push("typeB")
  }else{
    dlbottletypes.push("")
  }
   if(dlfilters.includes("Discoloration")){
    dlbottletypes.push("Discoloration")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Scratches")){
    dlbottletypes.push("Scratches")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Foreign Particles")){
    dlbottletypes.push('Foreign Particles')
  }else{
    dlbottletypes.push("")
  }

console.log(from,to,...dlbottletypes)


  console.log(dlfilters);
  let sqlString = `SELECT Sl_No,Time_Stamp,Bottle_Type,Defect,Defect_Type,Image,Score1,Mark_False_Positive FROM Defectlog WHERE  Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?) LIMIT ? OFFSET  ?;`
  db.all(sqlString,[`${from}`,`${to}`,...dlbottletypes,`${limit}`,`${skip}`],(err, dlfrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(dlfrows);
    console.log(dlfrows )
  })

});
// end
app.post('/historyfilter', (req,res) => {
  console.log("request arrivedf")
 
  console.log(req.body.from)
  console.log(req.body.to)
  console.log(req.body.skip)
  console.log(req.body.limit)
  let value = (req.body.skip);
  console.log(value);
  // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
  db.all(`select * from historylog where Time_Stamp BETWEEN ? AND ? LIMIT ? OFFSET  ?`,[req.body.from,req.body.to+1,req.body.limit,value],(err, hfrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(hfrows);
    console.log(hfrows )
  })

});

app.post('/historyfilternextpage', (req,res) => {
  console.log("request arrived for nextpage")
 
  console.log(req.body.from)
  console.log(req.body.to)
  console.log(req.body.skip)
  console.log(req.body.limit)
  let value = (req.body.skip);
  console.log(value);
  // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
  db.all(`select * from historylog where Time_Stamp BETWEEN ? AND ? LIMIT ? OFFSET  ?`,[req.body.from,req.body.to+1,req.body.limit,value],(err, hfnrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(hfnrows);
    console.log(hfnrows )
  })

});

app.post('/historyfilterpreviouspage', (req,res) => {
  console.log("request arrived for")
 
  console.log(req.body.from)
  console.log(req.body.to)
  console.log(req.body.skip)
  console.log(req.body.limit)
  let value = (req.body.skip);
  console.log(value);
  // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
  db.all(`select * from historylog where Time_Stamp BETWEEN ? AND ? LIMIT ? OFFSET  ?`,[req.body.from,req.body.to+1,req.body.limit,value],(err, hfrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(hfrows);
    console.log(hfrows )
  })

});


  app.post('/historydaydata', (req,res) => {
    console.log("request for historylog arrived")
    console.log(req.body.from)
    console.log(req.body.to)
    console.log(req.body.skip)
    console.log(req.body.limit)
    let value = (req.body.skip);
    console.log(value);
    // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
   db.all(`select * from historylog where Time_Stamp BETWEEN ? AND ?   LIMIT ? OFFSET  ?`,[req.body.from,req.body.to+1,req.body.limit,value],(err, hdrows) => {
      
     //db.all(`select * from historylog (MULTISET (SELECT SKIP ? FIRST ?) where Time_Stamp BETWEEN ? AND ?  `,[req.body.skip,req.body.limit,req.body.from,req.body.to],(err, hdrows) => {
      if (err) {
        throw err;
      }
      
      res.send(hdrows);
     
      console.log(hdrows )
    })

  });
  //end 
// edit data in system thershold in below
app.post('/edit' , function(req,res){
  let data = [req.body.editvalue ,req.body.Sl_No];
  let sql = `UPDATE SystemThreshold SET Score = ? WHERE Sl_No = ?`;

    db.all(sql, data, function(err,edit){
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
  console.log("deflog")
  db.all(sql3,[String(req.body.from),String(req.body.to)], (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);

  });
});
// defectlog table rendering
app.get('/fetchImage/:file(*)', (req, res) => {
  let file = req.params.file;
  let fileLocation = path.join('../Images/', file);
  //res.send({image: fileLocation});
  res.sendFile(`${fileLocation}`)
})


//marking false positive to 1
app.post("/markfalsepositiveto1",(req,res) =>{
  console.log("0-1")
  console.log(req.body.Sl_No) 
  let data = [1,req.body.Sl_No];//removed Sl_No
  let sql = `UPDATE Defectlog SET Mark_False_Positive = ? WHERE Sl_No = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
   res.send(edit) ;
  
  });
});
app.post("/markfalsepositiveto0",(req,res) =>{
  console.log("1-1")
  console.log(req.body.Sl_No)
  let data = [0,req.body.Sl_No];//removed Sl_No
  let sql = `UPDATE Defectlog SET Mark_False_Positive = ? WHERE Sl_No = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
    res.send(edit);
  
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

app.get("/data", async (req, res) => {
  console.log(req.body)
  let filters = [];
  let bottletypes = []
  const chartData =[]
 const x = new Date()
  let givenDate = `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()-2}`
  let nextDate =`${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()-1}`
  // 

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

  let sqlString1 = `SELECT Time_Stamp,SUM(count) as TotalCount FROM (SELECT Time_Stamp, Defect_Type,COUNT(*) as count FROM Defectlog WHERE Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?)  GROUP BY Defect_Type,Time_Stamp) GROUP BY Time_Stamp;`
await  db.all(sqlString1,[`${givenDate}`,`${nextDate}`,"typeA","typeB","Discoloration","Foreign Particles","Scratches"],async(err,rows)=>{
    if(err){
      console.log(err)
      return
    }
    await chartData.push(rows)
  })
  
  let sqlString = `SELECT Defect_Type,COUNT(*) as count FROM Defectlog WHERE Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?)  GROUP BY Defect_Type;`

  await db.all(sqlString,[`${givenDate}`,`${nextDate}`,"typeA","typeB","Discoloration","Foreign Particles","Scratches"],async(err,rows)=>{

    if(err){

      console.log(err)
    }
   await chartData.push(rows)
   
  })
   let barDataQuary = `   SELECT Defect_Type,Bottle_Type,COUNT(*) as count FROM Defectlog Where Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN(?,?) AND Defect_type IN(?,?,?,?)  GROUP BY Defect_Type,Bottle_Type;`
   await db.all( barDataQuary,[`${givenDate}`,`${nextDate}`,"typeA","typeB","Discoloration","Foreign Particles","Scratches"],async(err,rows)=>{
    if(err){
      console.log(err)
    }
    await chartData.push(rows)
    res.send(chartData)
    console.log(chartData)
  })

});

app.post("/data/filter",checkSignIn, async (req, res) => {
  console.log(req.body)
  let filters = [];
  let bottletypes = []
  const chartData =[]
 let {fromDate,toDate} = req.body


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

console.log(fromDate,toDate,...bottletypes)


  console.log(filters);
  let sqlString1 = `SELECT Time_Stamp,SUM(count) as TotalCount FROM (SELECT Time_Stamp, Defect_Type,COUNT(*) as count FROM Defectlog WHERE Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?)  GROUP BY Defect_Type,Time_Stamp) GROUP BY Time_Stamp;`
 await db.all(sqlString1,[`${fromDate}`,`${toDate}`,...bottletypes],async(err,rows)=>{
    if(err){
      console.log(err)
      return
    }

    chartData.push(rows)
   
  })
  
  let sqlString = `SELECT Defect_Type,COUNT(*) as count FROM Defectlog WHERE Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?)  GROUP BY Defect_Type;`

await  db.all(sqlString,[`${fromDate}`,`${toDate}`,...bottletypes],async(err,rows)=>{

    if(err){

      console.log(err)
    }
   await chartData.push(rows)
  
  })
  let barDataQuary = ` SELECT Defect_Type,Bottle_Type,COUNT(*) as count FROM Defectlog Where Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_type IN(?,?,?,?)  GROUP BY Defect_Type,Bottle_Type;`
  await db.all( barDataQuary,[`${fromDate}`,`${toDate}`,...bottletypes],async(err,rows)=>{
    if(err){
      console.log(err)
    }
    await chartData.push(rows)
    res.send(chartData)
    console.log(chartData)
  })
  
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
