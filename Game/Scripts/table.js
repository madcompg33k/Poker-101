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

        /* Deal the cards to the players */
        this.dealCards = function () { newHand(); this.checkForNPC($scope.game.players[table.turn]); };
        this.dealCardsToTable = function () {
            switch (table.cards.length) {
                case 0: 
                        dealBoard(3);
                        $timeout(this.checkForNPC($scope.game.players[table.turn]), 5000);
                        break;
                case 3: 
                        dealBoard(1);
                        $timeout(this.checkForNPC($scope.game.players[table.turn]), 5000);
                        break;
                case 4: 
                        dealBoard(1);
                        $timeout(this.checkForNPC($scope.game.players[table.turn]), 5000);
                        break;
               default: 
                        for (var seat = 0; seat < $scope.game.players.length; seat++){
                            /* Don't bother evaluating players with no cards */
                            if (game.players[seat].holeCards.length) {
                                game.players[seat].handType = this.evaluatePlayerHands($scope.game.players[seat]);
                            }
                        }
                        table.winner = this.calculateWinner($scope.game.players);
                        /* Pay the winner(s) */
                        for (var i = 0; i < table.winner.length; i++){
                            table.winner[i].money = parseInt(table.winner[i].money, 10) + (parseInt(table.potSize, 10) / parseInt(table.winner.length, 10));
                        }
                        table.potSize = parseInt(0, 10);
                        table.turn = -1;
                        break;
            }

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
                    player.holeCards.length = 0;
                    player.handType = {};
                    break;
            }
            /* Set bet.amt to amount player bet */
            player.bet.amt = amount > player.money ? player.money : amount;

            /* Move to the next active player */
            this.moveSeat(player);
            if (table.turn != -1){ 
                $timeout(this.checkForNPC($scope.game.players[table.turn]), 5000);
            }
        };

        this.checkForNPC = function (player) {
            
            /* First, check if player is npc */
            if (player.playerType == "npc") {

                /* Get all cards the player is using */
                var cards = angular.copy(player.holeCards);
                for (var card = 0; card < table.cards.length; card++) { cards.push(angular.copy(table.cards[card])); }
                /* Sort the cards by value (ascending) */
                cards.sort(sort_by('value', false, parseInt));

                var playerAction = { action: 'Call', bet: 0 };
                var multiplier = 0;
                var pairedCards = this.getPairedCards(cards);
                var straightCards = this.getStraightCards(cards);
                var flushCards = this.getFlushCards(cards);

                /* Check for a straight flush or four of a kind */
                if (flushCards.straightFlush || pairedCards.handType == $scope.handType.fourOfAKind) { multiplier = 10; }
                /* Check for a full house */
                else if (pairedCards.handType == $scope.handType.fullHouse){ multiplier = 10; }
                /* Check for a flush */
                else if (flushCards.hasFlush) {
                    if (flushCards.cards[flushCards.cards.length - 1].value >= 13) { multiplier = 6; }
                    else { multiplier = 4; }
                }
                /* Check if player has a 35% or more chance to a flush */
                else if (flushCards.percentage && flushCards.percentage >= 35) { multiplier = 3; }
                /* Check if player has a 18% or more chance to a flush */
                else if (flushCards.percentage && flushCards.percentage >= 18) { multiplier = 2; }
                else if (straightCards.hasStraight) { multiplier = 4; }
                else if (straightCards.percentage > 35) { multiplier = 3; }
                else if (straightCards.percentage > 18) { multiplier = 2; }
                else if (pairedCards.handType == $scope.handType.threeOfAKind) {
                    /* Check for three aces */
                    if (pairedCards.pairs[0].cardValue == 14) { multiplier = 6; }
                    /* Check for three jacks or higher */
                    else if (pairedCards.pairs[0].cardValue >= 11) { multiplier = 4; }
                    /* All other sets */
                    else { multiplier = 3; }
                }
                /* Check for two pair */
                else if (pairedCards.handType == $scope.handType.twoPair) { multiplier = 2; }
                /* Check to see if player has a pair */
                else if (pairedCards.pairs.length && pairedCards.handType.rank < 3) {
                    /* Placeholder for highest valued pair */
                    var highestValue = 0;
                    var cardRank = 1;
                    /* Find the highest pair */
                    for (var pair = 0; pair < pairedCards.pairs.length; pair++) {
                        if (pairedCards.pairs[pair].cardValue > highestValue) { highestValue = pairedCards.pairs[pair].cardValue; }
                    }

                    /* See how the pair compares to the other cards on the table */
                    for (var card = 0; card < cards.length; card++) {
                        if (cards[card].value > highestValue) { cardRank--; }
                    }
                    /* Highest pair is at least a king */
                    if (highestValue >= 13) { multiplier = cardRank == 1 ? 6 : cardRank <= 2 ? 4 : 1; }
                    /* Pair is at least a jack or higher */
                    else if (highestValue >= 11) { multiplier = cardRank == 1 ? 4 : cardRank <= 2 ? 2 : 1; }
                    /* Pair is lower than a jack */
                    else { multiplier = cardRank == 1 ? 2 : 1; }

                }
                /* Check for all potential hands and act accordingly */
                else {
                    /* No cards on table yet, so working with just the player's hole cards */
                    if (table.cards.length <= 3) {
                        /* Ace-King or Ace-Queen */
                        if (cards[cards.length - 1].value == 14
                          && (cards[cards.length - 2].value == 13 || cards[cards.length - 2].value == 12) ){
                              /* Check if suited */
                              if (cards[cards.length - 1].suit == cards[cards.length - 2].suit) {
                                  multiplier = 2;
                                }
                              else { multiplier = 1 };
                        } 
                        /* King-Queen or King-Jack */
                        else if (cards[cards.length - 1].value == 13
                          && (cards[cards.length - 2].value == 12 || cards[cards.length - 2].value == 11) ){
                              /* Check if suited */
                              if (cards[cards.length - 1].suit == cards[cards.length - 2].suit) { multiplier = 2; }
                              else { multiplier = 1 };
                        } 
                        else if (cards[1].value <= cards[0].value + 4) {
                            multiplier = 1;
                            /* Check if suited */
                            if (cards[0].suit == cards[1].suit) { multiplier = 2; }
                        }
                        else if (table.cards.length == 0 && cards[0].suit == cards[1].suit){
                            multiplier = 1;
                        } else { multiplier = 0; }

                    }
                    /* Check against number of cards on table / thus percentage */
                    else { 
                        if (cards[cards.length - 1].value >= 13 && cards[cards.length - 2].value >= 12) {
                            multiplier = 1;
                        } else { multiplier = 0; }
                    }


                     /* Add check for Ace-King */
                }

                /* Check if player has already bet in this round to prevent a continuous loop of betting */
                if (player.bet.amt > 0) { multiplier = 1; }
                /* Calculate player's action based on the multiplier */
                playerAction = this.playerAction(multiplier, player);
                /* If the npc calls, but there is no bet, check instead */
                if (table.currentBet == 0 && (playerAction.action == 'Call' || playerAction.action == 'Fold')) { playerAction.action = 'Check'; }

                this.playerBetAction(playerAction.action, player, playerAction.bet);
            } /* Player is not npc, so let the player take his/her turn */

        }

        this.playerAction = function (multiplier, player) {
            var playerAction = {};
            
            /* Get player bet amount */
            if (table.currentBet <= table.bigBlind.amt * multiplier && playerAction.action != 'Fold'){
                playerAction.bet = table.bigBlind.amt * multiplier;
            }
            else if (table.currentBet <= table.bigBlind.amt * (multiplier * multiplier)){
                playerAction.bet = table.currentBet;
            } else {
                playerAction.action = 'Fold';
                playerAction.bet = 0;
            }


            if (table.cards.length) { playerAction.bet = multiplier > 1 ? playerAction.bet / 2 : playerAction.bet; }
            
            /* Set player action */
            playerAction.action = playerAction.bet == 0 ? 'Fold' : playerAction.bet > table.currentBet ? 'Raise' : 'Call';
            
            return playerAction;
        }

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

        this.pause = function () {
            console.log("Timeout occured");
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
                    if (players[seat].handType.rank > winner[0].handType.rank){
                        winner = [];
                        winner[0] = players[seat];
                    /* Check if current player and current winner have the same hand type */
                    } else if (players[seat].handType.rank == winner[0].handType.rank){
                        var tie = false;
                        /* Compare the current player's and the winner's cards */
                        for (var card = 0; card < players[seat].handType.cards.length; card++){
                            if (players[seat].handType.cards[card].value > winner[0].handType.cards[card].value) {
                                winner = [];
                                winner[0] = players[seat];
                                break;
                            } else if (winner[0].handType.cards[card].value > players[seat].handType.cards[card].value) { break; }
                            else if (card == players[seat].handType.cards.length - 1){
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

        this.evaluatePlayerHands = function(player){
            var hand = {};
            hand.cards = [];

            /* Add the player's hole cards and cards from the board to the hand object */
            for (var i = 0; i < player.holeCards.length; i++){ hand.cards.push(angular.copy(player.holeCards[i])); }
            for (var i = 0; i < table.cards.length; i++) { hand.cards.push(angular.copy(table.cards[i])); }

            /* Sort hand in order of value, lowest to highest */
            hand.cards.sort(sort_by('value', false, parseInt));
            /* Evaluate the current player's [seat] hand */
            player.handType = this.evalCurrentHand(hand);

            return hand.handType;
        };
        
        this.evalCurrentHand = function (hand) {
            hand = this.getPairs(hand);
            /* Check for straight (or straight flush) if we haven't already found better */
            if (hand.handType.rank < 3) {
                hand = this.checkStraight(hand);
            }
            /* Check for flush if we haven't already found better */
            if (hand.handType.rank <= 4) {
                hand = this.checkFlush(hand);
            }

            return hand.handType;
        };



        /* Find cards towards flush (newer, used for during play evaluation) */
        this.getFlushCards = function (hand) {
            var flushCards = {
                hearts:     { cards: [], count: 0, name: 'hearts', percentage: 0 },
                diamonds:   { cards: [], count: 0, name: 'diamonds', percentage: 0 },
                spades:     { cards: [], count: 0, name: 'spades', percentage: 0 },
                clubs:      { cards: [], count: 0, name: 'clubs', percentage: 0 }
            };
            /* Iterate through the hand and add to each suit accordingly */
            for (var card = 0; card < hand.length; card++) {
                switch (hand[card].suit) {
                    case 'hearts':
                        flushCards.hearts.cards.push(hand[card]);
                        if (++flushCards.hearts.count >= 5) { flushCards.cards = flushCards.hearts.cards; }
                        break;
                    case 'diamonds':
                        flushCards.diamonds.cards.push(hand[card]);
                        if (++flushCards.diamonds.count >= 5) { flushCards.cards = flushCards.diamonds.cards; }
                        break;
                    case 'spades':
                        flushCards.spades.cards.push(hand[card]);
                        if (++flushCards.spades.count >= 5) { flushCards.cards = flushCards.spades.cards; }
                        break;
                    case 'clubs':
                        flushCards.clubs.cards.push(hand[card]);
                        if (++flushCards.clubs.count >= 5) { flushCards.cards = flushCards.clubs.cards; }
                        break;
                    default:
                        return flushCards;
                }
            }

            /* Player has a flush */
            if (flushCards.cards) {
                var straightFlushCount = 0;
                flushCards.hasFlush = true;

                /* Check for straight flush */
                for (var card = 1; card < flushCards.cards.length; card++) {
                    var lastCard = card - 1;
                    if (flushCards.cards[card].value == flushCards.cards[lastCard].value + 1) { straightFlushCount++; }
                }
                if (straightFlushCount >= 5) { flushCards.straightFlush = true; }
            } 
            /* Player does not have a flush, so get percentage chance to obtaining one */
            else {

                for (var key in flushCards) { if (flushCards.hasOwnProperty(key)) {
                    if (flushCards[key].count >= 3) {
                        /* Check to see if there are enough cards left to be dealt to make the hand */
                        if ((5 - table.cards.length) <= (5 - flushCards[key].count)) {
                            flushCards.percentage = ((13 - flushCards[key].count) * (100 / 52)) * ((5 - table.cards.length) / (5 - flushCards[key].count));
                        }
                        
                    }
                } }

            }

            /* Return the newly sorted (by suit) cards that includes count */
            return flushCards;
        }

        this.getStraightCards = function(hand) {
            var straightCards = {
                cards: []
            };

            /* Add the first card to the potential straight */
            straightCards.cards.push(hand[0]);

            for (var card = 1; card < hand.length; card++) {
                if (hand[card].value == straightCards.cards[straightCards.cards.length - 1].value + 1) {
                    straightCards.cards.push(hand[card]);

                    /* Check to see if player has a straight, and set if so */
                    if (straightCards.cards.length >= 5) {
                        straightCards.hasStraight = true;
                        straightCards.highCard = straightCards.cards[straightCards.cards.length - 1].value;
                    }

                } else {
                    if (!straightCards.hasStraight && straightCards.cards.length >= 3 && straightCards.count < straightCards.cards.length) {
                        /* We have at least 3 to a straight, so set a percentage and high card before resetting */
                        straightCards.percentage = (((5 - straightCards.cards.length) * 4) * (100 / 52)) * ((5 - table.cards.length) / (5 - straightCards.cards.length));
                        straightCards.highCard = straightCards.cards[straightCards.cards.length - 1].value;
                        straightCards.count = straightCards.cards.length;
                    }
                        /* Reset straightCards and add the current card */
                        straightCards.cards.length = 0;
                        straightCards.cards.push(hand[card]);
                }
            }

            return straightCards;
        }


        this.getPairedCards = function (hand) {
            var pairedCards = { pairs: [], handType: {} };

            /* Iterate through all cards */
            for (var card = 1; card < hand.length; card++) {
                var matchFound = false;
                var lastCard = card - 1;

                /* Check current card against any previous pairs */
                for (var i = 0; i < pairedCards.length; i++){
                    if (hand[card].value == pairedCards.pairs[i].cardValue) {
                        pairedCards.pairs[i].count++;
                        matchFound = true;
                    }
                }
                /* This card doesn't match any previous pairs, check against the last card */
                if (!matchFound && hand[card].value == hand[lastCard].value) {
                    /* We've found a new pair */
                    pairedCards.pairs.push({
                        cardValue: hand[card].value,
                        count: 2
                    });
                }
            }

            /* Find what kind of hand/how many pairs we ended up with */
            if (pairedCards.pairs.length == 3) {

                if (pairedCards.pairs[0].count >= 3 || pairedCards.pairs[1].count >= 3 || pairedCards.pairs[2].count >= 3){
                    pairedCards.handType = angular.copy($scope.handType.fullHouse);
                } else { pairedCards.handType = angular.copy($scope.handType.twoPair); }

            } else if (pairedCards.pairs.length == 2) {

                if (pairedCards.pairs[0].count >= 4 || pairedCards.pairs[1].count >= 4) { pairedCards.handType = angular.copy($scope.handType.fourOfAKind);}
                else if (pairedCards.pairs[0].count >= 3 || pairedCards.pairs[1].count >= 3) { pairedCards.handType = angular.copy($scope.handType.fullHouse); }
                else { pairedCards.handType = angular.copy($scope.handType.twoPair); }

            } else if (pairedCards.pairs.length){

                if (pairedCards.pairs[0].count >= 4) { pairedCards.handType = angular.copy($scope.handType.fourOfAKind); }
                else if (pairedCards.pairs[0].count >= 3) { pairedCards.handType = angular.copy($scope.handType.threeOfAKind); }
                else { pairedCards.handType = angular.copy($scope.handType.pair); }

            } else { pairedCards.handType = angular.copy($scope.handType.highCard); }


            return pairedCards;
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

        /* (Function) getPairs(Array) */
        /* Return the card value of the hand's highest pair */
        /* Eventually make more modular/reusable */
        /* (Maybe return the hand object but with additional info like flush = true/highCard = cardID) */
        this.getPairs = function (hand) {
            var pairedCards = [];

            /* Iterate through all cards */
            for (var card = 0; card < hand.cards.length; card++) {
                var i = card;

                /* Iterate through all cards beyond this one (card) */
                while (++i < hand.cards.length) {
                    if (hand.cards[i].added) { continue;}

                    /* Check for a match */
                    if (hand.cards[card].value == hand.cards[i].value) {

                        /* See if we've already found any other pairs and if it matches */
                        for (var pairedCard = 0; pairedCard < pairedCards.length; pairedCard++) {
                            
                            //if (hand.cards[i].added) { break; }
                            /* Iterate through all pairedCards to make sure we haven't already added this card in the past */
                            //for (var pc = 0; pc < pairedCards[pairedCard].cards.length; pc++) {
                            //    if (hand.cards[i].cardID == pairedCards[pairedCard].cards[pc].cardID) { alreadyAdded = true; break; }
                            //}

                            /* Check for a match with any previous found pairs */
                            if (hand.cards[i].added) { break; }
                            else {
                                if (hand.cards[i].value == pairedCards[pairedCard].cardValue) {
                                    pairedCards[pairedCard].cards.push(hand.cards[i]);
                                    hand.cards[i].added = true;
                                    pairedCards[pairedCard].count++;
                                } else {
                                    /* We have found a prior pair but this is a different card, so add it */
                                    pairedCards.push( {
                                        cards: [ hand.cards[card], hand.cards[i] ],
                                        cardValue: hand.cards[card].value,
                                        count: 2 });
                                    hand.cards[i].added = true;
                                    hand.cards[card].added = true;
                                }
                            }
                        }

                        if (!pairedCards.length) {
                            /* We found a match, but have no prior pairs, so add to pairedCards */
                            pairedCards.push( {
                                cards: [ hand.cards[card], hand.cards[i] ],
                                cardValue: hand.cards[card].value,
                                count: 2 });
                            hand.cards[i].added = true;
                            hand.cards[card].added = true;
                        }
                    } /* End check to see if we found a match */

                } /* End while loop */

            } /* End for loop */

            /* See if we found any pairs */
            /* Fix this so that it only takes the last two pairedCards, which would be the highest, unless
               one of them is a threeOfAKind, in which case take that and the next highest/last pair */
            if (pairedCards.length) {
                /* Check for four of a kind first */
/*NEEDS FIX > *//* This will not work correctly if the first set of pairedCards is 2-3 of a kind, and four of a kind is the second set in the array */
                if (pairedCards[0].count >= 4) { hand.handType = angular.copy($scope.handType.fourOfAKind); }
                /* We don't have four of a kind, so see if we have multiple pairs */
                else if (pairedCards.length >= 2) {
                    var trips = {};
                    /* We have multiple pairs, so iterate through and see if we have a full house or just two pair */
                    for (var i = 0; i < pairedCards.length; i++) {
                        if (pairedCards[i].count == 4) { hand.handType = angular.copy($scope.handType.fourOfAKind); break; }
/* NEEDS FIX > */       /* Causes error if player has 3 sets of pairs */
                        if (pairedCards[i].count == 3) {
                            hand.handType = i >= 1 ? angular.copy($scope.handType.fullHouse) : angular.copy($scope.handType.threeOfAKind);
                        }
                        else {
                            hand.handType = !hand.handType ? angular.copy($scope.handType.twoPair)
                                : hand.handType.rank == 3 ? angular.copy($scope.handType.fullHouse) : angular.copy($scope.handType.twoPair);
                        }
                    }
                /* We don't have multiple pairs, so see if we have three of a kind or just a pair */
                } else if (!hand.handType ) {
                    hand.handType = pairedCards[0].count == 3 ? angular.copy($scope.handType.threeOfAKind) : angular.copy($scope.handType.pair);
                }
                
                /* Push all paired cards to hand.handType.cards */
                hand.handType.cards = [];
                hand.handType.pairedCards = pairedCards;
                /* Full house gets the three of a kind at the beginning of the hand, otherwise just add the cards */
                if (hand.handType == $scope.handType.fullHouse) {
                    if (pairedCards[0].count == 3) {
                        for (var x = 0; x < pairedCards[0].cards.length; x++){ hand.handType.cards.push(pairedCards[0].cards[x]); }
                        for (var x = 0; x < pairedCards[1].cards.length; x++){ hand.handType.cards.push(pairedCards[1].cards[x]); }
                    } else {
                        for (var x = 0; x < pairedCards[1].cards.length; x++){ hand.handType.cards.push(pairedCards[1].cards[x]); }
                        for (var x = 0; x < pairedCards[0].cards.length; x++){ hand.handType.cards.push(pairedCards[0].cards[x]); }
                    }
                } else {
                    for (var i = pairedCards.length - 1; i >= 0; i--) {
                        if (hand.handType.cards.length >= 5) { break; }
                        else {
                            for (var x = 0; x < pairedCards[i].cards.length; x++){ hand.handType.cards.push(pairedCards[i].cards[x]); }
                        }
                    }
                }

            } else {
                hand.handType = angular.copy($scope.handType.highCard);
                hand.handType.name = hand.cards[hand.cards.length - 1].name + " high";
                /* Add cards to handType */
                hand.handType.cards = [];
                for (var i = hand.cards.length - 1; hand.handType.cards.length < 5; i--) { hand.handType.cards.push(hand.cards[i]); }
            }

            /* Trim hand to 5 cards */
            /* 4 of a kind - while (hand.cards[i].value != pairedCards[loc_of_4_of_a_kind]) { if (!high_off_card) { trim_card; } */
            /* Consider not trimming until later, in order to compare all handTypes that show up to determine the highest hand first */
            if (pairedCards.length) {
                for (var card = hand.cards.length - 1; card >= 0; card--){
                    //var paired = false;
                    // Check to see if this card is paired, since we've already added those 
                    //for (var c = 0; c < hand.handType.cards.length; c++) {
                    //    if (hand.handType.cards[c].value == hand.cards[card].value) { paired = true; }
                    //}
                    if (hand.handType.cards.length < 5) {
                        if (!hand.cards[card].added) { hand.handType.cards.push(hand.cards[card]); }
                    } else { break; }
                }
            }

            return hand;
        };

        /* Check for a flush */
        /* Eventually make more modular/reusable */
        /* (Maybe return the hand object but with additional info like flush = true/highCard = cardID) */
        this.checkFlush = function (hand) {
            var flushCards = {
                hearts:     { cards: [], count: 0, name: 'hearts' },
                diamonds:   { cards: [], count: 0, name: 'diamonds' },
                spades:     { cards: [], count: 0, name: 'spades' },
                clubs:      { cards: [], count: 0, name: 'clubs' },
            };
            var hasFlush = [];


            for (var card = hand.cards.length - 1; card >= 0; card--) {
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
                hand.handType = angular.copy($scope.handType.flush);
                hand.handType.cards = [];
                for (var i = 0; i < hasFlush.cards.length; i++){
                    hand.handType.cards.push(hasFlush.cards[i]);
                }
            }

            return hand;
        };

        /* Check for a straight */
        /* Eventually make more modular/reusable */
        /* (Maybe return the hand object but with additional info like flush = true/highCard = cardID) */
        this.checkStraight = function (hand) {
            var straightCards = [];
            var suited = false;

            /* Check for an Ace/suited */
            if (hand.cards[hand.cards.length - 1].value == 14 && hand.cards[0].value == 2) {
                var ace = hand.cards.length;
                /* We know there is an ace and a two, so add to the straightCards array */
                //straightCards.push(hand.cards[ace]);
                while (hand.cards[--ace].value == 14) {
                    var two = -1;
                    /* Iterate through all aces and twos to see if they're suited */
                    while (hand.cards[++two].value == 2) {
                        if (hand.cards[ace].suit == hand.cards[two].suit) {
                            straightCards.push(hand.cards[ace]);
                            straightCards.push(hand.cards[two]);
                            suited = true;
                        }
                    }
                }
                /* No combination of ace/two are suited, so just the first two and last ace */
                if (!suited) {
                    straightCards.push(hand.cards[hand.cards.length - 1]);
                    straightCards.push(hand.cards[0]);
                }
            }

            for (var card = 0; card < hand.cards.length; card++){
                /* Check if we've already found an Ace-Two */
                if (straightCards.length == 2 && straightCards[0].value == 14 && straightCards[1].value == 2) {
                    for (var i = card; i < hand.cards.length; i++){
                        /* We've found a card that isn't 2, so set the current "card" iteration to start there */
                        if (hand.cards[i].value != 2) { card = i; break; }
                    }
                }

                
                if (straightCards.length) {
                    /* Find out if there's a straight progression */
                    if (hand.cards[card].value == straightCards[straightCards.length - 1].value + 1) {

                        /* Check if the straight progression is suited */
                        if (hand.cards[card].suit == straightCards[straightCards.length - 1].suit) {
                            straightCards.push(hand.cards[card]);
                            suited = true;
                            /* We have a suited straight progression, so just continue to the next card */
                            continue;

                        } else {
                            /* The cards aren't suited, so find out if the current card is paired with other cards (if not the last card) */
                            if (card < hand.cards.length - 2 && hand.cards[card].value == hand.cards[card + 1].value) {
                                /* Temporarily set suited to false for check, which will be re-set to true if we find a suited straight progression */
                                suited = false;
                                /* There's a pair, so find if any of the paired cards are suited with the straight */
                                for (var i = card + 1; i < hand.cards.length; i++){
                                    /* See if we've broken the pair, and stop loop if so */
                                    if (hand.cards[i].value != hand.cards[card].value) { break; }
                                    else {
                                        /* We still have a pair, check if suited */
                                        if (hand.cards[i].suit == straightCards[straightCards.length - 1].suit) {
                                            /* We have a suited progression */
                                            straightCards.push(hand.cards[i]);
                                            suited = true;
                                        }
                                    }
                                }
                                /* Check if suited is still false, which means we only have a straight, not suited */
                                if (!suited) { straightCards.push(hand.cards[card]); }
                            } else {
                                /* The cards weren't paired, so we don't have a suited straight */
                                straightCards.push(hand.cards[card]);
                                suited = false;
                            }
                        }
                    /* This card isn't part of a straight progression, so reset but only if we don't already have a straight */
                    } else if (straightCards.length < 5) {
                        /* Reset our tracking variables */
                        straightCards = [];
                        suited = false;
                        /* Add this new card to the newly empty straightCards array */
                        straightCards.push(hand.cards[card]);
                    }

                } else {
                    /* There are no cards towards the straight yet, so set this one */
                    straightCards.push(hand.cards[card]);
                }
            }

            if (straightCards.length >= 5) {
                if (suited){
                    hand.handType = angular.copy($scope.handType.straightFlush);
                } else {
                    hand.handType = angular.copy($scope.handType.straight);
                }
                hand.handType.cards = [];
                for (var i = straightCards.length - 1; hand.handType.cards.length < 5; i--) {
                    hand.handType.cards.push(straightCards[i]);
                }
            }
            
            return hand;
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