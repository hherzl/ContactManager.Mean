(function (app) {
    "use strict";

    app.controller("ContactAddController", ContactAddController);

    ContactAddController.$inject = ["$location", "toaster", "RepositoryService"];

    function ContactAddController($location, toaster, repository) {
        var vm = this;

        vm.model = {};

        vm.save = function () {
            toaster.pop("wait", "Saving...");

            repository.createContact(vm.model).then(function (result) {
                toaster.pop("success", "The contact was saved successfully");

                $location.path("/");
            });
        };

        vm.cancel = function () {
            $location.path("/");
        };
    };
})(angular.module("contactManager"));
