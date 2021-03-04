const express = require("express");
const path = require('path');
const app = express();
// const bodyParser = require("body-parser");
const port = 3080;
const ffi = require('ffi');
const ref = require('ref'); // specify types for call to rust program
const str = ref.types.CString;
const u32 = ref.types.uint32
const rust = ffi.Library(path.join(__dirname, '../target/release/libembed'), {
  crawl: [[str, u32]],
});


// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.get("/SearchPage/:id", (req, res) => {
  res.render('SearchPage', {body: "Search Results for " + req.params.id, output: req.params.id});
});

app.post('/SearchPage/submit', (req, res) => {
  let searchId = req.body.id;
  rust.crawl(searchId, 2); // search 2 pages on crawl
  res.render('/SearchPage/' + searchId);
});


app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});