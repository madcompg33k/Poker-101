(function () {
    var app = angular.module('players', [])
    /* Controller for all players */
        .controller('PlayersController', function () {
            /* Initialize Players and assign data to it */
            this.players = [];
        })
    /* Controller for add/modifying an individual player */
        .controller('PlayerController', function () {
            this.player = {
                seat: 0,
                money: 200,
                chips: [],
                isDealer: false,
                isSmallBlind: false,
                isBigBlind: false,
                bet: { amt: 0 },
                holeCards: []
            };

            this.addPlayer = function (game) {
                /* Add this player to players */
                game.players.push(this.player);

                /* Clear the new player object, since the player is now added to the table */
                this.player = {};
            }
        })
    /* Start Directives */
        .directive('format', ['$filter', function ($filter) {
            return {
                require: '?ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    if (!ctrl) return;

                    ctrl.$formatters.unshift(function (a) {
                        return $filter(attrs.format)(ctrl.$modelValue)
                    });

                    elem.bind('blur', function (event) {
                        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                        elem.val($filter(attrs.format)(plainNumber));
                    });
                }
            };
        } ])
        .directive('addPlayer', function () {
            return {
                restrict: 'E',
                templateUrl: './Directives/add-player.html',
                controller: function () {

                },
                controllerAs: 'addPlayer'
            }
        })

        .directive('playerInfo', function () {
            return {
                restrict: 'E',
                templateUrl: './Directives/player-info.html',
                controller: function () {

                },
                controllerAs: 'players'
            }
        });

})();