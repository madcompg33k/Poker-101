(function () {
    var app = angular.module('game', [])
        .controller('GameController', ['$scope', function ($scope) {

        } ])
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
                cards: []
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
    /* Controller to handle all card functionality and logic */
        .controller('CardController', ['$scope', function ($scope) {
            /* Initialize shuffledDeck and assign data to it */
            this.shuffledDeck = shuffle(cards);
            /* Create object to view in Firebug */
            shuffledDeck = this.shuffledDeck;

            /* Function to deal cards to each player */
            this.dealCards = function (players) {
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
        } ])
        .controller('BoardController', ['$scope', function ($scope) {
            this.board = {};
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
            imgFull: "/game/images/cards/2-diamond.png",
            imgThumb: "/game/images/cards/2-diamond-thumb.png"
        },
        {
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 3,
            imgFull: "/game/images/cards/3-diamond.png",
            imgThumb: "/game/images/cards/3-diamond-thumb.png"
        },
        {
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 4,
            imgFull: "/game/images/cards/4-diamond.png",
            imgThumb: "/game/images/cards/4-diamond-thumb.png"
        },
        {
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 5,
            imgFull: "/game/images/cards/5-diamond.png",
            imgThumb: "/game/images/cards/5-diamond-thumb.png"
        },
        {
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 6,
            imgFull: "/game/images/cards/6-diamond.png",
            imgThumb: "/game/images/cards/6-diamond-thumb.png"
        },
        {
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 7,
            imgFull: "/game/images/cards/7-diamond.png",
            imgThumb: "/game/images/cards/7-diamond-thumb.png"
        },
        {
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 8,
            imgFull: "/game/images/cards/8-diamond.png",
            imgThumb: "/game/images/cards/8-diamond-thumb.png"
        },
        {
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 9,
            imgFull: "/game/images/cards/9-diamond.png",
            imgThumb: "/game/images/cards/9-diamond-thumb.png"
        },
        {
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 10,
            imgFull: "/game/images/cards/10-diamond.png",
            imgThumb: "/game/images/cards/10-diamond-thumb.png"
        },
        {
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 11,
            imgFull: "/game/images/cards/J-diamond.png",
            imgThumb: "/game/images/cards/J-diamond-thumb.png"
        },
        {
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 12,
            imgFull: "/game/images/cards/Q-diamond.png",
            imgThumb: "/game/images/cards/Q-diamond-thumb.png"
        },
        {
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 13,
            imgFull: "/game/images/cards/K-diamond.png",
            imgThumb: "/game/images/cards/K-diamond-thumb.png"
        },
        {
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "Diamonds",
            shortsuit: '♦',
            suitVal: 14,
            imgFull: "/game/images/cards/A-diamond.png",
            imgThumb: "/game/images/cards/A-diamond-thumb.png"
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
            imgThumb: "/game/images/cards/A-clubs-thumb.png"
        }
    ];
    /* End "cards" array, containing all poker card/deck data */

})();


