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
        this.dealCards = function () { newHand(); dealBoard(5); }
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
                    player.hand.cards.length = 0;
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
            while (!game.players[table.turn].hand.cards.length ||
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

            for (var seat = 0; seat < players.length; seat++) {
                /* Don't bother evaluating players with no cards */
                if (players[seat].hand.cards.length) {
                    var hand = {};
                    hand.cards = [];
                    hand.handType = { cards: [] };

                    /* Add the player's hole cards and cards from the board to the hand object */
                    hand.cards.push(players[seat].hand.cards[0]);
                    hand.cards.push(players[seat].hand.cards[1]);
                    for (var i = 0; i < table.cards.length; i++) { hand.cards.push(table.cards[i]); }
                }

                /* Sort hand in order of value, lowest to highest */
                hand.cards.sort(sort_by('value', false, parseInt));

                players[seat].hand.handType = this.evalCurrentHand(hand);
            }

            return winner;
        };

        this.evalCurrentHand = function (hand) {
            var pairedCards = [];

            hand = this.checkHighestPair(hand);

            if (hand.handType.rank <= 3) {
                hand = this.checkFlush(hand);
            }

            //handType.cards = result;
            console.log("Test");
            return hand.handType;
        };

        /* Remove a card from the players hand */
        /* (Used to bring a player's representative hand from 7 to 5) */
        this.trimHand = function (hand, card) {
            /* Remove the card from the shuffled deck */
            hand.splice(card.$index, 1);
        }

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
            /* Iterate through all cards */
            for (var card = 0; card < hand.cards.length - 1; card++) {
                var i = card;

                /* Iterate through all cards beyond this one (card) */
                while (i++ < hand.cards.length - 1) {
                    var alreadyAdded = false;

                    /* Check for a match */
                    if (hand.cards[card].value == hand.cards[i].value) {

                        /* See if we've already found any other pairs and if it matches */
                        for (var c = 0; c < pairedCards.length; c++) {
                            /* Iterate through all pairedCards to make sure we haven't already added this card in the past */
                            for (var csuit = 0; csuit < pairedCards[c].cards.length; csuit++) {
                                if (hand.cards[i].suit == pairedCards[c].cards[csuit].suit) { alreadyAdded = true; }
                            }

                            /* Check for a match with any previous found pairs */
                            if (hand.cards[card].value == pairedCards[c].cardValue && !alreadyAdded) {
                                pairedCards[c].count++;
                                pairedCards[c].cards.push(hand.cards[i]);
                            } else if (!alreadyAdded) {
                                /* We have found a prior pair but this is a different card, so add it */
                                pairedCards.push(
                                {
                                    cards: [
                                        hand.cards[card],
                                        hand.cards[i]
                                    ],
                                    cardValue: hand.cards[card].value,
                                    count: 2
                                });
                                c++; /* Add to c so we don't iterate through again since we just added 1 to pairedCards.length */
                            }
                        }

                        if (!pairedCards.length) {
                            /* We found a match, but have no prior pairs, so add to pairedCards */
                            pairedCards.push(
                            {
                                cards: [
                                    hand.cards[card],
                                    hand.cards[i]
                                ],
                                cardValue: hand.cards[card].value,
                                count: 2
                            });
                        }
                    } /* End check to see if we found a match */

                } /* End while loop */

            } /* End for loop */

            if (pairedCards.length) {
                if (pairedCards[0].count >= 4) { hand.handType = $scope.handType.fourOfAKind; }
                if (pairedCards.length >= 2 && !hand.handType) { 
                    var three = false; 

                    for (var i = 0; i < pairedCards.length; i++) {
                        if (pairedCards[i].count == 3) { hand.handType = i >= 1 ? $scope.handType.fullHouse : $scope.handType.threeOfAKind; }
                        else { hand.handType = hand.handType ? hand.handType == $scope.handType.threeOfAKind ? $scope.handType.fullHouse : $scope.handType.twoPair : $scope.handType.twoPair; }
                    }

                    /* This will still return full house even for two pair */
                    //hand.handType = hand.handType.length ? $scope.handType.fullHouse : $scope.handType.twoPair; }
                } else if (!hand.handType ) {
                    hand.handType = pairedCards[0].count == 3 ? $scope.handType.threeOfAKind : $scope.handType.pair;
                }

                for (var i = 0; i < pairedCards.length; i++) {
                    if (pairedCards[i].count >= 4) { hand.handType = $scope.handType.fourOfAKind; }
                    else if (pairedCards[i].count == 3) {
                        if (pairedCards.length >= 2) { hand.handType = $scope.handType.fullHouse; }
                        else { hand.handType = $scope.handType.threeOfAKind; }
                    }
                    else if (pairedCards.length >= 2) { hand.handType = $scope.handType.twoPair; }
                    else if (!hand.handType.length) { hand.handType = $scope.handType.pair; }

                    //angular.forEach(pairedCards[i].cards, function (value, key) {
                    //    hand.handType.cards.push(cards[key].card);
                    //});
                }
                hand.handType.cards = [];
                /* Maybe I can just do: hand.handtype.cards = pairedCards, or some variation of? */
                for (var i = 0; i < pairedCards.length; i++) {
                    hand.handType.cards.push(pairedCards[i].cards);
                }

            } else { hand.handType = $scope.handType.highCard; }

            /* Trim hand to 5 cards */
            /* 4 of a kind - while (hand.cards[i].value != pairedCards[loc_of_4_of_a_kind]) { if (!high_off_card) { trim_card; } */
            /* Consider not trimming until later, in order to compare all handTypes that show up to determine the highest hand first */

            return hand;
        };

        this.checkFlush = function (hand) {
            var flushCards = {
                hearts:     { cards: [], count: 0, name: 'hearts' },
                diamonds:   { cards: [], count: 0, name: 'diamonds' },
                spades:     { cards: [], count: 0, name: 'spades' },
                clubs:      { cards: [], count: 0, name: 'clubs' },
            };
            var hasFlush = {};


            for (var card = 0; card < hand.cards.length; card++) {
                switch (hand.cards[card].suit) {
                    case 'hearts':
                        flushCards.hearts.cards.push(hand.cards[card]);
                        if (++flushCards.hearts.count >= 5) { hasFlush = flushCards.hearts; }
                        break;
                    case 'diamonds':
                        flushCards.diamonds.cards.push(hand.cards[card]);
                        if (++flushCards.diamonds.count >= 5) { hasFlush = flushCards.diamonds; }
                        break;
                    case 'spades':
                        flushCards.spades.cards.push(hand.cards[card]);
                        if (++flushCards.spades.count >= 5) { hasFlush = flushCards.spades; }
                        break;
                    case 'clubs':
                        flushCards.clubs.cards.push(hand.cards[card]);
                        if (++flushCards.clubs.count >= 5) { hasFlush = flushCards.clubs; }
                        break;
                    default:
                        return hand;
                }
            }
            
            if (hasFlush.cards){
                hand.handType = $scope.handType.flush;
                hand.handType.cards = [];
                hand.handType.cards.push(hasFlush.cards);
            }

            return hand;
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

        this.calculateCardsEstimatePercentage = function (outs, cardsToCome) {
            return (outs.length * 2) * cardsToCome;
        };

        this.calculateCardsActualPercentage = function (outs, cardsToCome) {
            return (outs.length * (100 / 52)) * cardsToCome;
        };

        this.calculateCardsToCome = function () {
            return 5 - table.cards.length;
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
    });
})();