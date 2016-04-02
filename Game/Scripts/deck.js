(function () {
    var app = angular.module('cardGame', [])
        .controller('GameController', ['$scope', function ($scope) {
            this.deck = cards;
            this.shuffledDeck = shuffle(this.deck);
            shuffledDeck = this.shuffledDeck;
        } ])
        .controller('PlayerController', ['$scope', function ($scope) {
            //this.players = people;
            this.players = dealHoleCards(people);
        } ]);

    function dealHoleCards(people) {
        /* Set initial seat/card values */
        var seat = 0;
        var card = 0;

        /* Iterate through each player */
        for (var i = 0; i < people.length * 2; i++) {

            /* Assign current player's card position in the deck */
            people[seat].holeCards[card].card = i;

            /* Move to the next player/seat */
            seat++;

            /* Check to see if we've reached the last player */
            if (i == people.length - 1) {
                /* Change player/seat back to the first player to deal the second round of cards */
                seat = 0;
                /* Change the card we're dealing to the second of the player's hole cards */
                card++;
            }
        }

        /* Return the new array */
        return people;
    }

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

    var people = [
        {
            name: 'Melanie',
            money: 100,
            holeCards: [
                { card: -1 },
                { card: -1 }
            ]
        },
        {
            name: 'Alison',
            money: 100,
            holeCards: [
                { card: -1 },
                { card: -1 }
            ]
        }
    ];

    /* Begin "cards" array, containing all poker card/deck data */
    var cards = [
        {
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "Hearts",
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
            suitVal: 14,
            imgFull: "/game/images/cards/A-clubs.png",
            imgThumb: "/game/images/cards/A-clubs-thumb.png"
        }
    ];
    /* End "cards" array, containing all poker card/deck data */

})();


