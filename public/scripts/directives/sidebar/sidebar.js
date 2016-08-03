'use strict';

/**
 * @ngdoc overview
 * @name mstApp
 * @description
 * # mstApp
 */

 var myApp = angular.module('myApp');

 myApp.directive('sidebar',function(){
 	return {
 		templateUrl:'scripts/directives/sidebar/sidebar.html',
 		restrict: 'E',
 		replace: true,
 	}
 });

 //requestform validataion
 myApp.controller('requestformController', function($scope) {
 	$scope.submitForm = function(isValid) {
 		if (isValid) {
 			alert('Thanks for submission!');
 		}
 	};
 });