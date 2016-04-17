    <?php 
        //require_once ("Includes/simplecms-config.php"); 
        //require_once  ("Includes/connectDB.php");
        include("./svg.php"); 
        include("../Includes/include.php");
        echo "<i>This is an echo from the current file.</i><br />";
        include("../Includes/header.php");
    ?>

            <!-- #Start div#main -->
            <div id="main">
                <h2>Play The Game</h2>


                <!-- game-options></game-options -->

                <section id="table">
                    <!-- Display each player's hand -->
                    <!-- player-hand></player-hand -->

                    <div id="board">
                        <ul>
                            <li class="card" data-ng-repeat="card in table.cards">
                                <img data-ng-src="{{ card.imgMid }}" data-ng-alt="{{ card.name }} of {{ card.suit }}" width="143" height="200" />
                            </li>
                        </ul>
                    </div>

                    <div id="potSize">
                        <span class="table-money">Pot Size: {{ table.potSize | currency }}</span>
                        <span class="table-money">Blinds: {{ table.smallBlind.amt }} / {{ table.bigBlind.amt }}</span>
                    </div>
                    
                </section>
                <!-- #End section#players -->

            </div>
            <!-- #End div#main-->

<?php 
    include ("/Includes/footer.php");
 ?>