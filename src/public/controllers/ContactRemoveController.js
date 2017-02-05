(function (app) {
    "use strict";

    app.controller("ContactRemoveController", ContactRemoveController);

    ContactRemoveController.$inject = ["$location", "$routeParams", "RepositoryService"];

    function ContactRemoveController($location, $routeParams, repository) {
        var vm = this;

        var id = $routeParams.id;

        vm.model = {};

        repository.getContact(id).then(function (result) {
            vm.model = result.data;
        });

        vm.remove = function () {
            repository.deleteContact(id).then(function (result) {
                $location.path("/");
            });
        };

        vm.cancel = function () {
            $location.path("/");
        };
    };
})(angular.module("contactManager"));
