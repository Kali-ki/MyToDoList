var app = angular.module('app', ['ngRoute', 'routeAppController', 'ngSanitize']);

app.config(['$routeProvider',
  function($routeProvider){
    $routeProvider

    .when('/home', {
      templateUrl : '/html/home.html',
      controller : 'taskListController'
    })

    .when('/newTask', {
      templateUrl : '/html/newTask.html',
      controller : 'addTaskController'
    })

    .when('/showTask',{
      templateUrl : '/html/displayActivity.html',
      controller: 'seeTaskController'
    })

    .when('/editTask',{
      templateUrl : '/html/editTask.html',
      controller: 'editTaskController'
    })

    .otherwise({
      redirectTo: '/home'
    });

  }
]);
