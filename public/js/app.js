var app= angular.module('shortUrlapp', []);

app.controller('shortAppCtrl', function($scope) {
    $scope.urlToShorten = 'Hello World';
})