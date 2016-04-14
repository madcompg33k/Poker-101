(function () {
    var app = angular.module('players', []);

    /* Controller for all players */
    app.controller('PlayersController', function () {
        /* Initialize Players and assign data to it */
        this.players = [ ];
    });
    /* Controller for add/modifying an individual player */
    app.controller('PlayerController', function () {
        this.player = {
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: true,
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

            /* Since we're adding a new player, clear all previous card data */
            /* ---> Move OUT of players.js
            for (p = 0; p < table.players.length; p++) {
            table.players[p].cards.length = 0;
            }
            */
            /* Re-shuffle the deck since we're adding a new player */
            /*  ---> Move OUT of players.js
            shuffledDeck = shuffle(cards);
            */
        }
    });

    /* Start Directives */
    app.directive('playerHand', function () {
        return {
            restrict: 'E',
            templateUrl: '/Game/player-hand.html',
            controller: function () {

            },
            controllerAs: 'players'
        }
    });
})();