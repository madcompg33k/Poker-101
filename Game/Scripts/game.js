(function () {
    var app = angular.module('game', ['players', 'table'])
    /* Controller to handle all functionality of the overall game */
    .controller('GameController', ['$http', '$scope', function ($http, $scope) {
        $scope.game = this;
        $scope.game.deck = {
            cards: allCards,
            imgPath: "/Game/Images/decks/",
            basePercentPerCard: (100 / 52),
            estPercentPerCard: (100 / 50)
        }
        $scope.game.players = testPlayers;
        $scope.errorMessage = "";
        $scope.getNumber = function (num) { return new Array(num); }
        $scope.handType = {
            highCard: {
                rank: 0,
                name: 'High card',
                cards: []
            },
            pair: {
                rank: 1,
                name: 'A pair',
                cards: []
            },
            twoPair: {
                rank: 2,
                name: 'Two pair',
                cards: []
            },
            threeOfAKind: {
                rank: 3,
                name: 'Three of a kind',
                cards: []
            },
            straight: {
                rank: 4,
                name: 'Straight',
                cards: []
            },
            flush: {
                rank: 5,
                name: 'Flush',
                cards: []
            },
            fullHouse: {
                rank: 6,
                name: 'Full house',
                cards: []
            },
            fourOfAKind: {
                rank: 7,
                name: 'Four of a kind',
                cards: []
            },
            straightFlush: {
                rank: 8,
                name: 'Straight flush',
                cards: []
            }
        };
        /* Add DOM element for review in testing environment only */
        game = $scope.game;
        handType = $scope.handType;

        /* Add later */
        /*
        var learningObject = {
            cards: [],
            highCard: {
                outs: [],
                rank: 0,
                name: 'High card',
                percentToHand: 0
            },
            pair: {
                outs: [],
                rank: 1,
                name: 'A pair',
                percentToHand: 0
            },
            twoPair: {
                outs: [],
                rank: 2,
                name: 'Two pair',
                percentToHand: 0
            },
            threeOfAKind: {
                outs: [],
                rank: 3,
                name: 'Three of a kind',
                percentToHand: 0
            },
            straight: {
                outs: [],
                rank: 4,
                name: 'Straight',
                percentToHand: 0
            },
            flush: {
                outs: [],
                rank: 5,
                name: 'Flush',
                percentToHand: 0
            },
            fullHouse: {
                outs: [],
                rank: 6,
                name: 'Full house',
                percentToHand: 0
            },
            fourOfAKind: {
                outs: [],
                rank: 7,
                name: 'Four of a kind',
                percentToHand: 0
            },
            straightFlush: {
                outs: [],
                rank: 8,
                name: 'Straight flush',
                percentToHand: 0
            }
        };

        for (var i = 0; i < $scope.game.players.length; i++) {
            $scope.game.players[i].learning = angular.copy(learningObject);
        }
        */
    } ])
    .filter('bet', function () {
        return function (player, betAmount) {
            if (!player) { return; }
            return 0;
        };
    })
    .filter('unsafe', function ($sce) { return $sce.trustAsHtml; })
    .directive('aCard', function () {
        return {
            restrict: 'E',
            templateUrl: './Directives/a-card.html',
            controller: function () {

            },
            controllerAs: 'aCard'
        }
    });


    var testPlayers = [
        {
            name: "Player 1",
            seat: 0,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "pc"
        },
        {
            name: "Melanie",
            seat: 1,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        },
        {
            name: "Alison",
            seat: 2,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        },
        {
            name: "Krish",
            seat: 3,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        },
        {
            name: "Lauren",
            seat: 4,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        },
        {
            name: "Britney",
            seat: 5,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        },
        {
            name: "Vien",
            seat: 6,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        },
        {
            name: "Alex",
            seat: 7,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        },
        {
            name: "Jess",
            seat: 8,
            money: 200,
            chips: [],
            isDealer: false,
            isSmallBlind: false,
            isBigBlind: false,
            bet: { amt: 0 },
            holeCards: [],
            playerType: "npc"
        }
    ]

    /* Begin "cards" array, containing all poker card/deck data */
    var allCards = [
        {
            cardID: 0,
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "2-hearts.png",
            imgMid: "2-hearts-mid.png",
            imgThumb: "2-hearts-thumb.png"
        },
        {
            cardID: 1,
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "3-hearts.png",
            imgMid: "3-hearts-mid.png",
            imgThumb: "3-hearts-thumb.png"
        },
        {
            cardID: 2,
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "4-hearts.png",
            imgMid: "4-hearts-mid.png",
            imgThumb: "4-hearts-thumb.png"
        },
        {
            cardID: 3,
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "5-hearts.png",
            imgMid: "5-hearts-mid.png",
            imgThumb: "5-hearts-thumb.png"
        },
        {
            cardID: 4,
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "6-hearts.png",
            imgMid: "6-hearts-mid.png",
            imgThumb: "6-hearts-thumb.png"
        },
        {
            cardID: 5,
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "7-hearts.png",
            imgMid: "7-hearts-mid.png",
            imgThumb: "7-hearts-thumb.png"
        },
        {
            cardID: 6,
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "8-hearts.png",
            imgMid: "8-hearts-mid.png",
            imgThumb: "8-hearts-thumb.png"
        },
        {
            cardID: 7,
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "9-hearts.png",
            imgMid: "9-hearts-mid.png",
            imgThumb: "9-hearts-thumb.png"
        },
        {
            cardID: 8,
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "10-hearts.png",
            imgMid: "10-hearts-mid.png",
            imgThumb: "10-hearts-thumb.png"
        },
        {
            cardID: 9,
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "J-hearts.png",
            imgMid: "J-hearts-mid.png",
            imgThumb: "J-hearts-thumb.png"
        },
        {
            cardID: 10,
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "Q-hearts.png",
            imgMid: "Q-hearts-mid.png",
            imgThumb: "Q-hearts-thumb.png"
        },
        {
            cardID: 11,
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "K-hearts.png",
            imgMid: "K-hearts-mid.png",
            imgThumb: "K-hearts-thumb.png"
        },
        {
            cardID: 12,
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "hearts",
            shortsuit: '♥',
            suitSVG: "<svg class='icon icon-heart'><use xlink:href='#icon-heart'></use></svg>",
            suitColor: 'red',
            suitVal: 1,
            imgFull: "A-hearts.png",
            imgMid: "A-hearts-mid.png",
            imgThumb: "A-hearts-thumb.png"
        },
        {
            cardID: 13,
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "2-diamonds.png",
            imgMid: "2-diamonds-mid.png",
            imgThumb: "2-diamonds-thumb.png"
        },
        {
            cardID: 14,
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "3-diamonds.png",
            imgMid: "3-diamonds-mid.png",
            imgThumb: "3-diamonds-thumb.png"
        },
        {
            cardID: 15,
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "4-diamonds.png",
            imgMid: "4-diamonds-mid.png",
            imgThumb: "4-diamonds-thumb.png"
        },
        {
            cardID: 16,
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "5-diamonds.png",
            imgMid: "5-diamonds-mid.png",
            imgThumb: "5-diamonds-thumb.png"
        },
        {
            cardID: 17,
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "6-diamonds.png",
            imgMid: "6-diamonds-mid.png",
            imgThumb: "6-diamonds-thumb.png"
        },
        {
            cardID: 18,
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "7-diamonds.png",
            imgMid: "7-diamonds-mid.png",
            imgThumb: "7-diamonds-thumb.png"
        },
        {
            cardID: 19,
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "8-diamonds.png",
            imgMid: "8-diamonds-mid.png",
            imgThumb: "8-diamonds-thumb.png"
        },
        {
            cardID: 20,
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "9-diamonds.png",
            imgMid: "9-diamonds-mid.png",
            imgThumb: "9-diamonds-thumb.png"
        },
        {
            cardID: 21,
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "10-diamonds.png",
            imgMid: "10-diamonds-mid.png",
            imgThumb: "10-diamonds-thumb.png"
        },
        {
            cardID: 22,
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "J-diamonds.png",
            imgMid: "J-diamonds-mid.png",
            imgThumb: "J-diamonds-thumb.png"
        },
        {
            cardID: 23,
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "Q-diamonds.png",
            imgMid: "Q-diamonds-mid.png",
            imgThumb: "Q-diamonds-thumb.png"
        },
        {
            cardID: 24,
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "K-diamonds.png",
            imgMid: "K-diamonds-mid.png",
            imgThumb: "K-diamonds-thumb.png"
        },
        {
            cardID: 25,
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "diamonds",
            shortsuit: '♦',
            suitSVG: "<svg class='icon icon-diamonds'><use xlink:href='#icon-diamonds'></use></svg>",
            suitColor: 'red',
            suitVal: 2,
            imgFull: "A-diamonds.png",
            imgMid: "A-diamonds-mid.png",
            imgThumb: "A-diamonds-thumb.png"
        },
        {
            cardID: 26,
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "2-spades.png",
            imgMid: "2-spades-mid.png",
            imgThumb: "2-spades-thumb.png"
        },
        {
            cardID: 27,
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "3-spades.png",
            imgMid: "3-spades-mid.png",
            imgThumb: "3-spades-thumb.png"
        },
        {
            cardID: 28,
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "4-spades.png",
            imgMid: "4-spades-mid.png",
            imgThumb: "4-spades-thumb.png"
        },
        {
            cardID: 29,
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "5-spades.png",
            imgMid: "5-spades-mid.png",
            imgThumb: "5-spades-thumb.png"
        },
        {
            cardID: 30,
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "6-spades.png",
            imgMid: "6-spades-mid.png",
            imgThumb: "6-spades-thumb.png"
        },
        {
            cardID: 31,
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "7-spades.png",
            imgMid: "7-spades-mid.png",
            imgThumb: "7-spades-thumb.png"
        },
        {
            cardID: 32,
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "8-spades.png",
            imgMid: "8-spades-mid.png",
            imgThumb: "8-spades-thumb.png"
        },
        {
            cardID: 33,
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "9-spades.png",
            imgMid: "9-spades-mid.png",
            imgThumb: "9-spades-thumb.png"
        },
        {
            cardID: 34,
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "10-spades.png",
            imgMid: "10-spades-mid.png",
            imgThumb: "10-spades-thumb.png"
        },
        {
            cardID: 35,
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "J-spades.png",
            imgMid: "J-spades-mid.png",
            imgThumb: "J-spades-thumb.png"
        },
        {
            cardID: 36,
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "Q-spades.png",
            imgMid: "Q-spades-mid.png",
            imgThumb: "Q-spades-thumb.png"
        },
        {
            cardID: 37,
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "K-spades.png",
            imgMid: "K-spades-mid.png",
            imgThumb: "K-spades-thumb.png"
        },
        {
            cardID: 38,
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "spades",
            shortsuit: '♠',
            suitSVG: "<svg class='icon icon-spades'><use xlink:href='#icon-spades'></use></svg>",
            suitColor: 'black',
            suitVal: 3,
            imgFull: "A-spades.png",
            imgMid: "A-spades-mid.png",
            imgThumb: "A-spades-thumb.png"
        },
        {
            cardID: 39,
            value: 2,
            name: 'Two',
            shortname: "2",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "2-clubs.png",
            imgMid: "2-clubs-mid.png",
            imgThumb: "2-clubs-thumb.png"
        },
        {
            cardID: 40,
            value: 3,
            name: 'Three',
            shortname: "3",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "3-clubs.png",
            imgMid: "3-clubs-mid.png",
            imgThumb: "3-clubs-thumb.png"
        },
        {
            cardID: 41,
            value: 4,
            name: 'Four',
            shortname: "4",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "4-clubs.png",
            imgMid: "4-clubs-mid.png",
            imgThumb: "4-clubs-thumb.png"
        },
        {
            cardID: 42,
            value: 5,
            name: 'Five',
            shortname: "5",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "5-clubs.png",
            imgMid: "5-clubs-mid.png",
            imgThumb: "5-clubs-thumb.png"
        },
        {
            cardID: 43,
            value: 6,
            name: 'Six',
            shortname: "6",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "6-clubs.png",
            imgMid: "6-clubs-mid.png",
            imgThumb: "6-clubs-thumb.png"
        },
        {
            cardID: 44,
            value: 7,
            name: 'Seven',
            shortname: "7",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "7-clubs.png",
            imgMid: "7-clubs-mid.png",
            imgThumb: "7-clubs-thumb.png"
        },
        {
            cardID: 45,
            value: 8,
            name: 'Eight',
            shortname: "8",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "8-clubs.png",
            imgMid: "8-clubs-mid.png",
            imgThumb: "8-clubs-thumb.png"
        },
        {
            cardID: 46,
            value: 9,
            name: 'Nine',
            shortname: "9",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "9-clubs.png",
            imgMid: "9-clubs-mid.png",
            imgThumb: "9-clubs-thumb.png"
        },
        {
            cardID: 47,
            value: 10,
            name: 'Ten',
            shortname: "10",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "10-clubs.png",
            imgMid: "10-clubs-mid.png",
            imgThumb: "10-clubs-thumb.png"
        },
        {
            cardID: 48,
            value: 11,
            name: 'Jack',
            shortname: "J",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "J-clubs.png",
            imgMid: "J-clubs-mid.png",
            imgThumb: "J-clubs-thumb.png"
        },
        {
            cardID: 49,
            value: 12,
            name: 'Queen',
            shortname: "Q",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "Q-clubs.png",
            imgMid: "Q-clubs-mid.png",
            imgThumb: "Q-clubs-thumb.png"
        },
        {
            cardID: 50,
            value: 13,
            name: 'King',
            shortname: "K",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "K-clubs.png",
            imgMid: "K-clubs-mid.png",
            imgThumb: "K-clubs-thumb.png"
        },
        {
            cardID: 51,
            value: 14,
            name: 'Ace',
            shortname: "A",
            qty: 1,
            suit: "clubs",
            shortsuit: '♣',
            suitSVG: "<svg class='icon icon-clubs'><use xlink:href='#icon-clubs'></use></svg>",
            suitColor: 'black',
            suitVal: 4,
            imgFull: "A-clubs.png",
            imgMid: "A-clubs-mid.png",
            imgThumb: "A-clubs-thumb.png"
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


