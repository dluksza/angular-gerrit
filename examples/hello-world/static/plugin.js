AngularGerrit.install([/* additional modules goes here */],
                       function(app) {
  app.config(function(GerritRouteProvider) {
    GerritRouteProvider
        .when('/', {controller: 'HelloCtrl',
                    templateUrl: 'templates/hello.html'});
  });
  app.controller('HelloCtrl', function($scope) {
    $scope.greeting = 'Hello Diffy!';
  });
});
