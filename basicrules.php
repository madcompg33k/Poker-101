    <?php 
        //require_once ("Includes/simplecms-config.php"); 
        //require_once  ("Includes/connectDB.php");
        $currentPage = "Rules";
        include '/Includes/header.php';      
     ?>


    <section id="main" class="col-md-8 col-md-offset-2">
        <h1 class="page-header">Basic Rules of Texas Hold'em</h1>

        <!-- #Start div#rulesCardValue -->
        <div id="rulesCardValue" class="details">
            <h3>List of card values (Highest to Lowest)</h3>
            <ul>
                <li>Ace (A)</li>
                <li>King (K)</li>
                <li>Queen (Q)</li>
                <li>Jack (J)</li>
                <li>Ten (10)</li>
                <li>Nine (9)</li>
                <li>Eight (8)</li>
                <li>Seven (7)</li>
                <li>Six (6)</li>
                <li>Five (5)</li>
                <li>Four (4)</li>
                <li>Three (3)</li>
                <li>Two (2)</li>
                <li>
                    <span class="note">
                        Ace (A) can act as a one when trying to get a straight
                    </span>
                </li>
            </ul>
        </div>
        <!-- #End div#rulesCardValue -->

        <!-- #Start div#rulesPokerHands -->
        <div id="rulesPokerHands" class="details">
            <h3>List of Poker Hands (Highest to Lowest)</h3>
            <ul>
                <li>
                    <h4>Straight flush</h4>
                    <p>
                        A straight flush is when you have 5 suited cards, in order of one another.
                        <span class="note">(e.g. 3, 4, 5, 6, and 7 of spades)</span>
                        <span class="note">(Note: Ace may come before a 2 or after a king)</span>
                    </p>
                </li>
                <li>
                    <h4>Four of a kind</h4>
                    <p>
                        Four of the same number or face card.
                        <span class="note">(e.g. four queens, or four threes)</span>
                    </p>
                <li>
                    <h4>Full house</h4>
                    <p>
                        Three of the same number or face card alongside another, distinct two that match.
                        <span class="note">(e.g. three 8s, and a pair of 2s)</span>
                    </p>
                </li>
                <li>
                    <h4>Flush</h4>
                    <p>
                        Five cards of the same suit.
                    </p>
                </li>
                <li>
                    <h4>Straight</h4>
                    <p>
                        Five cards in order of one another.
                        <span class="note">(e.g. 3, 4, 5, 6, and 7, not suited)</span>
                        <span class="note">(Note: Ace may come before a 2 or after a king)</span>
                    </p>
                </li>
                <li>
                    <h4>Three of a kind</h4>
                    <p>
                        Three of the same number or face card.
                        <span class="note">(e.g. three 8s)</span>
                    </p>
                </li>
                <li>
                    <h4>Two pair</h4>
                    <p>
                        Two seperate sets of two cards of the same number or face card that match.
                        <span class="note">(e.g. two 8s, and two 2s)</span>
                    </p>
                </li>
                <li>
                    <h4>Pair</h4>
                    <p>
                        Two of the same number or face card.
                        <span class="note">(e.g. two kings)</span>
                    </p>
                </li>
                <li>
                    <h4>High card</h4>
                    <p>
                        Having the highest card face value when nobody else has a higher face card value, or a pair or higher.
                        <span class="note">(e.g. holding an ace when nobody else has a pair or better, and no ace)</span>
                        <span class="note">(Note: If two or more people have matching high cards, you move to the second highest card to determine the winner)</span>
                    </p>
                </li>
            </ul>
        </div>
        <!-- #End div#rulesPokerHands -->

        <!-- #Start div#ruleGamePlay -->
        <div id="rulesGamePlay" class="details">
            <h3>Gameplay</h3>

            <ul>
                <li>
                    <h4>Concept</h4>
                    <p>
                        Texas Hold'em is a form of poker in which each player has two "hole" cards that is unique to them, as well as 5 communal cards shared by the
                        entire table. A player's hand is determined by combining any 5 cards between the two. Players place bets during each "round" of play (pre-flop,
                        the "flop", the "turn", and finally the "river") and may subsequently choose to stay in or fold, ending when either every player but one has folded,
                        or during the "showdown" after the final card has been played and all bets have been made and hole cards are revealed.
                    </p>
                </li>

                <li>
                    <h4>The Dealer "Button"</h4>
                    <p>
                        The dealer "button" is a chip (or some other item) which indicates who is the "dealer" for the current hand (even if that person didn't necessarily "deal" the
                        cards themself). This "button" determines who must pay the small and big blind, as well as play order. After each hand is played, the "button" moves to the player
                        to the left of the current "dealer" which changes what players must next pay the small and big blinds.
                    </p>
                </li>

                <li>
                    <h4>Small Blind</h4>
                    <p>
                        The small blind is typically half of the minimum bet, and is always paid by the person to the immediate left of the dealer.
                        <span class="note">(e.g. if you are playing a $1/$2 game, $2 would be the initial minimum bet, and $1 would be the small blind)</span>
                    </p>
                </li>

                <li>
                    <h4>Big Blind</h4>
                    <p>
                        The big blind is equal to the minimum initial bet required to stay in, and is always paid by the person two seats to the left of the dealer, or one seat left of the small blind.
                        <span class="note">(e.g. if you are playing a $1/$2 game, $2 would be the big blind)</span>
                    </p>
                </li>

                <li>
                    <h4>Ante</h4>
                    <p>
                        Sometimes a game can have (or eventually have, as the bets grow, like in a tournament) what is known as an "Ante". An ante is a minimum bet for everyone to put in, in order to play
                        the hand. This is in addition to the blinds, and everyone who wishes to play in the hand must pay it.
                        <span class="note">(e.g. if you are playing a $5/$10 game, there may be an additional ante of $5 that everyone must pay in order to play the hand, including the small and big blinds)</span>
                    </p>
                </li>

                <li>
                    <h4>The "Hole" Cards</h4>
                    <p>
                        Once all blinds and antes have been paid, the dealer than deals cards around the table, one at a time, starting with the player to the immediate left of the big blind,
                        going around until all players have two cards.
                    </p>
                </li>

                <li>
                    <h4>Order of Play (Pre-Flop)</h4>
                    <p>
                        The first player to act is the player to the immediate left of the payer of the big blind. This player must choose to fold, if he or she doesn't like their hole cards,
                        call, which means to put in the minimum bet to stay in (the equivelant of the big blind), or to raise, which must be at least equivelant to twice the amount of the big blind.
                        <span class="note">(e.g. in a $1/$2 game, a player would call by putting in $2, or instead raise by putting chips/money totaling AT LEAST $4)</span>
                    </p>

                    <p>
                        The choice is then passed on to the player to the left, each choosing to either fold, call, or raise (based on whether or not there was a raise before them). Once you get
                        to the small blind, as long as no raises have been made, they may simply put the other half of the minimum bet in, since they already have half out as the small blind. The
                        big blind, provided no raises have been made, may simply "check", as they already have the minimum bet out on the table.
                    </p>

                    <p>
                        If a raise was made at any point during this round, you continue going around the table, moving one at a time to the left, until everyone has either "called", or
                        folded, so that everyone still in the hand has put out an equal amount of chips/money.
                    </p>
                </li>

                <li>
                    <h4>Folding</h4>
                    <p>
                        To relinquish any chips/money you have previously bet, and push your hole cards, typically face down, towards the center of
                        the table signifying that you are done with the current hand.
                    </p>
                </li>
                <li>
                    <h4>Checking</h4>
                    <p>
                        To already have the same amount of any previous bet on the table (e.g. the big blind, or no bet having been made post-flop),
                        and to signify that you do not wish to raise the bet any further.
                    </p>
                </li>
                <li>
                    <h4>Calling</h4>
                    <p>
                        To place the same amount of chips/money on the table equivalent to any previous bet or big blind (whichever is higher).
                    </p>
                </li>
                <li>
                    <h4>Raising</h4>
                    <p>
                        To increase the bet amount from the previous one or minimum/big blind, or to bet in the case of there being no prior bet post-flop.
                    </p>
                </li>

                <li>
                    <h4>The "Flop"</h4>
                    <p>
                        Once all initial bets have been settled and everyone has either matched their bet, or folded, all chips are moved to the center, or the "pot", and the dealer then "burns" a card
                        (by placing the top card off to the side, face-down), and then deals three cards in the center of the table, face-up. Then, another round of betting begins, starting with the
                        player to the immediate left of the "button". Because there is no bet yet in this stage, the first player to act may choose to check, or bet, or fold (although typically
                        folding when you can stay in for free is frowned upon).
                    </p>
                </li>

                <li>
                    <h4>The "Turn"</h4>
                    <p>
                        Once everyone has either folded or matched the current bet after the flop has been dealt, the dealer then "burns" another card and places one more card out (usually to the
                        right of the flop) which is known as the "turn". Another round of betting begins, exactly in the same manner as before.
                    </p>
                </li>
                
                <li>
                    <h4>The "River"</h4>
                    <p>
                        Once everyone has folded or matched the bet, the dealer then "burns" one more card, and deals a final card (usually to the right of the "turn" card), which is known as
                        the "river". A final round of betting begins exactly as before, until everyone has either folded or matched the bet, at which point you move to the "showdown".
                    </p>
                </li>

                <li>
                    <h4>The "Showdown"</h4>
                    <p>
                        Once all bets have been placed and everyone who did not match the bet or check has folded, hole cards are then revealed to determine who wins the "pot". Based on the hierarchy of
                        hands, the winner is the person with the highest rated hand based on five of any combination of cards from their hole cards or the communal cards on the table. In the case of a
                        matching hand or hands, the "pot" is then split with the players with the matching, winning hands. After the hand is complete and the winner is determined, all cards are
                        taken back by the dealer, and given along with the "button" to the player to the left of the current "dealer" to begin the next hand.
                    </p>
                </li>
            </ul>
        </div>
        <!-- #End div#rulesGamePlay -->
    </section>


<?php 
    include '/Includes/footer.php';
 ?>