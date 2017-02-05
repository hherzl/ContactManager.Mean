(function (app) {
    "use strict";

    app.controller("ContactEditController", ContactEditController);

    ContactEditController.$inject = ["$routeParams", "$location", "RepositoryService"];

    function ContactEditController($routeParams, $location, repository) {
        var vm = this;

        var id = $routeParams.id;

        vm.model = {};

        repository.getContact(id).then(function (result) {
            vm.model = result.data;
        });

        vm.save = function () {
            repository.updateContact(id, vm.model).then(function (result) {
                $location.path("/contact/details/" + id);
            });
        };

        vm.cancel = function () {
            $location.path("/contact/details/" + id);
        };
    };
})(angular.module("contactManager"));
