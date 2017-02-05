(function (app) {
    "use strict";

    app.controller("ContactAddController", ContactAddController);

    ContactAddController.$inject = ["$location", "RepositoryService"];

    function ContactAddController($location, repository) {
        var vm = this;

        vm.model = {};

        vm.save = function () {
            repository.createContact(vm.model).then(function (result) {
                $location.path("/");
            });
        };

        vm.cancel = function () {
            $location.path("/");
        };
    };
})(angular.module("contactManager"));
