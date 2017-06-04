(function (app) {
    "use strict";

    app.controller("ContactRemoveController", ContactRemoveController);

    ContactRemoveController.$inject = ["$location", "$routeParams", "toaster", "RepositoryService"];

    function ContactRemoveController($location, $routeParams, toaster, repository) {
        var vm = this;

        var id = $routeParams.id;

        vm.model = {};

        repository.getContact(id).then(function (result) {
            vm.model = result.data;
        });

        vm.remove = function () {
            toaster.pop("wait", "Removing...");

            repository.deleteContact(id).then(function (result) {
                toaster.pop("success", "The contact was removed successfully");

                $location.path("/");
            });
        };

        vm.cancel = function () {
            $location.path("/");
        };
    };
})(angular.module("contactManager"));
