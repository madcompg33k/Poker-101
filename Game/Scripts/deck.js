(function () {
    var app = angular.module('game', [])
        .controller('GameController', ['$scope', function ($scope) {
            $scope.errorMessage = "";
            errorMessage = this.errorMessage;

            $scope.cards = allCards;
            cards = $scope.cards;
        } ])
    /* Controller for all table-related things */
        .controller('TableController', ['$scope', function ($scope) {
            $scope.deck = allCards;

            /* DOM variables for testing purposes only */
            this.hand = [];
            var hand = this.hand;
            this.matchingCards = [];
            matchingCards = this.matchingCards;


            /* Create a deck DOM object to view in Firebug (for testing environment only) */
            deck = $scope.deck;
            $scope.table = {
                players: people,
                cards: [],
                shuffledDeck: [],
                money: 0,
                chips: [],
                handHistory: [],
                winner: {}
            }

            /* Create a table DOM object to view in Firebug (For Testing Environment Only) */
            table = $scope.table;

            /* Deal the cards to the players */
            this.dealCards = function () {
                /* Reset board */
                $scope.table.cards.length = 0;
                $scope.table.shuffledDeck = shuffle($scope.cards);
                $scope.table.players = dealCards(table.players)

                for (var p = 0; p < $scope.table.players.length; p++) {
                    $scope.table.players[p].handRank = null;
                }
            }
            this.dealFlop = function () { table.cards = dealBoard(table.players, table.cards, 3) }
            this.dealTurn = function () { table.cards = dealBoard(table.players, table.cards, 1) }
            this.dealRiver = function () { table.cards = dealBoard(table.players, table.cards, 1) }

            /* Find the winner! */
            this.getWinner = function () {
                for (var p = 0; p < table.players.length; p++) {
                    table.players[p].handRank = evaluateHand(table.players[p], table.cards);
                }

                //table.winner = calculateWinner(table.players, table.cards)
            }
        } ])
    /* Controller for all players */
        .controller('PlayersController', ['$scope', function ($scope) {
            /* Initialize Players and assign data to it */
            //is.players = people;
            /* Create object to view in Firebug */
            //ayers = this.players;
        } ])
    /* Controller for add/modifying an individual player */
        .controller('PlayerController', ['$scope', function ($scope) {
            this.player = {};

            this.addPlayer = function (players) {
                /* Create an empty player object */
                this.player = {
                    name: this.player.name,
                    money: 200,
                    chips: [
                        {
                            amt: 1,
                            name: "1 Dollars",
                            shortName: "$1",
                            imgFull: "/game/images/chips/1-dollar.png",
                            imgThumb: "/game/images/chips/1-dollar-thumb.png",
                            qty: 10
                        },
                        {
                            amt: 2,
                            name: "2 Dollars",
                            shortName: "$2",
                            imgFull: "/game/images/chips/2-dollar.png",
                            imgThumb: "/game/images/chips/2-dollar-thumb.png",
                            qty: 20
                        },
                        {
                            amt: 5,
                            name: "5 Dollars",
                            shortName: "$5",
                            imgFull: "/game/images/chips/5-dollar.png",
                            imgThumb: "/game/images/chips/5-dollar-thumb.png",
                            qty: 10
                        },
                        {
                            amt: 10,
                            name: "10 Dollars",
                            shortName: "$10",
                            imgFull: "/game/images/chips/10-dollar.png",
                            imgThumb: "/game/images/chips/10-dollar-thumb.png",
                            qty: 5
                        },
                        {
                            amt: 50,
                            name: "50 Dollars",
                            shortName: "$50",
                            imgFull: "/game/images/chips/50-dollar.png",
                            imgThumb: "/game/images/chips/50-dollar-thumb.png",
                            qty: 1
                        }
                    ],
                    cards: [],
                    handRank: 0
                };

                /* Clear all previous card data */
                for (p = 0; p < table.players.length; p++) {
                    table.players[p].cards.length = 0;
                }

                /* Add the player to the table */
                table.players.push(this.player);

                /* Clear the new player object, since the player is now added to the table */
                this.player = {};

                /* Re-shuffle the deck since we're adding a new player */
                shuffledDeck = shuffle(cards);
            };
        } ])


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


    /* Begin function to deal cards to each player */
    function dealCards(players) {
        /* Clear all previous card data */

        for (p = 0; p < table.players.length; p++) {
            table.players[p].cards.length = 0;
        }

        /* Set initial seat/card values */
        var seat = 0;
        var card = 0;

        /* Iterate through each player */
        for (var i = 0; i < table.players.length * 2; i++) {

            /* Assign current player's card position in the deck */
            table.players[seat].cards.push(table.shuffledDeck[0]);
            table.shuffledDeck.splice(0, 1);

            /* Move to the next player/seat */
            seat++;

            /* Check to see if we've reached the last player */
            if (i == table.players.length - 1) {
                /* Change player/seat back to the first player to deal the second round of cards */
                seat = 0;
                /* Change the card we're dealing to the second of the player's hole cards */
                card++;
            }
        }

        /* Return the updated players object */
        return players;
    };
    /* End function to deal cards to each player */


    /* Begin function to deal the flop */
    this.dealBoard = function (players, cards, qty) {
        /* "Burn" the next card */
        table.shuffledDeck.splice(0, 1);

        for (var x = 1; x < qty + 1; x++) {
            /* Add the card to the board */
            cards.push(table.shuffledDeck[0]);

            /* Remove the card from the shuffled deck */
            table.shuffledDeck.splice(0, 1);
        }

        /* Return the flop */
        return cards;

    };
    /* End function to deal the flop */



    var sort_by = function (field, reverse, primer) {
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
        hand = [];

        /* Add the player's hole cards and cards from the board to the hand object */
        hand.push(player.cards[0]);
        hand.push(player.cards[1]);
        for (var i = 0; i < cards.length; i++) { hand.push(cards[i]); }

        /* Sort hand in order of value, lowest to highest */
        hand.sort(sort_by('value', false, parseInt));


        var strFlush = false;
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

        /* Set current cardsToStraight as 1, since you're ALWAYS at least 1 card to a straight */
        var cardsToStraight = 1;

        var matches = 0;
        var z = 0;

        /* Iterate through all of the player's cards */
        for (card = 0; card < hand.length; card++) {

            /* Check to see which suit this card is, and add to the total number of that suit */
            switch (hand[card].suit) {
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
                /* Set previous card */
                var previousCard = card - 1;

                /* Find out how many cards the player has to a straight */
                if (hand[previousCard].value == (hand[card].value - 1)) {
                    /* Add 1 to cards to straight before checking if we have one, and set to true if we do */
                    if (++cardsToStraight >= 5) { straight = true; }
                } else { cardsToStraight = 1; } /* This card isn't part of the straight, so reset the count */
            }

        } /* End for loop iterating through current hand */


        /* Check for four of a kind */
        /* Add my altered version of the below four of a kind check */

        /* Check for fours */
        for (var i = 0; i < 4; i++) {
            k = i;

            while (k < i + 3 && hand[k].value == hand[k + 1].value) {
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

                while (k < i + 2 && hand[k].value == hand[nextCard].value) {
                    k++;
                    nextCard = k + 1;

                    if (k == i + 2) {
                        three = true;

                        if (i == 0) {
                            if (hand[3].value == hand[4].value || hand[4].value == hand[5].value || hand[5].value == hand[6].value) { full = true; }
                        } else if (i == 1) {
                            if (hand[4].value == hand[5].value || hand[5].value == hand[6].value) { full = true; }
                        } else if (i == 2) {
                            if (hand[0].value == hand[1].value || hand[5].value == hand[6].value) { full = true; }
                        } else {
                            if (hand[0].value == hand[1].value || hand[1].value == hand[2].value) { full = true; }
                        }
                    }
                }
            }
        }

        /* If we've found something so far, go ahead and return the hand rank */
        if (straight && flush) { return 9; }
        else if (four) { return 8; }
        else if (full) { return 7; }
        else if (flush) { return 6; }
        else if (straight) { return 5; }
        else if (three) { return 4; }


        /* Check for pairs */
        for (k = 0; k < 6; k++) {
            if (hand[k].value == hand[k + 1].value) { pairs++; }
        }


        if (pairs >= 2) { return 3; }
        else if (pairs) { return 2; }
        else { return 1; }
    }


    /* Begin function to find out who won */
    function calculateWinner(players, cards) {
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

    function hasPair(cards) {

    }

    /* ^^^ ^^^ ^^^ Hand Hierarchy/Winner Code and Logic ^^^ ^^^ ^^^ */





    /* Begin "people" array, containing all player data */
    var people = [
            {
                name: 'Melanie',
                money: 200,
                chips: [
                    {
                        amt: 1,
                        name: "1 Dollars",
                        shortName: "$1",
                        imgFull: "/game/images/chips/1-dollar.png",
                        imgThumb: "/game/images/chips/1-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 2,
                        name: "2 Dollars",
                        shortName: "$2",
                        imgFull: "/game/images/chips/2-dollar.png",
                        imgThumb: "/game/images/chips/2-dollar-thumb.png",
                        qty: 20
                    },
                    {
                        amt: 5,
                        name: "5 Dollars",
                        shortName: "$5",
                        imgFull: "/game/images/chips/5-dollar.png",
                        imgThumb: "/game/images/chips/5-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 10,
                        name: "10 Dollars",
                        shortName: "$10",
                        imgFull: "/game/images/chips/10-dollar.png",
                        imgThumb: "/game/images/chips/10-dollar-thumb.png",
                        qty: 5
                    },
                    {
                        amt: 50,
                        name: "50 Dollars",
                        shortName: "$50",
                        imgFull: "/game/images/chips/50-dollar.png",
                        imgThumb: "/game/images/chips/50-dollar-thumb.png",
                        qty: 1
                    }
                ],
                cards: [],
                handRank: 0
            },
            {
                name: 'Alison',
                money: 200,
                chips: [
                    {
                        amt: 1,
                        name: "1 Dollars",
                        shortName: "$1",
                        imgFull: "/game/images/chips/1-dollar.png",
                        imgThumb: "/game/images/chips/1-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 2,
                        name: "2 Dollars",
                        shortName: "$2",
                        imgFull: "/game/images/chips/2-dollar.png",
                        imgThumb: "/game/images/chips/2-dollar-thumb.png",
                        qty: 20
                    },
                    {
                        amt: 5,
                        name: "5 Dollars",
                        shortName: "$5",
                        imgFull: "/game/images/chips/5-dollar.png",
                        imgThumb: "/game/images/chips/5-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 10,
                        name: "10 Dollars",
                        shortName: "$10",
                        imgFull: "/game/images/chips/10-dollar.png",
                        imgThumb: "/game/images/chips/10-dollar-thumb.png",
                        qty: 5
                    },
                    {
                        amt: 50,
                        name: "50 Dollars",
                        shortName: "$50",
                        imgFull: "/game/images/chips/50-dollar.png",
                        imgThumb: "/game/images/chips/50-dollar-thumb.png",
                        qty: 1
                    }
                ],
                cards: [],
                handRank: 0
            },
            {
                name: 'Krish',
                money: 200,
                chips: [
                    {
                        amt: 1,
                        name: "1 Dollars",
                        shortName: "$1",
                        imgFull: "/game/images/chips/1-dollar.png",
                        imgThumb: "/game/images/chips/1-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 2,
                        name: "2 Dollars",
                        shortName: "$2",
                        imgFull: "/game/images/chips/2-dollar.png",
                        imgThumb: "/game/images/chips/2-dollar-thumb.png",
                        qty: 20
                    },
                    {
                        amt: 5,
                        name: "5 Dollars",
                        shortName: "$5",
                        imgFull: "/game/images/chips/5-dollar.png",
                        imgThumb: "/game/images/chips/5-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 10,
                        name: "10 Dollars",
                        shortName: "$10",
                        imgFull: "/game/images/chips/10-dollar.png",
                        imgThumb: "/game/images/chips/10-dollar-thumb.png",
                        qty: 5
                    },
                    {
                        amt: 50,
                        name: "50 Dollars",
                        shortName: "$50",
                        imgFull: "/game/images/chips/50-dollar.png",
                        imgThumb: "/game/images/chips/50-dollar-thumb.png",
                        qty: 1
                    }
                ],
                cards: [],
                handRank: 0
            },
            {
                name: 'Lauren',
                money: 200,
                chips: [
                    {
                        amt: 1,
                        name: "1 Dollars",
                        shortName: "$1",
                        imgFull: "/game/images/chips/1-dollar.png",
                        imgThumb: "/game/images/chips/1-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 2,
                        name: "2 Dollars",
                        shortName: "$2",
                        imgFull: "/game/images/chips/2-dollar.png",
                        imgThumb: "/game/images/chips/2-dollar-thumb.png",
                        qty: 20
                    },
                    {
                        amt: 5,
                        name: "5 Dollars",
                        shortName: "$5",
                        imgFull: "/game/images/chips/5-dollar.png",
                        imgThumb: "/game/images/chips/5-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 10,
                        name: "10 Dollars",
                        shortName: "$10",
                        imgFull: "/game/images/chips/10-dollar.png",
                        imgThumb: "/game/images/chips/10-dollar-thumb.png",
                        qty: 5
                    },
                    {
                        amt: 50,
                        name: "50 Dollars",
                        shortName: "$50",
                        imgFull: "/game/images/chips/50-dollar.png",
                        imgThumb: "/game/images/chips/50-dollar-thumb.png",
                        qty: 1
                    }
                ],
                cards: [],
                handRank: 0
            },
            {
                name: 'Britney',
                money: 200,
                chips: [
                    {
                        amt: 1,
                        name: "1 Dollars",
                        shortName: "$1",
                        imgFull: "/game/images/chips/1-dollar.png",
                        imgThumb: "/game/images/chips/1-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 2,
                        name: "2 Dollars",
                        shortName: "$2",
                        imgFull: "/game/images/chips/2-dollar.png",
                        imgThumb: "/game/images/chips/2-dollar-thumb.png",
                        qty: 20
                    },
                    {
                        amt: 5,
                        name: "5 Dollars",
                        shortName: "$5",
                        imgFull: "/game/images/chips/5-dollar.png",
                        imgThumb: "/game/images/chips/5-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 10,
                        name: "10 Dollars",
                        shortName: "$10",
                        imgFull: "/game/images/chips/10-dollar.png",
                        imgThumb: "/game/images/chips/10-dollar-thumb.png",
                        qty: 5
                    },
                    {
                        amt: 50,
                        name: "50 Dollars",
                        shortName: "$50",
                        imgFull: "/game/images/chips/50-dollar.png",
                        imgThumb: "/game/images/chips/50-dollar-thumb.png",
                        qty: 1
                    }
                ],
                cards: [],
                handRank: 0
            },
            {
                name: 'Vien',
                money: 200,
                chips: [
                    {
                        amt: 1,
                        name: "1 Dollars",
                        shortName: "$1",
                        imgFull: "/game/images/chips/1-dollar.png",
                        imgThumb: "/game/images/chips/1-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 2,
                        name: "2 Dollars",
                        shortName: "$2",
                        imgFull: "/game/images/chips/2-dollar.png",
                        imgThumb: "/game/images/chips/2-dollar-thumb.png",
                        qty: 20
                    },
                    {
                        amt: 5,
                        name: "5 Dollars",
                        shortName: "$5",
                        imgFull: "/game/images/chips/5-dollar.png",
                        imgThumb: "/game/images/chips/5-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 10,
                        name: "10 Dollars",
                        shortName: "$10",
                        imgFull: "/game/images/chips/10-dollar.png",
                        imgThumb: "/game/images/chips/10-dollar-thumb.png",
                        qty: 5
                    },
                    {
                        amt: 50,
                        name: "50 Dollars",
                        shortName: "$50",
                        imgFull: "/game/images/chips/50-dollar.png",
                        imgThumb: "/game/images/chips/50-dollar-thumb.png",
                        qty: 1
                    }
                ],
                cards: [],
                handRank: 0
            },
            {
                name: 'Alex',
                money: 200,
                chips: [
                    {
                        amt: 1,
                        name: "1 Dollars",
                        shortName: "$1",
                        imgFull: "/game/images/chips/1-dollar.png",
                        imgThumb: "/game/images/chips/1-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 2,
                        name: "2 Dollars",
                        shortName: "$2",
                        imgFull: "/game/images/chips/2-dollar.png",
                        imgThumb: "/game/images/chips/2-dollar-thumb.png",
                        qty: 20
                    },
                    {
                        amt: 5,
                        name: "5 Dollars",
                        shortName: "$5",
                        imgFull: "/game/images/chips/5-dollar.png",
                        imgThumb: "/game/images/chips/5-dollar-thumb.png",
                        qty: 10
                    },
                    {
                        amt: 10,
                        name: "10 Dollars",
                        shortName: "$10",
                        imgFull: "/game/images/chips/10-dollar.png",
                        imgThumb: "/game/images/chips/10-dollar-thumb.png",
                        qty: 5
                    },
                    {
                        amt: 50,
                        name: "50 Dollars",
                        shortName: "$50",
                        imgFull: "/game/images/chips/50-dollar.png",
                        imgThumb: "/game/images/chips/50-dollar-thumb.png",
                        qty: 1
                    }
                ],
                cards: [],
                handRank: 0
            }
    ];
    /* End "people" array, containing all player data */

    /* Begin "cards" array, containing all poker card/deck data */
    var allCards = [
        {
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 2,
            imgFull: "/game/images/cards/2-hearts.png",
            imgMid: "/game/images/cards/2-hearts-mid.png",
            imgThumb: "/game/images/cards/2-hearts-thumb.png"
        },
        {
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 3,
            imgFull: "/game/images/cards/3-hearts.png",
            imgMid: "/game/images/cards/3-hearts-mid.png",
            imgThumb: "/game/images/cards/3-hearts-thumb.png"
        },
        {
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 4,
            imgFull: "/game/images/cards/4-hearts.png",
            imgMid: "/game/images/cards/4-hearts-mid.png",
            imgThumb: "/game/images/cards/4-hearts-thumb.png"
        },
        {
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 5,
            imgFull: "/game/images/cards/5-hearts.png",
            imgMid: "/game/images/cards/5-hearts-mid.png",
            imgThumb: "/game/images/cards/5-hearts-thumb.png"
        },
        {
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 6,
            imgFull: "/game/images/cards/6-hearts.png",
            imgMid: "/game/images/cards/6-hearts-mid.png",
            imgThumb: "/game/images/cards/6-hearts-thumb.png"
        },
        {
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 7,
            imgFull: "/game/images/cards/7-hearts.png",
            imgMid: "/game/images/cards/7-hearts-mid.png",
            imgThumb: "/game/images/cards/7-hearts-thumb.png"
        },
        {
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 8,
            imgFull: "/game/images/cards/8-hearts.png",
            imgMid: "/game/images/cards/8-hearts-mid.png",
            imgThumb: "/game/images/cards/8-hearts-thumb.png"
        },
        {
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 9,
            imgFull: "/game/images/cards/9-hearts.png",
            imgMid: "/game/images/cards/9-hearts-mid.png",
            imgThumb: "/game/images/cards/9-hearts-thumb.png"
        },
        {
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 10,
            imgFull: "/game/images/cards/10-hearts.png",
            imgMid: "/game/images/cards/10-hearts-mid.png",
            imgThumb: "/game/images/cards/10-hearts-thumb.png"
        },
        {
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 11,
            imgFull: "/game/images/cards/J-hearts.png",
            imgMid: "/game/images/cards/J-hearts-mid.png",
            imgThumb: "/game/images/cards/J-hearts-thumb.png"
        },
        {
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 12,
            imgFull: "/game/images/cards/Q-hearts.png",
            imgMid: "/game/images/cards/Q-hearts-mid.png",
            imgThumb: "/game/images/cards/Q-hearts-thumb.png"
        },
        {
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 13,
            imgFull: "/game/images/cards/K-hearts.png",
            imgMid: "/game/images/cards/K-hearts-mid.png",
            imgThumb: "/game/images/cards/K-hearts-thumb.png"
        },
        {
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "Hearts",
            shortsuit: '♥',
            suitVal: 14,
            imgFull: "/game/images/cards/A-hearts.png",
            imgMid: "/game/images/cards/A-hearts-mid.png",
            imgThumb: "/game/images/cards/A-hearts-thumb.png"
        },
        {
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 2,
            imgFull: "/game/images/cards/2-diamonds.png",
            imgMid: "/game/images/cards/2-diamonds-mid.png",
            imgThumb: "/game/images/cards/2-diamonds-thumb.png"
        },
        {
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 3,
            imgFull: "/game/images/cards/3-diamonds.png",
            imgMid: "/game/images/cards/3-diamonds-mid.png",
            imgThumb: "/game/images/cards/3-diamonds-thumb.png"
        },
        {
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 4,
            imgFull: "/game/images/cards/4-diamonds.png",
            imgMid: "/game/images/cards/4-diamonds-mid.png",
            imgThumb: "/game/images/cards/4-diamonds-thumb.png"
        },
        {
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 5,
            imgFull: "/game/images/cards/5-diamonds.png",
            imgMid: "/game/images/cards/5-diamonds-mid.png",
            imgThumb: "/game/images/cards/5-diamonds-thumb.png"
        },
        {
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 6,
            imgFull: "/game/images/cards/6-diamonds.png",
            imgMid: "/game/images/cards/6-diamonds-mid.png",
            imgThumb: "/game/images/cards/6-diamonds-thumb.png"
        },
        {
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 7,
            imgFull: "/game/images/cards/7-diamonds.png",
            imgMid: "/game/images/cards/7-diamonds-mid.png",
            imgThumb: "/game/images/cards/7-diamonds-thumb.png"
        },
        {
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 8,
            imgFull: "/game/images/cards/8-diamonds.png",
            imgMid: "/game/images/cards/8-diamonds-mid.png",
            imgThumb: "/game/images/cards/8-diamonds-thumb.png"
        },
        {
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 9,
            imgFull: "/game/images/cards/9-diamonds.png",
            imgMid: "/game/images/cards/9-diamonds-mid.png",
            imgThumb: "/game/images/cards/9-diamonds-thumb.png"
        },
        {
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 10,
            imgFull: "/game/images/cards/10-diamonds.png",
            imgMid: "/game/images/cards/10-diamonds-mid.png",
            imgThumb: "/game/images/cards/10-diamonds-thumb.png"
        },
        {
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 11,
            imgFull: "/game/images/cards/J-diamonds.png",
            imgMid: "/game/images/cards/J-diamonds-mid.png",
            imgThumb: "/game/images/cards/J-diamonds-thumb.png"
        },
        {
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 12,
            imgFull: "/game/images/cards/Q-diamonds.png",
            imgMid: "/game/images/cards/Q-diamonds-mid.png",
            imgThumb: "/game/images/cards/Q-diamonds-thumb.png"
        },
        {
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 13,
            imgFull: "/game/images/cards/K-diamonds.png",
            imgMid: "/game/images/cards/K-diamonds-mid.png",
            imgThumb: "/game/images/cards/K-diamonds-thumb.png"
        },
        {
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 14,
            imgFull: "/game/images/cards/A-diamonds.png",
            imgMid: "/game/images/cards/A-diamonds-mid.png",
            imgThumb: "/game/images/cards/A-diamonds-thumb.png"
        },
        {
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 2,
            imgFull: "/game/images/cards/2-spades.png",
            imgMid: "/game/images/cards/2-spades-mid.png",
            imgThumb: "/game/images/cards/2-spades-thumb.png"
        },
        {
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 3,
            imgFull: "/game/images/cards/3-spades.png",
            imgMid: "/game/images/cards/3-spades-mid.png",
            imgThumb: "/game/images/cards/3-spades-thumb.png"
        },
        {
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 4,
            imgFull: "/game/images/cards/4-spades.png",
            imgMid: "/game/images/cards/4-spades-mid.png",
            imgThumb: "/game/images/cards/4-spades-thumb.png"
        },
        {
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 5,
            imgFull: "/game/images/cards/5-spades.png",
            imgMid: "/game/images/cards/5-spades-mid.png",
            imgThumb: "/game/images/cards/5-spades-thumb.png"
        },
        {
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 6,
            imgFull: "/game/images/cards/6-spades.png",
            imgMid: "/game/images/cards/6-spades-mid.png",
            imgThumb: "/game/images/cards/6-spades-thumb.png"
        },
        {
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 7,
            imgFull: "/game/images/cards/7-spades.png",
            imgMid: "/game/images/cards/7-spades-mid.png",
            imgThumb: "/game/images/cards/7-spades-thumb.png"
        },
        {
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 8,
            imgFull: "/game/images/cards/8-spades.png",
            imgMid: "/game/images/cards/8-spades-mid.png",
            imgThumb: "/game/images/cards/8-spades-thumb.png"
        },
        {
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 9,
            imgFull: "/game/images/cards/9-spades.png",
            imgMid: "/game/images/cards/9-spades-mid.png",
            imgThumb: "/game/images/cards/9-spades-thumb.png"
        },
        {
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 10,
            imgFull: "/game/images/cards/10-spades.png",
            imgMid: "/game/images/cards/10-spades-mid.png",
            imgThumb: "/game/images/cards/10-spades-thumb.png"
        },
        {
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 11,
            imgFull: "/game/images/cards/J-spades.png",
            imgMid: "/game/images/cards/J-spades-mid.png",
            imgThumb: "/game/images/cards/J-spades-thumb.png"
        },
        {
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 12,
            imgFull: "/game/images/cards/Q-spades.png",
            imgMid: "/game/images/cards/Q-spades-mid.png",
            imgThumb: "/game/images/cards/Q-spades-thumb.png"
        },
        {
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 13,
            imgFull: "/game/images/cards/K-spades.png",
            imgMid: "/game/images/cards/K-spades-mid.png",
            imgThumb: "/game/images/cards/K-spades-thumb.png"
        },
        {
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "Spades",
            shortsuit: '♠',
            suitVal: 14,
            imgFull: "/game/images/cards/A-spades.png",
            imgMid: "/game/images/cards/A-spades-mid.png",
            imgThumb: "/game/images/cards/A-spades-thumb.png"
        },
        {
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 2,
            imgFull: "/game/images/cards/2-clubs.png",
            imgMid: "/game/images/cards/2-clubs-mid.png",
            imgThumb: "/game/images/cards/2-clubs-thumb.png"
        },
        {
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 3,
            imgFull: "/game/images/cards/3-clubs.png",
            imgMid: "/game/images/cards/3-clubs-mid.png",
            imgThumb: "/game/images/cards/3-clubs-thumb.png"
        },
        {
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 4,
            imgFull: "/game/images/cards/4-clubs.png",
            imgMid: "/game/images/cards/4-clubs-mid.png",
            imgThumb: "/game/images/cards/4-clubs-thumb.png"
        },
        {
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 5,
            imgFull: "/game/images/cards/5-clubs.png",
            imgMid: "/game/images/cards/5-clubs-mid.png",
            imgThumb: "/game/images/cards/5-clubs-thumb.png"
        },
        {
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 6,
            imgFull: "/game/images/cards/6-clubs.png",
            imgMid: "/game/images/cards/6-clubs-mid.png",
            imgThumb: "/game/images/cards/6-clubs-thumb.png"
        },
        {
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 7,
            imgFull: "/game/images/cards/7-clubs.png",
            imgMid: "/game/images/cards/7-clubs-mid.png",
            imgThumb: "/game/images/cards/7-clubs-thumb.png"
        },
        {
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 8,
            imgFull: "/game/images/cards/8-clubs.png",
            imgMid: "/game/images/cards/8-clubs-mid.png",
            imgThumb: "/game/images/cards/8-clubs-thumb.png"
        },
        {
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 9,
            imgFull: "/game/images/cards/9-clubs.png",
            imgMid: "/game/images/cards/9-clubs-mid.png",
            imgThumb: "/game/images/cards/9-clubs-thumb.png"
        },
        {
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 10,
            imgFull: "/game/images/cards/10-clubs.png",
            imgMid: "/game/images/cards/10-clubs-mid.png",
            imgThumb: "/game/images/cards/10-clubs-thumb.png"
        },
        {
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 11,
            imgFull: "/game/images/cards/J-clubs.png",
            imgMid: "/game/images/cards/J-clubs-mid.png",
            imgThumb: "/game/images/cards/J-clubs-thumb.png"
        },
        {
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 12,
            imgFull: "/game/images/cards/Q-clubs.png",
            imgMid: "/game/images/cards/Q-clubs-mid.png",
            imgThumb: "/game/images/cards/Q-clubs-thumb.png"
        },
        {
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 13,
            imgFull: "/game/images/cards/K-clubs.png",
            imgMid: "/game/images/cards/K-clubs-mid.png",
            imgThumb: "/game/images/cards/K-clubs-thumb.png"
        },
        {
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "Clubs",
            shortsuit: '♣',
            suitVal: 14,
            imgFull: "/game/images/cards/A-clubs.png",
            imgMid: "/game/images/cards/A-clubs-mid.png",
            imgThumb: "/game/images/cards/A-clubs-thumb.png"
        }
    ];
    /* End "cards" array, containing all poker card/deck data */

    /* Begin "chips" array, containing all poker chip/money data */
    var chips = [
        {
            amt: 1,
            name: "1 Dollar",
            shortName: "$1",
            imgFull: "/game/images/chips/1-dollar.png",
            imgThumb: "/game/images/chips/1-dollar-thumb.png"
        },
        {
            amt: 2,
            name: "2 Dollar2",
            shortName: "$2",
            imgFull: "/game/images/chips/2-dollar.png",
            imgThumb: "/game/images/chips/2-dollar-thumb.png"
        },
        {
            amt: 5,
            name: "5 Dollars",
            shortName: "$5",
            imgFull: "/game/images/chips/5-dollar.png",
            imgThumb: "/game/images/chips/5-dollar-thumb.png"
        },
        {
            amt: 10,
            name: "10 Dollars",
            shortName: "$10",
            imgFull: "/game/images/chips/10-dollar.png",
            imgThumb: "/game/images/chips/10-dollar-thumb.png"
        },
        {
            amt: 50,
            name: "50 Dollars",
            shortName: "$50",
            imgFull: "/game/images/chips/50-dollar.png",
            imgThumb: "/game/images/chips/50-dollar-thumb.png"
        },
        {
            amt: 100,
            name: "100 Dollars",
            shortName: "$100",
            imgFull: "/game/images/chips/100-dollar.png",
            imgThumb: "/game/images/chips/100-dollar-thumb.png"
        },
        {
            amt: 500,
            name: "500 Dollars",
            shortName: "$500",
            imgFull: "/game/images/chips/500-dollar.png",
            imgThumb: "/game/images/chips/500-dollar-thumb.png"
        },
        {
            amt: 1000,
            name: "1000 Dollars",
            shortName: "$1000",
            imgFull: "/game/images/chips/1000-dollar.png",
            imgThumb: "/game/images/chips/1000-dollar-thumb.png"
        }
    ];

})();


