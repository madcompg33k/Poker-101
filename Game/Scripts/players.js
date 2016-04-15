(function () {
    var app = angular.module('players', []);

    /* Controller for all players */
    app.controller('PlayersController', function () {
        /* Initialize Players and assign data to it */
        this.players = [];
    });
    /* Controller for add/modifying an individual player */
    app.controller('PlayerController', function () {
        this.player = {
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            betAmount: 0,
            cards: [],
            hand: [],
            handRank: 0
        };

        this.addPlayer = function (game) {
            /* Add this player to players */
            game.players.push(this.player);

            /* Clear the new player object, since the player is now added to the table */
            this.player = {};
        }
    });


    /* Start Directives */
    app.directive('addPlayer', function () {
        return {
            restrict: 'E',
            templateUrl: './Directives/add-player.html',
            controller: function () {

            },
            controllerAs: 'addPlayer'
        }
    })

    app.directive('playerHand', function () {
        return {
            restrict: 'E',
            templateUrl: './Directives/player-hand.html',
            controller: function () {

            },
            controllerAs: 'players'
        }
    });

})();