var expect = chai.expect;

describe('controller', function () {
    'use strict';

    describe('AppCtrl', function () {

        it('should set a title', function () {
            var scope = {};
            scope.$on = function() {};

            AppCtrl(scope);

            expect(scope.title).to.equal('The Movie Database');
        });
    });

    describe('MoviesListCtrl', function () {
        it('should set list of movies on scope', function () {
            var scope = {};
            var $location = {};
            var moviesResponse = {
                data: 42
            };

            MoviesListCtrl(scope, $location, moviesResponse);

            expect(scope.movies).to.deep.equal(moviesResponse.data);
        });
    });

});