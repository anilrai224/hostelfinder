const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hostelfinder'
})
db.connect(err=>{
    console.log(err?'Error connecting to database':'connected to the database')
})

//for student to register
app.post('/register/student',(req,res)=>{
    const {name,email,password,phone} = req.body;
    const sql='INSERT INTO student (name,email,password,phone) VALUES(?,?,?,?)';
    const values=[name,email,password,phone];
    db.query(sql,values,(err,data)=>{
        if(err){
           return res.json('Error');
        }else{
            return res.json('registered');
        }
    })
})
//for hostel owner to register
app.post('/register/hostel',(req,res)=>{
    const {name,email,password,phone} = req.body;
    const sql='INSERT INTO howner (name,email,password,phone) VALUES(?,?,?,?)';
    const values=[name,email,password,phone];
    db.query(sql,values,(err,data)=>{
        if(err){
           return res.json('Error');
        }else{
            return res.json('registered');
        }
    })
})

app.listen(port,()=>{
    console.log(`Server Running in port ${port}`);
})