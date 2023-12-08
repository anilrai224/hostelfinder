const express = require('express')
const mysql = require('mysql')
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
// // const { rmSync } = require('fs');
const port = 3031;

//dispaly error message if the logintype is student and someone tries to to access the url of 
//howner e.g /howner/profile

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret:'helloworld',
    resave:false,
    saveUninitialized:true,
}))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images');
    },
    //file name starts with undefined i.e file is not recognized
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
})
const upload = multer({
    storage:storage
})

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
    const parsedPhone = parseInt(phone, 10);
    const sql='INSERT INTO student (name,email,password,phone) VALUES(?,?,?,?)';
    const values=[name,email,password,parsedPhone];
    db.query(sql,values,(err,data)=>{
        if(err){
           return res.json('Error');
        }else{
            console.log('Inserted');
            return res.json('registered');
        }
    })
})

//checking availability of email for student
app.post('/register/student/check-email',(req,res)=>{
    const {email} = req.body;
    const sql = "SELECT COUNT(*) as count FROM student WHERE email = ?";
    db.query(sql,[email],(err,data)=>{
        if(err){
            return res.json("Internal Server Error");
        }
        const isAvailable = data[0].count===0;
        res.json({isAvailable});
    })
})

//check availability for email for howner
app.post('/register/howner/check-email',(req,res)=>{
    const {email} = req.body;
    const sql = "SELECT COUNT(*) as count FROM howner WHERE email = ?";
    db.query(sql,[email],(err,data)=>{
        if(err){
            return res.json("Internal Server Error");
        }
        const isAvailable = data[0].count===0;
        res.json({isAvailable});
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

// searching hostels
app.get('/search',(req,res)=>{
    const sql = "SELECT * FROM hostels";
    db.query(sql,(err,data)=>{
        if(err){
            return res.json('Error');
        }else{
            return res.json(data);
        }
    })
})

//searching hostels with inputs
app.post('/search', (req, res) => {
    const { hostel, location, iprice, fprice, seater } = req.body;
  
    const sql = "SELECT * FROM hostels WHERE type=? and  address=? ";
  
    db.query(sql, [hostel,location], (err, data) => {
      if (err) {
        console.error('Error searching hostels:', err);
        return res.status(500).json('Error');
      } else {
        // return res.json(data);
        console.log(data)
        const filteredHostel = []
        data.map(hostel=>{
            const details=JSON.parse(hostel.seats_details);
            details.map(detail=>{
                const parsedTPrice = parseInt(detail.tprice);
                const parsedPrice = parseInt(iprice);
                const parsedFPrice = parseInt(fprice);
                if(seater===detail.seat){
                    if(parsedTPrice>=parsedPrice && parsedTPrice <=parsedFPrice){
                        filteredHostel.push(hostel);
                    }
                }
            })
        })
        return res.json(filteredHostel);
      }
    });
  });

//login for students
app.post('/login/student',(req,res)=>{
    const {email,password} = req.body;
    const sql = "SELECT * FROM student where email=? and password=?";
    
    db.query(sql,[email,password],(err,data)=>{
        if(err){
            return res.json("Error");
        }else{
            if(data.length===1){
                const user = data[0];
                req.session.user = user;
                return res.json(user);
            }else{
                return res.json("Invalid");
            }
        }
    })
})

//accessing student account (when page is refreshed:-)
app.post('/user',(req,res)=>{
    const {uid} = req.body;
    sql= "SELECT * FROM student where id = ?";
    db.query(sql,[uid],(err,data)=>{
        if(err){
            return res.json("ERROR");
        }else{
            if(data.length>0){
                return res.json(data[0])
            }else{
                return res.json("Not Found");
            }
        }
    })
})

//accessing hostel owner account (when page is refreshed)
app.post('/huser',(req,res)=>{
    const {uid} = req.body;
    sql= "SELECT * FROM howner where id = ?";
    db.query(sql,[uid],(err,data)=>{
        if(err){
            return res.json("ERROR");
        }else{
            if(data.length>0){
                return res.json(data[0])
            }else{
                return res.json("Not Found");
            }
        }
    })
})

//profile edit for student
app.post('/student/account',upload.single('image'),(req,res)=>{
    const image = req.file.filename;
    const {email,bio,gender,dob,country,paddress,taddress,city,id} =req.body;
    const sql = "UPDATE student SET email = ?, bio =?, gender= ?, dob=?, country=?, paddress=?, taddress=?, city=?, image=? where id=?";

    db.query(sql,[email,bio,gender,dob,country,paddress,taddress,city,image,id],(err,data)=>{
        if(err){
            return res.json(err);
        }else{
            const sql = "SELECT * FROM student where id =?";
            db.query(sql,[id],(err,data)=>{
                if(err){
                    return res.json("NotFound");
                }else{
                    return res.json(data[0])
                }
            })
        }
    })
})

//profile edit for hostel owner
app.post('/howner/edit',upload.single('image'),(req,res)=>{
    const image = req.file.filename;
    const {email,phone,country,address,city,id} =req.body;
    const sql = "UPDATE howner SET email = ?,phone=?, country=?, address=?, city=?, image=? where id=?";

    db.query(sql,[email,phone,country,address,city,image,id],(err,data)=>{
        if(err){
            return res.json(err);
        }else{
            const sql = "SELECT * FROM howner where id =?";
            db.query(sql,[id],(err,data)=>{
                if(err){
                    return res.json("NotFound");
                }else{
                    return res.json(data[0])
                }
            })
        }
    })
})
  
//changing password for student
//work to do check if the changed password is similar to current password
app.post('/student/security',(req,res)=>{
    const {cpassword,npassword,id} = req.body;
    const password = "SELECT password from student where id = ?";
    db.query(password,[id],(err,data)=>{
        if(err){
            return res.json("Error");
        }else{
            const userPassword = data[0].password;
            // console.log(userPassword,cpassword,npassword);
            if(userPassword===cpassword){
                const sql = "UPDATE student set password = ? where id =?";
                db.query(sql,[npassword,id],(err,data)=>{
                    if(err){
                        return res.json("Error");
                    }else{
                        return res.json(0);
                    }
                })
            }else{
                return res.json(1);
            }
        }
    })
})

//login for hostel owner
app.post('/login/hostel',(req,res)=>{
    const {email,password}=req.body;
    const sql= "SELECT * FROM howner where email=? and password=?";
    
    db.query(sql,[email,password],(err,data)=>{
        if(err){
            return res.json("Error");
        }else{
            if(data.length>0){
                return res.json(data[0]);
            }else{
                return res.json("NotFound");
            }
        }
    })
})

//posting hostels
app.post('/howner/RegisterHostel', upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const {id, name, address, people, tole, type, rooms, facilities, seats} = req.body;
    const parsedFacilities = JSON.parse(facilities);
    const parsedSeats = JSON.parse(seats);

    // Prepare the values
    //we should post id also and that id should be the id of the honwer who post hostel/register hostel
    //that id is already stored in localstorage with name 'uid'
    const query = `
      INSERT INTO hostels (id,image, name, address, people, tole, type, rooms, facilities, seats_details)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      id,image, name, address, people, tole, type, rooms, JSON.stringify(parsedFacilities), JSON.stringify(parsedSeats)
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        console.log('Data inserted into hostels table');
        res.json('Hostel registered successfully');
        const query = "UPDATE howner set hostelReg = ? where id =?";
        db.query(query,[1,id],(err,result)=>{
            if(err){
                res.status(500).json({error:'An error occured'})
            }else{
                res.json("User Registered a Hostel");
            }
        })
      }
    });
});


//updating hostel details 
//hostel seats_details is not updating [problem to be solved]
app.post('/howner/updateHostel',upload.single('image'),(req,res)=>{
    const image = req.file.filename;
    const {facilities,seats,id} = req.body;
    const parsedFacilities = JSON.parse(facilities);
    const parsedSeats = JSON.parse(seats);
    // console.log(parsedSeats) 
    
    const query=`Update hostels set image=?, facilities = ?, seats_details =? where id = ?`
    const values = [image,JSON.stringify(parsedFacilities), JSON.stringify(parsedSeats),id]
    console.log(values)

    // problem is value of parsedSeats is empty 
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            console.log('Data updated..');
            console.log(values);
            res.json('Hostel Updated successfully');
        }
    });
})

//fetch hostel detail using id
app.get('/search/:id',(req,res)=>{
    const id = req.params.id;

    const sql = "SELECT * FROM hostels where id = ?"
    db.query(sql,[id],(err,data)=>{
        if(err){
            return res.json(err);
        }else{
            if(data.length > 0 ){
                return res.json(data);
            }else{
                return res.json("Hostel Not Found!!");
            }
        }
    })
})


//booking for students
app.post('/api/bookHostel',(req,res)=>{
    const {hid,seat,std_id} = req.body;
    const sql = "Select * from bookings where std_id = ?"//user can book only one room (in same hostel also)
    
    db.query(sql,[std_id],(err,result,data)=>{
        if(err){
            return res.json(err)
        }else{
            if(result.length === 0){
                const sql = "INSERT INTO bookings(howner_id,seat,std_id) VALUES(?,?,?)";
    
                db.query(sql,[hid,seat,std_id],(err,result)=>{
                    if(err){
                        return res.json(err)
                    }else{
                        return res.json("Booked");
                    }
                })
            }else{
                return res.json('already booked');
            }
        }
    })
})

//checking hostel bookings availability
app.post('/api/getBookings',(req,res)=>{
    const {uid} = req.body;
    const sql = "SELECT * from bookings where howner_id = ?"

    db.query(sql,[uid],(err,result)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(result)

        }
    })
})

//to collect data of user who have booked the hostel
app.post('/api/getBookingDetails',(req,res)=>{
    const {std_id} = req.body;
    const sql = "SELECT * FROM student where id = ?"

    db.query(sql,[std_id],(err,result)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(result);
        }
    })
})

app.post('/api/updateAfterBook',(req,res)=>{
    const {totalSeat,hid} = req.body;
    const sql = "SELECT seats_details from hostels where id = ?"
    db.query(sql,[hid],(err,result)=>{
        if(err){
            return res.json(err);
        }else{
            const jsonData = JSON.parse(result[0].seats_details);
            const updatedSeat = parseInt(totalSeat)-1;
            jsonData[0].tseat = `${updatedSeat}`;
            const sql = "UPDATE hostels set seats_details = ? where id = ?";
            const values = [JSON.stringify(jsonData),hid]

            db.query(sql,values,(err,result)=>{
                if(err){
                    return res.json(err);
                }else{
                    console.log('Hostel Updated Successfully!!');
                }
            })
        }
    })
    
})

app.listen(port,()=>{
    console.log(`Server Running in port ${port}`);
})