const { assert } = require('console');
var express = require('express');
var router = express.Router();
// const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next) {
  var keyword = JSON.stringify(req.params);
  console.log("search for: " + keyword); 
 // run the rust web crawler executable
 

  /*** run web crawler (from bash) ***/
  const spawn = require('child_process').spawn;
  spawn(`cd ./../ecomm_crawler && cargo run ${keyword} 2`, {  // spawn to run two cmds: cd to ecomm_crawler to then execute crawler
    shell: true
  });

  // exec(`cd ../ecomm_crawler; cargo run ${keyword} 2`,
  // exec(('cd', {cwd: '../ecomm_crawler'} `cargo run ${keyword} 2)`), 
  // // // exec(`cargo run ${keyword} 2`,
  //     function (error, stdout, stderr) {
  //         console.log('stdout: ' + stdout);
  //         console.log('stderr: ' + stderr);
  //         if (error !== null) {
  //             console.log('exec error: ' + error);
  //         }
  //     });
  

  /*** retrieve data from db ***/
  // for feasibility prototype just return one instance (document).
  // const ItemSchema = new mongoose.Schema({
  //   name: { type: String, index: true, required: true},
  //   price: { type: String, required: true},
  //   buy_link: { type: String, required: true},
  //   img_link: {type: String, required: true},
  // });
  const url = "mongodb+srv://jalend:Jdindin98!@vega.gbbi0.mongodb.net/vega?";
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
    if (err) {
      console.error(err);
      return;
    }
    const database = db.db('items');
    const collection = database.collection('ebay-items'); 
    collection.findOne()   // return first occurence
    .then(function(item) {
      console.log(item);
      res.send(item);
    });
  });
  
     
  
    // res.send("keyword: " + keyword);// respond with data from db
    // res.render()
});


module.exports = router;
