(function (app) {
    "use strict";

    app.controller("HomeController", HomeController);

    HomeController.$inject = ["$location", "RepositoryService"];

    function HomeController($location, repository) {
        var vm = this;

        vm.contacts = [];

        repository.getContacts().then(function (result) {
            vm.contacts = result.data;
        });

        vm.add = function () {
            $location.path("/contact/add/");
        };
        
        vm.details = function (id) {
            $location.path("/contact/details/" + id);
        };

        vm.remove = function (id) {
            $location.path("/contact/remove/" + id);
        };
    };
})(angular.module("contactManager"));
