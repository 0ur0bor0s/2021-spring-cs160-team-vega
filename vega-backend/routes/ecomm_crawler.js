var express = require('express');
var router = express.Router();

// router.post("/", (req, res) => {
//   // console.log("get req - searching for:");
//   console.log(req.body.name);

//   // // run the rust web crawler executable
//   // const exec = require('child_process').exec, child;
//   // child = exec(`cargo run ${searchId} 2`,
//   //     function (error, stdout, stderr) {
//   //         console.log('stdout: ' + stdout);
//   //         console.log('stderr: ' + stderr);
//   //         if (error !== null) {
//   //             console.log('exec error: ' + error);
//   //         }
//   //     });
//   // child();

//   // res.send("product name: ", req.body.name);
//   // res.render('/', {data: req.body}); // or send to a new page e.g. searchresults
// });


router.post('/', function(req, res, next) {
  const keyword = req.body.keyword;
  console.log("search for: " + keyword); // for some reason this retunrs undefined. should return the inputted keyword from the search.
 // run the rust web crawler executable
 

  /*** run web crawler (from bash) ***/
  const exec = require('child_process').exec;
  exec(`cargo run ${keyword} 2`,
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
              console.log('exec error: ' + error);
          }
      });
  // child();

  /*** retrieve data from db ***/
  // for feasibility prototype just return one instance (document).



  res.send("keyword: " + keyword);// respond with data from db
  // res.render()
});


/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log("search for: " + req.params);
//   // alert(req.params);

//   /*** run web crawler (from bash) ***/


//   /*** retrieve data from db ***/
//   // for feasibility prototype just return one instance (document).


//   res.send();// respond with data from db
// });


module.exports = router;
