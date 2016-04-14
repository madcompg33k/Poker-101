(function () {
    var app = angular.module('table', [])

    /* Controller for all players */
    .controller('TableController',['$scope', function ($scope) {
        /* Declare/Initialize table */
        $scope.table = {
            dealerSeat: 0,
            shuffledDeck: [],
            cards: [], /* The board (e.g. the flop, turn, and river */
            money: 0,
            smallBlind: { amt: 10 },
            bigBlind: { amt: 20 },
            chips: [],
            handHistory: [],
            winner: {}
        }

        table = $scope.table;

        /* Deal the cards to the players */
        this.dealCards = function () { table = newHand(table); }
        this.dealFlop = function () { /* table.cards = */ dealBoard(3) }
        this.dealTurn = function () { /* table.cards = */ dealBoard(1) }
        this.dealRiver = function () { /* table.cards = */ dealBoard(1) }
        this.playerChecks = function (player) { }
        this.playerBets = function (player) { }
        this.playerFolds = function (player) { }

        /* Find the winner! */
        this.getWinner = function () {
            for (var p = 0; p < game.players.length; p++) {
                game.players[p].handRank = evaluateHand(game.players[p], table.cards);
            }

            table.winner = {
                seat: -1,
                handRank: 0
            };
            var tiedRanks = [];
            for (var p = 0; p < game.players.length; p++) {
                if (game.players[p].handRank > table.winner.handRank) {
                    //game.winner.seat = p;
                    //game.winner.handRank = table.players[p].handRank;
                } else if (game.players[p].handRank == table.winner.handrank) {
                    //table.winner.seat = game.players[p].hand[players[p].hand.length - 1].value > game.players[table.winner.seat].hand[game.players[table.winner.seat].hand.length - 1].value
                        //? p : table.winner.seat;
                }
            }

            //game.players[table.winner.seat].money = parseInt(game.players[table.winner.seat].money, 10) + parseInt(table.money, 10);
            //table.money = parseInt(0, 10);

        }

    }]);


    /* Start Directives */
    app.directive('gameOptions', function () {
        return {
            restrict: 'E',
            templateUrl: '/Game/game-options.html',
            controller: function () {

            },
            controllerAs: 'options'
        }
    });
})();