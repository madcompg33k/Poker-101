/* Begin function to randomize/shuffle the "deck" array */
function shuffle(d) {
    var newDeck = [];
    for (var row = 0; row < d.length; row++) {
        newDeck.push(d[row]);
    }

    var i = newDeck.length, j, tempi, tempj;
    if (i == 0) return false;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        tempi = newDeck[i];
        tempj = newDeck[j];
        newDeck[i] = tempj;
        newDeck[j] = tempi;
    }
    return newDeck;
}
/* End function to randomize/shuffle the "deck" array */

/* Begin function to check if we need to move to the last player or not */
function getNextSeat(seat) {
    return seat == 0 ? game.players.length - 1 : seat - 1;
}

/* Begin function to clear all cards from game.players and the table */
function clearBoard(){
    /* Check for any game.players first */
    if (game.players.length){
        /* Clear all player cards, if they have any */
        for (p = 0; p < game.players.length; p++) {
            /* Clear player hand data */
            if (game.players[p].cards){ game.players[p].cards.length = 0; }
            else { game.players[p].cards = []; }
            if (game.players[p].hand){ game.players[p].hand.length = 0; }
            else { game.players[p].hand = []; }
            game.players[p].bet.amt = 0;
            game.players[p].handRank = 0;
        }
    }

    /* Clear all cards from the table, if there are any */
    if (table.cards){ table.cards.length = 0; }

    /* Reset the shuffled deck */
    if (table.shuffledDeck) { table.shuffledDeck.length = 0; }
    table.shuffledDeck = shuffle(game.deck);

    /* Reset other table data */
    table.potSize = 0;
    table.winner = {
        seat: -1,
        handRank: 0
    };
    table.better = {};
    table.turn = -1;    
    table.currentBet = parseInt(table.bigBlind.amt, 0);

    /* Reset each player's hand rank */
    for (var seat = 0; seat < game.players.length; seat++) {
        game.players[seat].hand.length = 0;
        game.players[seat].handRank = null;
        game.players[seat].bet.amt = 0;
    }
}
/* End function to clear all cards from game.players and the table */

/* Perform all logic/functionality for dealing a new hand */
function newHand() {
    /* Don't begin a new hand if we only have 1 player */
    if (game.players.length < 2){
        game.errorMessage = "You cannot play with only one player.";
        return;
    }
    
    /* Reset board */
    clearBoard();

    /* Move the dealer button and the blinds */
    if (table.smallBlind.seat == 0 && table.bigBlind.seat == 0 && table.dealer.seat == 0){
        table.dealer.seat = game.players.length - 1;
        table.smallBlind.seat = game.players.length - 2;
        table.bigBlind.seat = (game.players.length - 3) < 0 ? (game.players.length - 3) * 1 : game.players.length - 3;
    }else {
        table.dealer.seat = table.dealer.seat == 0 ? game.players.length - 1 : table.dealer.seat - 1;
        table.smallBlind.seat = getNextSeat(table.smallBlind.seat);
        table.bigBlind.seat = getNextSeat(table.bigBlind.seat); 
    }

    table.currentBet = parseInt(table.bigBlind.amt, 0);
    table.turn = getNextSeat(table.bigBlind.seat);

    /* Pay the blinds */
    game.players[table.smallBlind.seat].bet.amt = table.smallBlind.amt;
    game.players[table.bigBlind.seat].bet.amt = table.bigBlind.amt;
    
    /* Deal the cards */
    game.players = dealCards();
}

function addMoneyToPot(){
    for (var seat = 0; seat < game.players.length; seat++){
        game.players[seat].money -= parseInt(game.players[seat].bet.amt, 10);
        table.potSize += parseInt(game.players[seat].bet.amt, 10);
        /* Reset player's bet amount for the next round */
        game.players[seat].bet.amt = 0;
    }
}


/* Begin function to deal cards to each player */
function dealCards() {
    /* Make sure there are game.players first */
    if (game.players.length > 1){
        /* Set initial seat/card values */
        var seat = 0;
        var card = 0;

        /* Iterate through each player */
        for (var i = 0; i < game.players.length * 2; i++) {
            /* Assign current player's card position in the deck */
            game.players[seat].cards.push(table.shuffledDeck[0]);
            table.shuffledDeck.splice(0, 1);
            /* Move to the next player/seat */
            seat++;
            /* Check to see if we've reached the last player */
            if (i == game.players.length - 1) {
                /* Change player/seat back to the first player to deal the second round of cards */
                seat = 0;
                /* Change the card we're dealing to the second of the player's hole cards */
                card++;
            }
        }
    }
    

    /* Return the updated game.players object */
    return game.players;
};
/* End function to deal cards to each player */


/* Begin function to deal the flop */
function dealBoard(qty) {
    /* "Burn" the next card */
    table.shuffledDeck.splice(0, 1);

    for (var x = 1; x < qty + 1; x++) {
        /* Add the card to the board */
        table.cards.push(table.shuffledDeck[0]);

        /* Remove the card from the shuffled deck */
        table.shuffledDeck.splice(0, 1);
    }

    /* Take money from players and add to the pot */
    addMoneyToPot();

    /* Reset the current bet */
    table.better = game.players[getNextSeat(table.dealer.seat)];
    table.currentBet = parseInt(0, 0);
    table.turn = getNextSeat(table.dealer.seat);
};
/* End function to deal the flop */

function sort_by(field, reverse, primer) {
    var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

/* !!! !!! !!! Hand Hierarchy/Winner Code and Logic !!! !!! !!! */
/* Still needs extra logic to hand high card, highest pair(s)/three of a kind, and highest hand for FH vs. FH */
function evaluateHand(player, cards) {
    //hand = [];

    /* Add the player's hole cards and cards from the board to the hand object */
    if (player.cards.length) {
        player.hand.push(player.cards[0]);
        player.hand.push(player.cards[1]);
        for (var i = 0; i < cards.length; i++) { player.hand.push(cards[i]); }
    } else { return; }

    /* Sort hand in order of value, lowest to highest */
    player.hand.sort(sort_by('value', false, parseInt));


    var straightFlush = false;
    var four = false;
    var full = false;
    var flush = false;
    var straight = false;
    var three = false;
    var pairs = 0;
    var k = 0;

    var card = 0;

    var hearts = 0;
    var diamonds = 0;
    var spades = 0;
    var clubs = 0;

    /* Set current cardsToStraight and cardsToStraightFlush as 1, since you're ALWAYS at least 1 card to a straight/straight flush */
    var cardsToStraight = 1;
    var cardsToStraightFlush = 1;

    var matches = 0;
    var z = 0;

    /* Iterate through all of the player's cards */
    for (card = 0; card < player.hand.length; card++) {

        /* Check to see which suit this card is, and add to the total number of that suit */
        switch (player.hand[card].suit) {
            case 'Hearts':
                if (++hearts >= 5) { flush = true; }
                break;
            case 'Diamonds':
                if (++diamonds >= 5) { flush = true; }
                break;
            case 'Spades':
                if (++spades >= 5) { flush = true; }
                break;
            case 'Clubs':
                if (++clubs >= 5) { flush = true; }
                break;
        }

        /* Don't check previous card against first, since there is no previous card */
        if (card >= 1) {
            /* Set the previous, and last card's indexes */
            var previousCard = card - 1;
            var lastCard = player.hand.length - 1;

            if ((player.hand[previousCard].value == 2 && player.hand[card].value == 3) && player.hand[lastCard].value == 14) {
                /* There is a 2, 3, and an ace, so add 1 to cardsToStraight for the Ace */
                cardsToStraight++;
            }

            /* Find out how many cards the player has to a straight */
            if (player.hand[previousCard].value == (player.hand[card].value - 1)) {
                /* Add 1 to cards to straight before checking if we have one, and set to true if we do */
                if (++cardsToStraight >= 5) { straight = true; }
            }
            /* This card isn't part of the straight, and it's not a pair for the prior card, so reset the count */
            else if (player.hand[previousCard].value != player.hand[card].value) {
                cardsToStraight = 1;
            }


        }

    } /* End for loop iterating through current hand */


    /* Since we have 7 cards but would only want to use 5, check for straight flush */
    if (straight && flush) {
        var lastMatchingCardPos = -1;


        for (card = 1; card < player.hand.length; card++) {
            /* Set previousCard to the card before the one at the current index */
            var previousCard = card - 1;

            if (((player.hand[previousCard].value == 2 && player.hand[card].value == 3) && player.hand[lastCard].value == 14) &&
                (player.hand[previousCard].suitVal == player.hand[card].suitVal && player.hand[lastCard].suitVal == player.hand[card].suitVal)) {
                /* There is a suited 2, 3, and an ace, so add 1 to cardsToStraightFlush for the Ace */
                cardsToStraightFlush++;
            }

            /* See if the previous card's value is 1 less than the current card */
            if ((player.hand[card].value - 1) == player.hand[previousCard].value) {

                /* We have a numerical progression, check if suit matches and if so, add 1 to cardsToStraightFlush */
                if (player.hand[card].suitVal == player.hand[previousCard].suitVal) {
                    /* Set the number for the last matching card's index (lastMatchingCardPos) to the current index (card) */
                    lastMatchingCardPos = card;
                    /* We have a suited straight progression, so add 1 to cardsToStraightFlush */
                    if (++cardsToStraightFlush >= 5) { straightFlush = true; }
                }


                /* Check to see if this card and the previous is a pair, and if so, check the current card against the last matchingCardPos */
            } else if (player.hand[card].value == player.hand[previousCard].value) {

                if (lastMatchingCardPos >= 0 &&                                     /* Make sure there "is" a lastMatchingCardPosition */
                    ((player.hand[card].value - 1) == player.hand[lastMatchingCardPos].value &&   /* Check current card value - 1 against last matching card's value */
                    player.hand[card].suitVal == hand[lastMatchingCardPos].suitVal)) {     /* Check current card's suit against last matching card's suit */

                    /* The previous card is a pair for this one, AND the card in the last matching index follows the suited straight progression */


                    /* Set the number for the last matching card's index (lastMatchingCardPos) to the current index (card) */
                    lastMatchingCardPos = card;

                    if (++cardsToStraightFlush >= 5) { straightFlush = true; }


                } else {
                    /* There is no straight progression and the previous card isn't a pair for this one, so reset our variables */
                    lastMatchingCardPos = -1;
                    cardsToStraightFlush = 1;
                }
            } else {
                /* There is no straight progression and the previous card isn't a pair for this one, so reset our variables */
                lastMatchingCardPos = -1;
                cardsToStraightFlush = 1;
            }

        } /* End for loop */
    }


    /* Check for four of a kind */
    /* Add my altered version of the below four of a kind check */

    /* Check for fours */
    for (var i = 0; i < 4; i++) {
        k = i;

        while (k < i + 3 && player.hand[k].value == player.hand[k + 1].value) {
            k++;

            if (k == i + 3) {
                four = true;
            }
        }
    }


    /* Check for threes and full house */
    if (!four) {
        for (var i = 0; i < 5; i++) {
            k = i;
            var nextCard = k + 1;

            while (k < i + 2 && player.hand[k].value == player.hand[nextCard].value) {
                k++;
                nextCard = k + 1;

                if (k == i + 2) {
                    three = true;

                    if (i == 0) {
                        if (player.hand[3].value == player.hand[4].value || player.hand[4].value == player.hand[5].value || player.hand[5].value == player.hand[6].value) { full = true; }
                    } else if (i == 1) {
                        if (player.hand[4].value == player.hand[5].value || player.hand[5].value == player.hand[6].value) { full = true; }
                    } else if (i == 2) {
                        if (player.hand[0].value == player.hand[1].value || player.hand[5].value == player.hand[6].value) { full = true; }
                    } else {
                        if (player.hand[0].value == player.hand[1].value || player.hand[1].value == player.hand[2].value) { full = true; }
                    }
                }
            }
        }
    }

    /* If we've found something so far, go ahead and return the hand rank */
    if (straightFlush) { return 9; }
    else if (four) { return 8; }
    else if (full) { return 7; }
    else if (flush) { return 6; }
    else if (straight) { return 5; }
    else if (three) { return 4; }


    /* Check for pairs */
    for (k = 0; k < 6; k++) {
        if (player.hand[k].value == player.hand[k + 1].value) { pairs++; }
    }


    if (pairs >= 2) { return 3; }
    else if (pairs) { return 2; }
    else { return 1; }
}


/* Begin function to find out who won */
function calculateWinner() {
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
            table.winner.seat = p;
            table.winner.handRank = game.players[p].handRank;
        } else if (game.players[p].handRank == table.winner.handrank) {
            table.winner.seat = game.players[p].hand[players[p].hand.length - 1].value > game.players[table.winner.seat].hand[game.players[table.winner.seat].hand.length - 1].value
                ? p : table.winner.seat;
        }
    }

    /* Pay the winner */
    game.players[table.winner.seat].money = parseInt(game.players[table.winner.seat].money, 10) + parseInt(table.potSize, 10);
    table.potSize = parseInt(0, 10);
    
    var allHands = {

    };


    var seat = [
        {
            hasPair: {},
            hasTwoPair: {},
            hasThree: {},
            hasStraight: {},
            hasFlush: {},
            hasFull: {},
            hasFour: {},
            hasStraightFlush: {}
        }
    ];
}
/* End function to find out who won */

/* ^^^ ^^^ ^^^ Hand Hierarchy/Winner Code and Logic ^^^ ^^^ ^^^ */