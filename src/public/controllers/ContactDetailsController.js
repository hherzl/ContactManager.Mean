(function (app) {
    "use strict";

    app.controller("ContactDetailsController", ContactDetailsController);

    ContactDetailsController.$inject = ["$routeParams", "$location", "RepositoryService"];

    function ContactDetailsController($routeParams, $location, repository) {
        var vm = this;

        var id = $routeParams.id;

        vm.model = {};

        repository.getContact(id).then(function (result) {
            vm.model = result.data;
        });

        vm.edit = function () {
            $location.path("/contact/edit/" + id);
        };

        vm.cancel = function () {
            $location.path("/");
        };
    };
})(angular.module("contactManager"));
