(function () {
    var app = angular.module('hand', []);
    /* Controller to handle all functionality of the overall game */
    app.controller('HandController', function () {
        this.cards = [];
        this.pairedCards = []; /* Contains cardValue, and count */
        this.pairPercent = 0;
        this.cardsToStraight = 0;
        this.straightPercent = 0;
        this.cardsToFlush = 0;
        this.flushPercent = 0;
        this.rank = 0;
        this.handTypeName = '';

        this.addHandToPlayer = function (player, cards) {
            player.hand = this;
            angular.forEach(cards, function (value, key) {
                this.cards.push(cards[key].value);
            });
        }

        this.calculateCardsEstimatePercentage = function (outs, cardsToCome) {
            return (outs.length * 2) * cardsToCome;
        }

        this.calculateCardsActualPercentage = function (outs, cardsToCome) {
            return (outs.length * (100 / 52)) * cardsToCome;
        }

        this.calculateCardsToCome = function () {
            return 5 - table.cards.length;
        }

        this.evalCurrentHand = function (cards) {
            return "Test";
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
        }

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

            return pairedCards;
        }

        /* Return the percentage the player currently has to getting a flush */
        this.getPercentageToFlush = function (hand, stageOfPlay) {
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
        }

    });
    /* Add hand eval/output/percentages directive */
})();