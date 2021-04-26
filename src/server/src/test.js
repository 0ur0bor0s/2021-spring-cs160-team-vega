import * as child from "child_process";

console.log("working");

const searchStr = "plant";

var init_cmd = new String('cd ../ecomm_crawler && cargo run --release ');
var number = new String(' 1');
var command = init_cmd.concat(searchStr).concat(number.toString());
child.exec(command);

console.log("done");