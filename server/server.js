
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Issue = require('./issue.js');
const path = require('path');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json()); //parser req body and saves in req.body
//use is used to insert middleware, static() is used to specify the directory path for static content.

let db;

//express will start up only if mongo connection was successsful.
MongoClient.connect("mongodb://localhost:27017/issuetracker").then(connection => {
  db = connection;
  app.listen(3000, () => {
    console.log("app started at port 3000");
  });
}).catch(error => {
  console.log('ERROR: ', error);
});

app.get('/api/issues/:id',(req,res) => {
  let issueID;
  try{
    issueID = new ObjectID(req.params.id);
  }catch(e){
    res.status(422).json({message: `Invalid issue ID format: ${issueID}`});
    return;
  }

  db.collection('issues').find({_id: issueID}).limit(1).next().then((issue)=>{
    if(!issue){
      res.status(404).json({message:`${issueID} not found`});
    }else{
      res.json(issue);
    }
  }).catch(err=>{
    res.status(500).json({message:`Internal server error: ${err}`})
  });
});

app.put('/api/issues/:id',(req,res)=>{
  let issueID;
  try{
    issueID = new ObjectID(req.params.id);
  }catch(err){
    res.status(422).json({message: `Invalid issue ID: ${err}`});
    return;
  }
  let issue = req.body;
  delete issue._id;

  const err = Issue.validateIssue(issue);
  if(err){
    res.status(422).json({message: `Invalid request: ${err}`});
    return;
  }
  db.collection('issues').update({_id:issueID},Issue.convertIssue(issue)).then(()=>{
    return db.collection('issues').find({_id:issueID}).limit(1).next();
  }).then(savedItem=>{
    res.json(savedItem);
  }).catch((err)=>{
    res.status(500).json({message: `Internal server error: ${err}`});
  });

});
app.delete('/api/issues/:id',(req,res)=>{
  let issueID;
  try{
    issueID = new ObjectID(req.params.id);
  }catch(err){
    res.status(422).json({message: `Invalid issue ID: ${err}`});
  }

  db.collection('issues').deleteOne({_id:issueID}).then((deleteResult)=>{
    if(deleteResult.result.n == 1)
      res.json({status : 'ok'});
    else {
      res.json({status : 'Warning: object not found'});
    }
  }).catch(err => {
    res.status(500).json({message: `Internal server error: ${err}`});
  });

});
app.get('/api/issues',(req,res)=>{
  const filter={};
  if(req.query.status)
    filter.status = req.query.status;
  if(req.query.effort_gte || req.query.effort_lte){
    filter.effort = {};
    if(req.query.effort_gte)
      filter.effort.$gte = parseInt(req.query.effort_gte,10);
    if(req.query.effort_lte)
      filter.effort.$lte = parseInt(req.query.effort_lte,10);
  }

  db.collection('issues').find(filter).toArray().then(issues => {
    const metadata = {total_count : issues.length};
    res.json({_metadata : metadata, records : issues});
  }).catch(err=>{
    console.log("ERROR: ",err);
    res.status(500).json({ message : `Internal server error: ${err}`})
  });

});

app.post('/api/issues',(req,res)=>{
  const newIssue = req.body;
  newIssue.created = new Date();
  if(!newIssue.status){
    newIssue.status = "New";
  }
  let err = Issue.validateIssue(newIssue);
  if(err){
    res.status(422).json({message : `Invaid request : ${err}`});
  }
  db.collection('issues').insertOne(newIssue).then(result=>{
    return db.collection('issues').find({_id: result.insertedId}).limit(1).next(); //instead or toarray, next goves the result here
  }).then(newIssue=>{
    res.json(newIssue);
  }).catch(err=>{
    console.log("ERROR: ",err);
    res.status(500).json({message: `Internal server error: ${err}`});
  });
});




app.get('*',(req,res)=>{
  res.sendFile(path.resolve('static/index.html'));
});
