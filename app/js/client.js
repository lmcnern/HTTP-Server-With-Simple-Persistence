'use strict';

require('angular/angular');

var myApp = angular.module('myApp', []);
var notesController = myApp.controller('notesController', ['$scope', function($scope) {
  $scope.greeting = 'Hi, cool and great person!';
  $scope.description = 'This is a very nice and friendly app that compliments you '+
  'when you tell it a compliment you would like to hear.';
  $scope.compliment = 'You are cool, and important.';
  }]);
