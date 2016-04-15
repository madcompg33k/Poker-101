(function () {
    var app = angular.module('table', [])

    /* Controller for all players */
    .controller('TableController', ['$scope', function ($scope) {
        /* Declare/Initialize table */
        $scope.table = {
            shuffledDeck: [],
            cards: [], /* The board (e.g. the flop, turn, and river */
            dealer: { seat: 0 },
            handHistory: [],
            winner: { seat: -1, handRank: 0 },
            potSize: 0,
            smallBlind: { amt: 10, seat: 0 },
            bigBlind: { amt: 20, seat: 0 },
            currentBet: 0,
            better: {},
            turn: -1
        }

        table = $scope.table;

        /* Deal the cards to the players */
        this.dealCards = function () { newHand(); }
        this.dealFlop = function () { dealBoard(3) }
        this.dealTurn = function () { dealBoard(1) }
        this.dealRiver = function () { dealBoard(1) }

        /* Player checks, no bet was made, so move to the next player */
        this.playerChecks = function (player) {
            table.turn = getNextSeat(table.turn);
            while (!game.players[table.turn].cards.length) { table.turn = getNextSeat(table.turn); }

            if (game.players[table.turn] == table.better) {
                if (!table.cards.length) { this.dealFlop(); }
                else if (table.cards.length == 3) { this.dealTurn(); }
                else if (table.cards.length == 4) { this.dealRiver(); }
                else { calculateWinner(); table.turn = -1; }
            }
        }

        /* There is a bet and player calls */
        this.playerCalls = function (player) {
            //player.money = parseInt(player.money, 10) - (parseInt(table.currentBet, 10) - parseInt(player.bet.amt, 10));
            //table.potSize = parseInt(table.potSize, 10) + (parseInt(table.currentBet, 10) - parseInt(player.bet.amt, 10));
            player.bet.amt = parseInt(table.currentBet, 10);

            if (!table.better.name) { table.better = player; }

            table.turn = getNextSeat(table.turn);
            while (!game.players[table.turn].cards.length) { table.turn = getNextSeat(table.turn); }
            if (game.players[table.turn] == table.better) {
                if (!table.cards.length) { this.dealFlop(); }
                else if (table.cards.length == 3) { this.dealTurn(); }
                else if (table.cards.length == 4) { this.dealRiver(); }
                else { calculateWinner(); table.turn = -1; }
            }
        }

        /* Player has made a bet or raised */
        this.playerBets = function (player, amount) {
            /* Find out what the new bet is */
            table.currentBet = amount;
            /* Set the "better" to the current player */
            table.better = player;

            /* Take money from the player and put it in the pot */
            //player.money = parseInt(player.money, 10) - (parseInt(amount, 10) - parseInt(player.bet.amt, 10));
            //table.potSize = parseInt(table.potSize, 10) + (parseInt(amount, 10) - parseInt(player.bet.amt, 10));

            /* Set the player's bet amount to the new accumulated total */
            player.bet.amt = parseInt(amount, 10);

            table.turn = getNextSeat(table.turn);
            while (!game.players[table.turn].cards.length) { table.turn = getNextSeat(table.turn); }
            if (game.players[table.turn] == table.better) {
                if (!table.cards.length) { this.dealFlop(); }
                else if (table.cards.length == 3) { this.dealTurn(); }
                else if (table.cards.length == 4) { this.dealRiver(); }
                else { calculateWinner(); table.turn = -1; }
            }
        }

        /* Player doesn't want to bet and gives up cards */
        this.playerFolds = function (player) {
            player.cards.splice(0, 2);

            table.turn = getNextSeat(table.turn);
            while (!game.players[table.turn].cards.length) { table.turn = getNextSeat(table.turn); }
            if (game.players[table.turn] == table.better) {
                if (!table.cards.length) { this.dealFlop(); }
                else if (table.cards.length == 3) { this.dealTurn(); }
                else if (table.cards.length == 4) { this.dealRiver(); }
                else { calculateWinner(); table.turn = -1; }
            }
        }

        /* Find the winner! */
        //this.getWinner = function () { calculateWinner(); }

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

    app.directive('betOptions', function () {
        return {
            restrict: 'E',
            templateUrl: './Directives/bet-options.html',
            controller: function () {

            },
            controllerAs: 'betOptions'
        }
    });
})();