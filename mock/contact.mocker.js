var mongojs = require("mongojs");
var db = mongojs("contactManager", ["contacts"]);

var limit = 1000;

var firstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas"];

var middleNames = ["Peter", "Lee", "Alexander", "Daniel", "Edward"];

var lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore"];

var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
};

var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};

var phoneMocker = function () {
    var areaCode = getRandomValue(250, 500);
    var phoneNumber = getRandomValue(2000000, 5000000);

    return [areaCode, " ", phoneNumber].join("");
};

var emailMocker = function (contact) {
    var separators = ["", ".", "_", "", ".", "_"];
    var separator = getRandomItem(separators);

    var contactInfo = [contact.firstName, separator, contact.middleName, separator, contact.lastName].join("");

    var domains = ["outlook.com", "gmail.com", "yahoo.com"];

    return contactInfo.toLowerCase() + "@" + getRandomItem(domains);
};

for (var i = 0; i < limit; i++) {
    var firstName = getRandomItem(firstNames);
    var middleName = getRandomItem(middleNames);
    var lastName = getRandomItem(lastNames);

    var item = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        phone: phoneMocker()
    };

    item.email = emailMocker(item);

    console.log("Inserting new row...");

    db.contacts.insert(item, function (err, doc) {
        if (err) {
            console.log(err);
        }
    });
}
