var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("contacts", ["contacts"]);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/api/contact", function (request, response) {
    db.contacts.find({}, { firstName: 1, middleName: 1, lastName: 1 }, function (err, docs) {
        if (err)
            console.log("Error on get contacts: " + err);
        
        response.json(docs);
    });
});

app.get("/api/contact/:id", function (request, response) {
    var id = request.params.id;

    db.contacts.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        if (err)
            console.log("Error: " + err);

        response.json(doc);
    });
});

app.post("/api/contact", function (request, response) {
    db.contacts.insert(request.body, function (err, doc) {
        if (err)
            console.log("Error: " + err);

        response.json(doc);
    });
});

app.put("/api/contact/:id", function (request, response) {
    var id = request.params.id;

    db.contacts.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        },
        update: {
            $set: {
                firstName: request.body.firstName,
                middleName: request.body.middleName,
                lastName: request.body.lastName,
                phone: request.body.phone,
                email: request.body.email
            }
        },
        new: true
    }, function (err, doc) {
        response.json(doc);
    });
});

app.delete("/api/contact/:id", function (request, response) {
    var id = request.params.id;

    console.log(id);

    db.contacts.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        if (err)
            console.log("Error: " + err);

        response.json(doc);
    });
});

app.listen(3000);

console.log("Server running on port 3000");
