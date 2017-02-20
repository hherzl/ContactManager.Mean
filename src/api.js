function api (app) {
    var mongojs = require("mongojs");
    
    var db = mongojs("contactManager", ["contacts"]);

    app.get("/api/contact", function (request, response) {
        var pageSize = request.query.pageSize ? parseInt(request.query.pageSize) : 10;
        var firstName = request.query.firstName;
        var middleName = request.query.middleName;
        var lastName = request.query.lastName;

        var find = {};

        if (firstName) {
            find.firstName = new RegExp(firstName, "i");
        }

        if (middleName) {
            find.middleName = new RegExp(middleName, "i");
        }

        if (lastName) {
            find.lastName = new RegExp(lastName, "i");
        }

        var fields = {
            firstName: 1,
            middleName: 1,
            lastName: 1,
            phone: 1,
            email: 1
        };

        var result = db.contacts.find(find, fields).limit(pageSize, function (err, docs) {
            response.json(docs);
        });
    });

    app.get("/api/contact/:id", function (request, response) {
        var id = request.params.id;

        db.contacts.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });

    app.post("/api/contact", function (request, response) {
        db.contacts.insert(request.body, function (err, doc) {
            if (err) console.log("Error: " + err);

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
            if (err) console.log("Error: " + err);

            response.json(doc);
        });
    });
};

module.exports = api;
