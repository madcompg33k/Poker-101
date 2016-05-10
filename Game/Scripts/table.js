(function () {
    var app = angular.module('table', [])
    /* Controller for all players */
    .controller('TableController', ['$scope', '$timeout', '$interval', function ($scope, $timeout, $interval) {
        /* Declare/Initialize table */
        $scope.table = {
            tableDeck: "default",
            shuffledDeck: [],
            cards: [], /* The board (e.g. the flop, turn, and river */
            dealer: { seat: 0 },
            handHistory: [],
            winner: [],
            potSize: 0,
            smallBlind: { amt: 2, seat: 0 },
            bigBlind: { amt: 4, seat: 0 },
            currentBet: 0,
            better: {},
            turn: -1
        };

        table = $scope.table;

        /* Eventually move functions to services */

        /* Deal the cards to the players */
        this.dealCards = function () {
            newHand();
            this.checkForNPC($scope.game.players[table.turn]);
        };
        this.dealCardsToTable = function () {
            switch (table.cards.length) {
                case 0:
                    dealBoard(3);
                    break;
                case 3:
                    dealBoard(1);
                    break;
                case 4:
                    dealBoard(1);
                    break;
                default:
                    for (var seat = 0; seat < $scope.game.players.length; seat++) {
                        /* Don't bother evaluating players with no cards */
                        if (game.players[seat].holeCards.length) {
                            game.players[seat].handType = this.evaluatePlayerHands($scope.game.players[seat]);
                        }
                    }
                    table.winner = this.calculateWinner($scope.game.players);
                    table.turn = -1;
                    break;
            }

            this.checkForNPC($scope.game.players[table.turn]);

        };

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
                    player.holeCards.length = 0
                    player.handType = {};
                    break;
            }

            player.action = action;
            /* Set bet.amt to amount player bet */
            player.bet.amt = amount > player.money ? player.money : amount;

            /* Move to the next active player */
            this.moveSeat(player);

            if (table.turn != -1) {
                this.checkForNPC($scope.game.players[table.turn]);
            }
        };

        this.checkForNPC = function (player) {

            /* First, check if player is npc */
            if (player.playerType == "npc") {

                /* Get all cards the player is using */
                var cards = [];
                for (var card = 0; card < player.holeCards.length; card++) { cards.push(angular.copy(player.holeCards[card])); }
                for (var card = 0; card < table.cards.length; card++) { cards.push(angular.copy(table.cards[card])); }
                /* Sort the cards by value (ascending) */
                cards.sort(sort_by('value', false, parseInt));

                var playerAction = {};
                var multiplier = 0;
                var maxBet = 0;

                /* Create a blank handType placeholder object */
                var handType = {};
                /* Find out what kind of hand the player has, if any */
                var hand = {
                    flushCards: this.getFlushCards(cards),
                    straightCards: this.getStraightCards(cards),
                    pairedCards: this.getPairedCards(cards),
                    highCards: this.getHighCards(cards)
                };

                /* Get the player's highest hand rank */
                for (var key in hand) {
                    /* Check for property */
                    if (hand.hasOwnProperty(key)) {
                        /* See if the handType check returned a handType (should default to highCard if no others return)*/
                        if (hand[key].handType) {
                            /* If handType is still empty, simply set it to the current handType */
                            if (!handType.rank) { handType = hand[key].handType; }
                            /* Check if the handType check returned a better handType than the current one */
                            else if (hand[key].handType.rank > handType.rank) { handType = hand[key].handType; }
                        }
                    }
                }



                if (hand.straightCards.percentage) { alert("Straight chance: " + hand.straightCards.percentage + "%"); }

                /* Add position checking */

                /* Pre-flop logic */
                if (!table.cards.length) {
                    /* Check if cards are suited */
                    var suited = cards[0].suit == cards[1].suit ? true : false;

                    /* Player has a pocket pair */
                    if (handType.rank >= 1 && cards[1].value >= 11) { multiplier = 3; maxBet = player.money; }
                    else if (handType.rank >= 1) { multiplier = 1; maxBet = player.money / 4; }
                    /* Any card combination consisting of Ace, King, Queen, or Jack */
                    else if (cards[0].value >= 11 && cards[1].value >= 12) {
                        multiplier = suited ? 2 : 1;
                        maxBet = suited ? player.money : player.money / 4;
                    } /* Check if player has a chance at a straight */
                    else if (cards[1].value <= cards[0].value + 4 || (cards[1].value == 14 && cards[0].value <= 5)) {
                        multiplier = suited ? 2 : 1;
                        maxBet = suited ? table.bigBlind.amt * 6 : table.bigBlind.amt * 3;
                    } /* See if player's high card is at least a king */
                    else if (cards[1].value >= 13) {
                        multiplier = suited ? 2 : 1;
                        maxBet = suited ? player.money / 2 : table.bigBlind.amt * 4;
                    } else {
                        multiplier = suited ? 1 : 0;
                        maxBet = suited ? table.bigBlind.amt * 3 : 0;
                    }

                    /* Post-flop logic */
                } else {
                    /* Find out if player's highest card is higher than the highest card on the board */
                    var hasHigherCard = true;
                    for (var card = 0; card < table.cards.length; card++) {
                        if (table.cards[card].value > player.holeCards[0].value && table.cards[card.value > player.holeCards[1].value]) {
                            hasHigherCard = false; break;
                        }
                    }

                    /* Add logic to see if hand is completely shared or not */

                    /* Player has at least a full house, four of a kind, or a straight flush */
                    if (handType.rank >= 6) { multiplier = handType.rank + 4; maxBet = player.money; }
                    /* Player has a flush */
                    else if (handType.rank == 5 && hasHigherCard) { multiplier = handType.rank + 2; maxBet = player.money; }
                    else if (handType.rank == 5) { multiplier = handType.rank; maxBet = player.money / 2; }
                    /* Player has either three of a kind or a straight */
                    else if (handType.rank >= 3 && hasHigherCard) { multiplier = handType.rank + 2; maxBet = player.money; }
                    else if (handType.rank >= 3) { multiplier = handType.rank; maxBet = player.money / 2; }
                    /* Check if player has a 35% or more chance to a flush */
                    else if (hand.flushCards.percentage >= 35 && handType.cards[handType.cards.length - 1].value >= 14) { multiplier = 3; maxBet = player.money; }
                    else if (hand.flushCards.percentage >= 35) { multiplier = 2; maxBet = player.money / 2; }
                    /* Check if player has a 18% or more chance to a flush */
                    else if (hand.flushCards.percentage >= 18) { multiplier = 2; maxBet = player.money / 4; }
                    /* Check if player has a 35% or more chance to a straight */
                    else if (hand.straightCards.percentage > 35 && handType.cards[handType.cards.length - 1].value >= 14) { multiplier = 3; maxBet = player.money / 2; }
                    /* Player has two pair */
                    else if (handType.rank >= 2 && hand.pairedCards.pairs[0].cardValue >= 11) {
                        multiplier = 4;
                        maxBet = player.money / 2;
                    }
                    else if (handType.rank >= 2) { multiplier = 2; maxBet = player.money / 4; }
                    /* Player has a pair */
                    else if (handType.rank >= 1 && hand.pairedCards.pairs[0].cardValue >= 11) { multiplier = 4; maxBet = player.money; }
                    else if (handType.rank >= 1) { multiplier = 2; maxBet = player.money / 4; }
                    /* Check if player has a 18% or more chance to a straight */
                    else if (hand.straightCards.percentage > 18) { multiplier = 2; maxBet = player.money / 4; }
                    /* Check if player at least has two high hole cards */
                    else if (player.holeCards[0].value >= 12 && player.holeCards[1].value >= 12) {
                        multiplier = 1;
                        maxBet = table.bigBlind * 4;
                    }
                    /* Player has nothing, so fold */
                    else { multiplier = 0; maxBet = 0; }
                }


                /* Check if player has already bet in this round to prevent a continuous loop of betting */
                if (player.bet.amt > 0) { multiplier = 1; }
                /* Calculate player's action based on the multiplier */
                playerAction = this.playerAction(player, multiplier, maxBet);
                /* If the npc calls, but there is no bet, check instead */
                if (table.currentBet == 0 && (playerAction.action == 'Call' || playerAction.action == 'Fold')) { playerAction.action = 'Check'; }


                this.playerBetAction(playerAction.action, player, playerAction.bet);
            } /* Player is not npc, so let the player take his/her turn */

        };

        /* Change to a minimum and maximum bet */
        /* if currentBet > minimum -> if currentBet > minimum * 2 -> bet maximum?? */
        this.playerAction = function (player, multiplier, maxBet) {
            var playerAction = {};

            if (table.cards.length) { multiplier = multiplier > 1 ? multiplier / 2 : 0; }

            /* Get player bet amount */
            if (table.currentBet <= table.bigBlind.amt * multiplier) {
                playerAction.bet = table.bigBlind.amt * multiplier;
            }
            else if (table.currentBet <= maxBet) {
                playerAction.bet = table.currentBet;
            } else {
                playerAction.action = 'Fold';
                playerAction.bet = 0;
            }

            /* Add player types (e.g. conservative player, aggressive player, etc. */
            /* Make bets/multiplier progressively higher as the board is dealt */

            /* Set player action */
            playerAction.action = playerAction.bet == 0 ? 'Fold' : playerAction.bet > table.currentBet ? 'Raise' : 'Call';

            return playerAction;
        };

        this.moveSeat = function (player) {
            /* Move to the next seat */
            table.turn = getNextSeat(table.turn);
            /* Continue moving if the current player has no more money to bet, or has folded, and stop on the original better/player */
            while (!game.players[table.turn].holeCards.length ||
                    (parseInt(game.players[table.turn].money, 10) <= 0
                    && !game.players[table.turn] == table.better))
            { table.turn = getNextSeat(table.turn); }
            /* Check to see if we've reached the original better/checker */
            if (game.players[table.turn] == table.better) {
                this.dealCardsToTable();
            }
        };

        /* Get player's hand length (handType.cards) to 5 in descending order */
        this.getFiveCards = function (hand, allCards) {

            if (hand.length < 5) {
                /* Iterate through all cards the player is using */
                for (var card = allCards.length - 1; hand.length < 5; card--) {
                    /* Instantiate variable to check if card is in player's current hand or not */
                    var cardFound = false;

                    /* Iterate through the cards in the player's current hand and stop at 5 */
                    for (var c = 0; c < hand.length; c++) {
                        /* Check if the card is already being used in the player's current hand */
                        if (allCards[card].cardID == hand[c].cardID) { cardFound = true; }
                    }

                    /* If card isn't in player's current hand, add card to player's hand */
                    if (!cardFound) { hand.push(allCards[card]); }
                }
            } else {
                for (var card = hand.length - 1; hand.length > 5; card--) { hand.splice(card, 1); }
            }

            /* Return the newly sorted 5-card hand */
            return hand;
        };


        this.evaluatePlayerHands = function (player) {
            var cards = [];
            var handType = {};

            /* Add the player's hole cards and cards from the board to the hand object */
            for (var i = 0; i < player.holeCards.length; i++) { cards.push(angular.copy(player.holeCards[i])); }
            for (var i = 0; i < table.cards.length; i++) { cards.push(angular.copy(table.cards[i])); }

            /* Sort hand in order of value, lowest to highest */
            cards.sort(sort_by('value', false, parseInt));
            /* Evaluate the current player's [seat] hand */
            handType = this.evalCurrentHand(cards);

            return handType;
        };

        this.evalCurrentHand = function (cards) {
            /* Create a blank handType placeholder object */
            var handType = {};
            /* Find out what kind of hand the player has, if any */
            var hand = {
                flushCards: this.getFlushCards(cards),
                straightCards: this.getStraightCards(cards),
                pairedCards: this.getPairedCards(cards),
                highCards: this.getHighCards(cards)
            };

            /* Get the player's highest hand rank */
            for (var key in hand) {
                /* Check for property */
                if (hand.hasOwnProperty(key)) {
                    /* See if the handType check returned a handType (should default to highCard if no others return)*/
                    if (hand[key].handType) {
                        /* If handType is still empty, simply set it to the current handType */
                        if (!handType.rank) { handType = hand[key].handType; }
                        /* Check if the handType check returned a better handType than the current one */
                        else if (hand[key].handType.rank > handType.rank) { handType = hand[key].handType; }
                    }
                }
            }
            /* Trim or add to end with a 5-card hand */
            handType.cards = this.getFiveCards(handType.cards, cards);
            /* Return the hand type */
            return handType;
        };


        /* Find the winner! */
        this.calculateWinner = function (players) {
            /* Create blank winner object */
            var winner = [];
            /* Iterate through each player */
            for (var seat = 0; seat < players.length; seat++) {
                /* Skip player if they have no cards */
                if (!players[seat].holeCards.length) { continue; }

                /* Check if winner is currently blank */
                if (winner.length) {
                    /* There is a previously set winner, see if the current player's hand is better */
                    if (players[seat].handType.rank > winner[0].handType.rank) {
                        winner = [];
                        winner[0] = players[seat];
                        /* Check if current player and current winner have the same hand type */
                    } else if (players[seat].handType.rank == winner[0].handType.rank) {
                        var tie = false;
                        /* Compare the current player's and the winner's cards */
                        for (var card = 0; card < players[seat].handType.cards.length; card++) {
                            if (players[seat].handType.cards[card].value > winner[0].handType.cards[card].value) {
                                winner = [];
                                winner[0] = players[seat];
                                break;
                            } else if (winner[0].handType.cards[card].value > players[seat].handType.cards[card].value) { break; }
                            else if (card == players[seat].handType.cards.length - 1) {
                                /* We have a tie, so add the current player to the winners array */
                                winner.push(players[seat]);
                            }
                        } /* End for loop */
                    } /* End checking rank vs. rank */
                    /* There was no winner set, so set it to the current player */
                } else { winner[0] = players[seat]; }
            }
            /* Return the local winner object */
            return winner;
        };


        /* Find cards towards flush (newer, used for during play evaluation) */
        this.getFlushCards = function (cards) {
            var flushCards = {
                hearts: { cards: [], count: 0, name: 'hearts', percentage: 0 },
                diamonds: { cards: [], count: 0, name: 'diamonds', percentage: 0 },
                spades: { cards: [], count: 0, name: 'spades', percentage: 0 },
                clubs: { cards: [], count: 0, name: 'clubs', percentage: 0 }
            };
            /* Iterate through the hand and add to each suit accordingly */
            for (var card = 0; card < cards.length; card++) {
                switch (cards[card].suit) {
                    case 'hearts':
                        flushCards.hearts.cards.push(cards[card]);
                        if (++flushCards.hearts.count >= 5) { flushCards.cards = flushCards.hearts.cards; }
                        break;
                    case 'diamonds':
                        flushCards.diamonds.cards.push(cards[card]);
                        if (++flushCards.diamonds.count >= 5) { flushCards.cards = flushCards.diamonds.cards; }
                        break;
                    case 'spades':
                        flushCards.spades.cards.push(cards[card]);
                        if (++flushCards.spades.count >= 5) { flushCards.cards = flushCards.spades.cards; }
                        break;
                    case 'clubs':
                        flushCards.clubs.cards.push(cards[card]);
                        if (++flushCards.clubs.count >= 5) { flushCards.cards = flushCards.clubs.cards; }
                        break;
                    default:
                        break;
                }
            }

            /* Player has a flush */
            if (flushCards.cards) {
                var straightFlushCount = 0;
                flushCards.handType = angular.copy($scope.handType.flush);

                /* Check for straight flush */
                for (var card = 1; card < flushCards.cards.length; card++) {
                    var lastCard = card - 1;
                    if (flushCards.cards[card].value == flushCards.cards[lastCard].value + 1) { straightFlushCount++; }
                }
                if (straightFlushCount >= 5) { flushCards.handType = angular.copy($scope.handType.straightFlush); }

                /* Add cards to player's handType.cards (Done here just in case handType is reset by straight flush */
                for (var card = 0; card < flushCards.cards.length; card++) { flushCards.handType.cards.push(flushCards.cards[card]); }
            }
            else {
                /* Player does not have a flush, so get percentage chance to obtaining one */
                for (var key in flushCards) {
                    if (flushCards.hasOwnProperty(key)) {
                        if (flushCards[key].count >= 3) {
                            /* Check to see if there are enough cards left to be dealt to make the hand */
                            if ((5 - table.cards.length) <= (5 - flushCards[key].count)) {
                                flushCards.percentage = ((13 - flushCards[key].count) * (100 / 52)) * ((5 - table.cards.length) / (5 - flushCards[key].count));
                            }
                        }
                    }
                }
            }

            /* Return the newly sorted (by suit) cards that includes count */
            return flushCards;
        };

        this.getStraightCards = function (cards) {
            var straightCards = { cards: [] };

            /* Check for Ace - 5 straight possibility */
            if (cards[0].value == 2 && cards[cards.length - 1].value == 14) {
                straightCards.cards.push(cards[cards.length - 1]);
                straightCards.cards.push(cards[0]);
            } else {
                /* Add the first card to the potential straight */
                straightCards.cards.push(cards[0]);
            }

            for (var card = 1; card < cards.length; card++) {
                /* Check to see if this card is 1 higher than the last put into the straightCards.cards array */
                if (cards[card].value == straightCards.cards[straightCards.cards.length - 1].value + 1) {
                    /* Add the card to the array */
                    straightCards.cards.push(cards[card]);

                    /* Check to see if player has a straight, and set if so */
                    if (straightCards.cards.length >= 5) {
                        /* Set hand type to straight */
                        straightCards.handType = angular.copy($scope.handType.straight);
                        /* Add cards to the handType.cards array */
                        for (var card = 0; card < straightCards.cards.length; card++) { straightCards.handType.cards.push(straightCards.cards[card]); }
                    }

                } else {
                    /* Check if we have at least 3 to a straight, so set a percentage and high card before resetting */
                    if (!straightCards.handType && straightCards.cards.length >= 3 && straightCards.count < straightCards.cards.length) {
                        straightCards.percentage = (((5 - straightCards.cards.length) * 4) * (100 / 52)) * ((5 - table.cards.length) / (5 - straightCards.cards.length));
                        //straightCards.count = straightCards.cards.length;
                    }
                    /* Reset straightCards and add the current card */
                    straightCards.cards.length = 0;
                    straightCards.cards.push(cards[card]);
                }
            }

            return straightCards;
        };


        this.getPairedCards = function (cards) {
            var pairedCards = { pairs: [] };

            /* Iterate through all cards */
            for (var card = 1; card < cards.length; card++) {
                var matchFound = false;
                var lastCard = card - 1;

                /* Check current card against any previous pairs */
                for (var i = 0; i < pairedCards.pairs.length; i++) {
                    if (cards[card].value == pairedCards.pairs[i].cardValue) {
                        pairedCards.pairs[i].cards.push(cards[card]);
                        pairedCards.pairs[i].count++;
                        matchFound = true;
                    }
                }
                /* This card doesn't match any previous pairs, check against the last card */
                if (!matchFound && cards[card].value == cards[lastCard].value) {
                    /* We've found a new pair */
                    pairedCards.pairs.push({
                        cards: [cards[card], cards[lastCard]],
                        cardValue: cards[card].value,
                        count: 2
                    });
                }
            }

            /* Find what kind of hand/how many pairs we ended up with */
            if (pairedCards.pairs.length == 3) {

                if (pairedCards.pairs[0].count >= 3 || pairedCards.pairs[1].count >= 3 || pairedCards.pairs[2].count >= 3) {
                    pairedCards.handType = angular.copy($scope.handType.fullHouse);
                } else { pairedCards.handType = angular.copy($scope.handType.twoPair); }

            } else if (pairedCards.pairs.length == 2) {

                if (pairedCards.pairs[0].count >= 4 || pairedCards.pairs[1].count >= 4) { pairedCards.handType = angular.copy($scope.handType.fourOfAKind); }
                else if (pairedCards.pairs[0].count >= 3 || pairedCards.pairs[1].count >= 3) { pairedCards.handType = angular.copy($scope.handType.fullHouse); }
                else { pairedCards.handType = angular.copy($scope.handType.twoPair); }

            } else if (pairedCards.pairs.length) {

                if (pairedCards.pairs[0].count >= 4) { pairedCards.handType = angular.copy($scope.handType.fourOfAKind); }
                else if (pairedCards.pairs[0].count >= 3) { pairedCards.handType = angular.copy($scope.handType.threeOfAKind); }
                else { pairedCards.handType = angular.copy($scope.handType.pair); }
            }

            /* Sort cards by highest pair value or count */
            if (pairedCards.handType == $scope.handType.fullHouse) { pairedCards.pairs.sort(sort_by('count', true, parseInt)); }
            else { pairedCards.pairs.sort(sort_by('cardValue', true, parseInt)); }


            /* Add all paired cards to a cards array for review later */
            for (var card = 0; card < pairedCards.pairs.length; card++) {
                /* Iterate through the cards in each pair */
                for (var c = 0; c < pairedCards.pairs[card].cards.length; c++) { pairedCards.handType.cards.push(pairedCards.pairs[card].cards[c]); }
            }

            return pairedCards;
        };

        /* Get high card values */
        this.getHighCards = function (cards) {
            var highCards = {};
            /* Automatically set hand type to high card since everyone has at least that */
            highCards.handType = angular.copy($scope.handType.highCard);
            /* Add all cards to the handType.cards array */
            for (var card = 0; card < cards.length; card++) { highCards.handType.cards.push(cards[card]); }
            /* Return the object */
            return highCards;
        }


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