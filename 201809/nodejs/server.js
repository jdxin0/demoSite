var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/", function(req, res) {
    console.log(bodyParser.body);
    res.end();
});
app.listen(8080);
