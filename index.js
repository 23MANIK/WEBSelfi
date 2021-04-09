//const { response } = require('express');
const express = require('express');
const datastore=require('nedb');
const app = express();//getting express libraty

app.listen(3000, () => { console.log('listening at 3000') });//starting the server at port 3000
app.use(express.static('public'))//it access files like index.html 
app.use(express.json({ limit: '1mb' }));//limiting amount of data in json 

const database=new datastore('database.db');
database.loadDatabase();
//database.insert({name:'nikhil rajpoot',status:'high'});
//now we will post a request with gettin some response
app.get('/api',(request,response)=>{
   
    database.find({},(err,data)=>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', (request, response) => {
    //console.log('i got a request');//getting a request from browser
    //console.log(request.body);// console loging the request sent by browser request of body means only body part
    const timespan=Date.now();
    const data=request.body;// saving data request.body to data
    data.timespan=timespan;
    database.insert(data);
    response.json(data);
});