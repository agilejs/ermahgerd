function AppCtrl ($scope, $location) {
    'use strict';
    $scope.title = 'The Movie Database';

    $scope.$on('$locationChangeSuccess', function(event){
        $scope.homeMenuItem= '';
        $scope.moviesMenuItem = '';

        if($location.path() === '/') {
            $scope.homeMenuItem = 'active';
        }
        else if($location.path() === '/movies') {
            $scope.moviesMenuItem = 'active';
        }
    });
}

function WelcomeCtrl($scope, moviesResponse) {
    'use strict';
    $scope.movies = moviesResponse.data;
    $scope.currentPredicate = 'title';
}

function MoviesListCtrl ($scope, $location, moviesResponse) {
    'use strict';
    $scope.movies = moviesResponse.data;
    $scope.currentPredicate = 'title';
}

MoviesListCtrl.resolve = {
    moviesResponse: function ($http) {
        'use strict';
        return $http.get('/movies');
    }
};

function MoviesAddCtrl ($scope, $http, $location) {
    'use strict';
    $scope.movie = {};
    $scope.save = function (movie) {
        $http.post('/movies', movie)
        .success(function(res) {
            $location.path('/movies/' + res.id);
        });
    };
}

function MovieDetailCtrl ($scope, $http, $location, moviesResponse) {
    'use strict';
    $scope.movie = moviesResponse.data;

    $scope['delete'] = function () {
        $http['delete']('/movies/' + $scope.movie.id).success(function (res) {
            $location.path('/movies');
        });
    };
}

function movieDetailResolver ($http, $route) {
    'use strict';
    var id = $route.current.params.id;
    return $http.get('/movies/' + id);
}

MovieDetailCtrl.resolve = {
    moviesResponse: movieDetailResolver
};

function MovieEditCtrl ($scope, $http, $location, moviesResponse) {
    'use strict';
    $scope.movie = moviesResponse.data;

    $scope.save = function () {
        $http.put('/movies/' + $scope.movie.id, $scope.movie)
        .success(function (res) {
            $location.path('/movies/' + $scope.movie.id);
        });
    };
}

MovieEditCtrl.resolve = {
    moviesResponse: movieDetailResolver
};

function NotFoundCtrl ($scope, $location) {
    'use strict';
    $scope.culprit = $location.search().culprit || 'unknown beast';
}

var ErrorCtrl = NotFoundCtrl;
