(function (app) {
    "use strict";

    app.controller("HomeController", HomeController);

    HomeController.$inject = ["$location", "toaster", "RepositoryService"];

    function HomeController($location, toaster, repository) {
        var vm = this;

        vm.contacts = [];

        vm.search = {};

        toaster.pop("wait", "Loading contacts...");

        repository.getContacts(vm.search).then(function (result) {
            vm.contacts = result.data;
        });

        vm.add = function () {
            $location.path("/contact/add/");
        };

        vm.search = function () {
            repository.getContacts(vm.search).then(function (result) {
                vm.contacts = result.data;
            });
        };
        
        vm.details = function (id) {
            $location.path("/contact/details/" + id);
        };

        vm.remove = function (id) {
            $location.path("/contact/remove/" + id);
        };
    };
})(angular.module("contactManager"));
