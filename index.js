var Express=require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");
const env=require("dotenv");
env.config();
var app=Express();
app.use(cors());



var DATABASENAME="todoappdb";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(process.env.CONNECTION_STRING,(error ,client)=>{

        database=client.db(DATABASENAME);
        console.log("Mongo DB connection successful");
    });
})

app.get('/api/todoapp/GetNotes',(request,response)=>{
    database.collection("todoappdb").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/api/todoapp/AddNotes',multer().none(),(request,response)=>{
    database.collection("todoappdb").count({},function(error,numOfDocs){
        database.collection("todoappdb").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes 
    });
    
response.json("Added Succesfully");
});
})

app.delete('/api/todoapp/DeleteNotes',(request,response)=>{
    database.collection("todoappdb").deleteOne({
        id:request.query.id
    });
    response.json("Delete successfully");
})

