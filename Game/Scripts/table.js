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
            winner: {},
            potSize: 0,
            smallBlind: { amt: 2, seat: 0 },
            bigBlind: { amt: 4, seat: 0 },
            currentBet: 0,
            better: {},
            turn: -1
        }

        table = $scope.table;

        /* Deal the cards to the players */
        this.dealCards = function () { newHand(); }
        this.dealCardsToTable = function () {
            switch (table.cards.length) {
                case 0: dealBoard(3);
                        break;
                case 3: dealBoard(1);
                        break;
                case 4: dealBoard(1);
                        break;
                default: this.calculateWinner(game.players);
                        table.turn = -1;
                        console.log(table.turn);
                        break;
            }

        }

        this.playerBetAction = function (action, player, amount) {
            switch (action) {
                case 'Call':
                    if (!table.better.name) { table.better = player; }
                    break;
                case 'Raise':
                    table.currentBet = amount;
                    table.better = player;
                    break;
                case 'Fold':
                    player.cards.length = 0;
                    break;
            }
            /* Set bet.amt to amount player bet */
            player.bet.amt = parseInt(amount, 10);

            /* Move to the next active player */
            this.moveSeat(player);

        }

        this.moveSeat = function (player) {
            /* Move to the next seat */
            table.turn = getNextSeat(table.turn);
            /* Continue moving if the current player has no more money to bet, or has folded, and stop on the original better/player */
            while (!game.players[table.turn].cards.length ||
                    (parseInt(game.players[table.turn].money, 10) <= 0
                    && !game.players[table.turn] == table.better))
            { table.turn = getNextSeat(table.turn); }
            /* Check to see if we've reached the original better/checker */
            if (game.players[table.turn] == table.better) {
                this.dealCardsToTable();
            }
        };

        /* Find the winner! */
        this.calculateWinner = function (players) {
            var winner = {};

            for (var seat = 0; seat < game.players.length; seat++) {
                var hand = [];

                /* Add the player's hole cards and cards from the board to the hand object */
                if (game.players[seat].cards.length) {
                    hand.push(game.players[seat].cards[0]);
                    hand.push(game.players[seat].cards[1]);
                    for (var i = 0; i < table.cards.length; i++) { hand.push(table.cards[i]); }
                }

                /* Sort hand in order of value, lowest to highest */
                hand.sort(sort_by('value', false, parseInt));

                this.evalCurrentHand(hand);
            }

            return winner;
        };

        this.calculateCardsEstimatePercentage = function (outs, cardsToCome) {
            return (outs.length * 2) * cardsToCome;
        };

        this.calculateCardsActualPercentage = function (outs, cardsToCome) {
            return (outs.length * (100 / 52)) * cardsToCome;
        };

        this.calculateCardsToCome = function () {
            return 5 - table.cards.length;
        };

        this.evalCurrentHand = function (cards) {
            console.log("Test");
        };

        /* (Function) checkHighestCards(Array) */
        /* Send a hand to this function to determine the highest card in the hand */
        /* (Useful for "card" high, straights, flushes, and straight flushes) */
        this.checkHighestCard = function (hand) {
            var cardValue = 0;
            /* Find highest card in hand */
            for (var card = 0; card < hand.length; card++) {
                cardValue = cardValue < hand[card].value ? hand[card].value : cardValue;
            }
        };

        /* (Function) checkHighestPair(Array) */
        /* Return the card value of the hand's highest pair */
        this.checkHighestPair = function (hand) {
            var pairedCards = [];

            for (var card = 0; card < hand.length - 1; card++) {
                var i = 0;

                while (i++ < hand.length - 1) {
                    /* Check if we've already found it before first */
                    if (pairedCards.length) {
                        /* Iterate through previously found pairs and add if match is found */
                        angular.forEach(pairedCards, function (value, key) {
                            pairedCards[key].count = hand[i].value == pairedCards[key].cardValue ? pairedCards[key].count + 1 : pairedCards[key].count;
                        });
                    }

                    /* We haven't seen this card before, see if it's in the deck */
                    else {
                        /* Check for a match */
                        if (hand[card].value == hand[i].value) {
                            pairedCards.push({ cardValue: hand[card].value, count: 2 });
                        }

                    }
                } /* End while loop */

            } /* End for loop */

            if (pairedCards.length) {
                for (var i = 0; i < pairedCards.length; i++)
                    console.write("Paired Card Value: " + pairedCards[i].cardValue + ". Paired Cards Count: " + pairedCards[i].count)
            }

            return pairedCards;
        };

        /* Return the percentage the player currently has to getting a flush */
        this.getPercentageToFlush = function (hand) {
            var worthChecking = {};
            var suits = [
                {
                    suit: 'hearts',
                    count: 0,
                    percentToFlush: 0
                },
                {
                    suit: 'diamonds',
                    count: 0,
                    percentToFlush: 0
                },
                {
                    suit: 'spades',
                    count: 0,
                    percentToFlush: 0
                },
                {
                    suit: 'clubs',
                    count: 0,
                    percentToFlush: 0
                }
            ];

            for (var card = 0; card < hand.length; card++) {
                suits[hand[card].suitVal - 1].count++;
                if (suits[hand[card].suitVal - 1].count >= 3) {
                    worthChecking.threeToFlush = true;
                    worthChecking.suit = hand[card].suitVal - 1;
                }
            }

            if (worthChecking.length) {
                return hand.calculateCardsEstimatePercentage((13 - suits[worthChecking.suit].length), calculateCardsToCome());
            }
            else { return 0; }
        };

    } ])
    /* Start Directives */
    .directive('gameOptions', function () {
        return {
            restrict: 'E',
            templateUrl: './Directives/game-options.html',
            controller: function () {

            },
            controllerAs: 'options'
        }
    })
    .directive('betOptions', function () {
        return {
            restrict: 'E',
            templateUrl: './Directives/bet-options.html',
            controller: function () {

            },
            controllerAs: 'betOptions'
        }
    })
})();