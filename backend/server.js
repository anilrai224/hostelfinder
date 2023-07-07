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
app.get('/register/hostel',(req,res)=>{
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

// searching hostels
// app.get('/search',(req,res)=>{
//     const sql = "SELECT * FROM hostels";
//     db.query(sql,(err,data)=>{
//         if(err){
//             return res.json('Error');
//         }else{
//             return res.json(data);
//         }
//     })
// })

//searching hostels with inputs
app.post('/search', (req, res) => {
    const { hostel, location, iprice, fprice, seater } = req.body;
  
    const sql = "SELECT * FROM hostels WHERE type = ? AND address = ? AND price BETWEEN ? AND ? AND seater = ?";
    const values = [hostel, location, iprice, fprice, seater];
  
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error('Error searching hostels:', err);
        return res.status(500).json('Error');
      } else {
        console.log(data);
        return res.json(data);
      }
    });
  });

// app.get('/service',(req,res)=>{
//     res.send('hi');
// })
  
app.listen(port,()=>{
    console.log(`Server Running in port ${port}`);
})