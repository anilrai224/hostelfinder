const express = require('express');
const mysqli = require('mysqli');
const app = express();
const port = 3001;

app.listen(port,()=>{
    console.log('Server Running on port '+port)
})