(function () {
    var app = angular.module('game', [])
        .controller('GameController', ['$scope', function ($scope) {
            this.errorMessage = "";
            errorMessage = this.errorMessage;
        } ])
        /* Controller for all table-related things */
        .controller('TableController', ['$scope', function($scope) {
            this.table = {
                players: [
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
                        cards: []
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
                        cards: []
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
                        cards: []
                    }
                ],
                cards: cards,
                shuffledDeck: shuffle(cards),
                chips: chips
            }
        }])
    /* Controller for all players */
        .controller('PlayersController', ['$scope', function ($scope) {
            /* Initialize Players and assign data to it */
            this.players = people;
            /* Create object to view in Firebug */
            players = this.players;
        } ])
    /* Controller for add/modifying an individual player */
        .controller('PlayerController', ['$scope', function ($scope) {
            /* Create an empty player object */
            this.player = {
                name: '',
                money: 100,
                cards: [],
                chips: []
            };

            this.addPlayer = function (players) {
                /* Clear all previous card data */
                for (p = 0; p < players.length; p++) {
                    players[p].cards.length = 0;
                }
                shuffledDeck = shuffle(cards);
                players.push(this.player);
                this.player = {};
            };
        } ])
    /* Controller to handle all chip/money functionality and logic */
        .controller('ChipController', ['$scope', function ($scope) {
            this.chips = chips;
        } ])
    /* Controller to handle all card functionality and logic */
        .controller('CardController', ['$scope', function ($scope) {
            /* Initialize shuffledDeck and assign data to it */
            this.shuffledDeck = shuffle(cards);

            /* Create object to view in Firebug */
            shuffledDeck = this.shuffledDeck;

            /* Function to deal cards to each player */
            this.dealCards = function (players) {
                /* Clear all previous card data */
                for (p = 0; p < players.length; p++) {
                    players[p].cards.length = 0;
                }

                /* Re-Shuffle Cards */
                this.shuffledDeck = shuffle(cards);

                /* Set initial seat/card values */
                var seat = 0;
                var card = 0;

                /* Iterate through each player */
                for (var i = 0; i < players.length * 2; i++) {

                    /* Assign current player's card position in the deck */
                    players[seat].cards.push(this.shuffledDeck[i]);

                    /* Move to the next player/seat */
                    seat++;

                    /* Check to see if we've reached the last player */
                    if (i == players.length - 1) {
                        /* Change player/seat back to the first player to deal the second round of cards */
                        seat = 0;
                        /* Change the card we're dealing to the second of the player's hole cards */
                        card++;
                    }
                }
            };

            /* Deal the "flop", while "burning" the card immediately after the last one dealt to a player */
            this.dealFlop = function (players) {

                if (players.length) {
                    if (players[0].cards.length) {
                        board.flop.push(this.shuffledDeck[(players.length * 2) + 1]);
                        board.flop.push(this.shuffledDeck[(players.length * 2) + 2]);
                        board.flop.push(this.shuffledDeck[(players.length * 2) + 3]);
                    } else {
                        errorMessage = "You cannot play the flop before players have cards.";
                    }
                } else {
                    errorMessage = "You cannot play the flop when there are no players.";
                }

            };

            /* Deal the "turn", while "burning" the card immediately after the last card of the flop */
            this.dealTurn = function (players) {

                if (players.length) {
                    if (players[0].cards.length) {
                        board.turn = this.shuffledDeck[(players.length * 2) + 5];
                    } else {
                        errorMessage = "You cannot play the turn before players have cards.";
                    }
                } else {
                    errorMessage = "You cannot play the turn when there are no players.";
                }

            };

            /* Deal the "river", while "burning" the card immediately after the turn */
            this.dealRiver = function (players) {

                if (players.length) {
                    if (players[0].cards.length) {
                        board.river = this.shuffledDeck[(players.length * 2) + 7];
                    } else {
                        errorMessage = "You cannot play the turn before players have cards.";
                    }
                } else {
                    errorMessage = "You cannot play the turn when there are no players.";
                }

            };
        } ])
        .controller('BoardController', ['$scope', function ($scope) {
            this.board = {
                flop: [],
                turn: {},
                river: {},
                pot: 50
            }
            board = this.board;

            this.clearBoard = function () {
                this.board.cards.length = 0;
            };
        } ]);


    /* Begin function to randomize/shuffle the "deck" array */
    function shuffle(deck) {
        var i = deck.length, j, tempi, tempj;
        if (i == 0) return false;
        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = deck[i];
            tempj = deck[j];
            deck[i] = tempj;
            deck[j] = tempi;
        }
        return deck;
    }
    /* End function to randomize/shuffle the "deck" array */

    /* Begin "people" array, containing all player data */
    var people = [
        {
            name: 'Melanie',
            money: 100,
            cards: []
        },
        {
            name: 'Alison',
            money: 100,
            cards: []
        },
        {
            name: 'Krish',
            money: 100,
            cards: []
        }
    ];
    /* End "people" array, containing all player data */

    /* Begin "cards" array, containing all poker card/deck data */
    var cards = [
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


