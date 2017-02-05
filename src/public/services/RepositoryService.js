(function (app) {
    "use strict";

    app.service("RepositoryService", RepositoryService);

    RepositoryService.$inject = ["$log", "$http"];

    function RepositoryService($log, $http) {
        var svc = this;

        var apiUrl = "/api/";

        svc.getContacts = function () {
            return $http.get(apiUrl + "contact");
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
