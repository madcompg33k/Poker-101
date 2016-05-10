<?php 
    $currentPage = 'Game';
    require '../Includes/header.php';
?>

    <svg style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <symbol id="icon-spades" viewBox="0 0 16 16">
                <title>spades</title>
                <path class="path1" d="M12.775 5.44c-3.024-2.248-4.067-4.047-4.774-5.44v0c-0 0-0-0-0-0v0c-0.708 1.393-1.75 3.192-4.774 5.44-5.157 3.833-0.303 9.182 3.965 6.238-0.278 1.827-1.227 3.159-2.191 3.733v0.59h6v-0.59c-0.964-0.574-1.913-1.906-2.191-3.733 4.268 2.944 9.122-2.405 3.965-6.238z"></path>
            </symbol>
            <symbol id="icon-clubs" viewBox="0 0 16 16">
                <title>clubs</title>
                <path class="path1" d="M12.294 6.137c-0.922 0-1.751 0.384-2.341 1.011-0.25 0.265-0.684 0.58-1.153 0.856 0.22-0.842 0.917-1.902 1.4-2.367 0.619-0.596 1-1.435 1-2.367 0-1.795-1.429-3.252-3.2-3.271-1.771 0.019-3.2 1.475-3.2 3.271 0 0.932 0.38 1.771 1 2.367 0.484 0.465 1.18 1.525 1.4 2.367-0.469-0.277-0.903-0.591-1.153-0.856-0.59-0.627-1.419-1.011-2.341-1.011-1.787 0-3.236 1.463-3.236 3.271s1.448 3.271 3.236 3.271c0.923 0 1.751-0.396 2.341-1.023 0.263-0.279 0.726-0.627 1.223-0.916-0.047 2.308-1.149 4.003-2.271 4.67v0.59h6v-0.59c-1.122-0.668-2.224-2.363-2.271-4.67 0.498 0.289 0.961 0.637 1.223 0.916 0.59 0.626 1.419 1.023 2.341 1.023 1.787 0 3.236-1.464 3.236-3.271s-1.448-3.271-3.236-3.271z"></path>
            </symbol>
            <symbol id="icon-diamonds" viewBox="0 0 16 16">
                <title>diamonds</title>
                <path class="path1" d="M8 0l-5 8 5 8 5-8z"></path>
            </symbol>
            <symbol id="icon-heart" viewBox="0 0 16 16">
                <title>hearts</title>
                <path class="path1" d="M11.8 1c-1.682 0-3.129 1.368-3.799 2.797-0.671-1.429-2.118-2.797-3.8-2.797-2.318 0-4.2 1.882-4.2 4.2 0 4.716 4.758 5.953 8 10.616 3.065-4.634 8-6.050 8-10.616 0-2.319-1.882-4.2-4.2-4.2z"></path>
            </symbol>
        </defs>
    </svg>

<div class="container-fluid">
    <h2 class="page-header">Play The Game</h2>

    <!-- #Start div#main -->
    <div id="main" class="row" data-ng-controller="TableController as tableCtrl">

        <game-options class="container-fluid col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-md-4 col-lg-2"></game-options>

        <!-- #Start section#table (The "table" on which everything goes) -->
        <section id="table" class="container col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-0 col-md-8 col-lg-10">

            <!-- #Start div#board (The "board", where the 5 community cards go) -->
            <div id="board">
                <ul>
                    <!-- Each community cards (the flop, turn, and the river) -->
                    <li class="card" data-ng-repeat="card in table.cards">
                        <img class="graphical-card" data-ng-src="{{ game.deck.imgPath + table.tableDeck + '/' + card.imgMid }}" data-ng-alt="{{ card.name }} of {{ card.suit }}" width="143" height="200" />
                        <a-card class="table-card svg-card"></a-card>
                    </li>
                </ul>
            </div>

            <div id="potSize" class="row">
                <ul class="table-winner" data-ng-show="table.winner.length">
                    <li>Winner{{ table.winner.length > 1 ? 's' : '' }}:</li>
                    <li data-ng-repeat="winner in table.winner">{{ winner.name }} <small>({{ winner.handType.name }}) - {{ table.potSize / table.winner.length | currency }}</small></li>
                </ul>
                <div class="table-money h4">Pot Size: {{ table.potSize | currency }}</div>
                <div class="table-money h4">Blinds: {{ table.smallBlind.amt | currency }} / {{ table.bigBlind.amt | currency }}</div>
            </div>
            
            <!-- Each Player -->
            
            <player-info></player-info>
            
        </section>
        <!-- #End section#players -->

    </div>
    <!-- #End div#main-->

</div>