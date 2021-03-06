var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
  console.log("search for: " + req.body); // for some reason this retunrs undefined. should return the inputted keyword from the search.


  /*** run web crawler (from bash) ***/


  /*** retrieve data from db ***/
  // for feasibility prototype just return one instance (document).


  res.send("keyword: " + req.body.keyword);// respond with data from db
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
