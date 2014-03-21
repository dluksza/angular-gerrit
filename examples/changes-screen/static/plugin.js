// Copyright (C) 2014 CollabNet
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

AngularGerrit.install([], function(app) {
app.config(['GerritRouteProvider', function(GerritRouteProvider) {
  GerritRouteProvider
    .when('q/:query?', {controller: 'QueryCtrl',
                        resolve: {
                          changes: function(GerritSrv, $route) {
                            var query = $route.current.params.query || 'status:open';
                            return GerritSrv.get('/changes/?q=' + query);
                          }
                        },
                        templateUrl: 'templates/query.html'})
    .when('q-b/:query?', {controller: 'QueryCtrl',
                          resolve: {
                            changes: function(GerritSrv, $route) {
                            var query = $route.current.params.query || 'status:open';
                              return GerritSrv.get('/changes/?q=status:open');
                            }
                          },
                          templateUrl: 'templates/query-b.html'})
  .otherwise({ redirectTo: 'q/' });
}]);

app.controller('QueryCtrl', function($scope, $routeParams, $filter, GerritSrv,
                                     GerritPluginSrv, GerritScreenSrv, changes) {
  var fromUrlParameter = function(input) {
    return input.replace(/\+/g, ' ');
  }

  var labels = [];
  for (var c in changes) {
    for (var label in changes[c].labels) {
      if (labels.indexOf(label) == -1) {
        labels.push(label);
      }
    }
  }

  $scope.toUrlParameter = function(input) {
    return input.replace(/ /g, '+');
  }

  $scope.highlightRow = function(change) {
    $scope.active = change;
  }
  $scope.flipStar = function(change) {
    var url = '/accounts/self/starred.changes/' + change._number;
    var callback = function() {$scope.$apply(function() {change.starred = !change.starred})};
    if (change.starred) {
      GerritSrv.delete(url).success(callback);
    } else {
      GerritSrv.put(url).success(callback);
    }
  }
  $scope.formatStatus = function(change) {
    if (change.status != 'NEW') {
      return change.status;
    } else if (!change.mergable) {
      return 'Merge Conflict';
    }
  }
  $scope.formatUpdatedDate = function(dateStr) {
    var now = new Date();
    var date = new Date(dateStr);
    var format= $filter('date');
    var ONE_YEAR = 182 * 24 * 60 * 60 * 1000;
    var dateMedium = format(date, 'yyyy.MM.dd');
    if (dateMedium == format(now, 'yyyy.MM.dd')) {
      return format(date, 'HH:mm');
    }
    if (now.getTime() - date.getTime() < ONE_YEAR) {
      return format(date, 'MMM d');
    }
    return dateMedium;
  };
  $scope.formatLabel = function(label) {
    var code = '';
    var parts = label.split('-');
    for (var i in parts) {
      code = code + parts[i].substring(0, 1).toUpperCase();
    }
    return code;
  }
  $scope.toLabelScore = function(score) {
    if (score > 0) {
      return '+' + score;
    }
    return score;
  }

  var query = fromUrlParameter($routeParams.query || 'status:open');
  GerritScreenSrv.setWindowTitle(query);

  labels.sort();
  $scope.labels = labels;
  $scope.query = query;
  $scope.active = changes[0] || {};
  $scope.changes = changes;
  $scope.pluginName = GerritPluginSrv.getPluginName();
})})
