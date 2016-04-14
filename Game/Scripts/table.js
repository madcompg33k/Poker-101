(function () {
    var app = angular.module('table', [])

    /* Controller for all players */
    .controller('TableController', ['$scope', function ($scope) {
        /* Declare/Initialize table */
        $scope.table = {
            shuffledDeck: [],
            cards: [], /* The board (e.g. the flop, turn, and river */
            potSize: 0,
            dealer: {
                seat: 0
            },
            smallBlind: {
                amt: 10,
                seat: 0
            },
            bigBlind: {
                amt: 20,
                seat: 0
            },
            handHistory: [],
            winner: {
                seat: -1,
                handRank: 0
            }
        }

        table = $scope.table;

        /* Deal the cards to the players */
        this.dealCards = function () { newHand(); }
        this.dealFlop = function () { dealBoard(3) }
        this.dealTurn = function () { dealBoard(1) }
        this.dealRiver = function () { dealBoard(1) }
        this.playerChecks = function (player) { }
        this.playerBets = function (player) { }
        this.playerFolds = function (player) { }

        /* Find the winner! */
        this.getWinner = function () { calculateWinner(); }

    } ]);


    /* Start Directives */
    app.directive('gameOptions', function () {
        return {
            restrict: 'E',
            templateUrl: './Directives/game-options.html',
            controller: function () {

            },
            controllerAs: 'options'
        }
    });
})();