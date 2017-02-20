(function (app) {
    "use strict";

    app.service("RepositoryService", RepositoryService);

    RepositoryService.$inject = ["$log", "$http"];

    function RepositoryService($log, $http) {
        var svc = this;

        var apiUrl = "/api/";

        svc.getContacts = function (fields) {
            var queryString = [];

            if (fields.pageSize) {
                queryString.push("pageSize=" + fields.pageSize);
            }

            if (fields.firstName) {
                queryString.push("firstName=" + fields.firstName);
            }

            if (fields.middleName) {
                queryString.push("middleName=" + fields.middleName);
            }

            if (fields.lastName) {
                queryString.push("lastName=" + fields.lastName);
            }

            var url = apiUrl + "contact";

            var fullUrl = queryString.length == 0 ? url : [url, "?", queryString.join("&")].join("");

            return $http.get(fullUrl);
        };

        svc.getContact = function (id) {
            return $http.get(apiUrl + "contact/" + id);
        };

        svc.createContact = function (model) {
            return $http.post(apiUrl + "contact", model);
        };

        svc.updateContact = function (id, model) {
            return $http.put(apiUrl + "contact/" + id, model);
        };

        svc.deleteContact = function (id) {
            console.log(apiUrl + "contact/" + id);
            
            return $http.delete(apiUrl + "contact/" + id);
        };
    };
})(angular.module("contactManager"));
