    <?php 
        //require_once ("Includes/simplecms-config.php"); 
        //require_once  ("Includes/connectDB.php");
        include("/Includes/header.php");         
     ?>


    <div id="main">
        <h2>Texas Hold'em - Pro Tips</h2>

        <!-- #Start section#tipsCalculatingOdds -->
        <section id="tipsCalculatingOdds" class="pro-tips">
            <h4>Your hand</h4>

            <p>
                To determine the percentage of you hitting your hand, you must first know what hand you're going for. While you could calculate the odds
                of hitting a second two, giving you a pair, it likely won't help much if there are four hearts on the "board" and you have no hearts.
            </p>
            <p>
                You must first determine what kinds of hands can be made by the flop, the turn, and the river. One of my personal favorite parts of
                Texas Hold'em is that you can see "at least" 3 of the potential cards that everyone else is working with to make their hand. This
                allows you to (an extent) calculate some of the possibilities they may be going for, or have gotten.
            </p>
            <p>
                One of the first things you want to think about, is what hand would make the "nuts" (the highest possible hand that could be achieved
                based on the current board). If the flop brings a Jack (J), Ace (A), and Ten (10) of spades, then obviously if someone happens to have
                the Queen (Q) and King (K) of spades as their hole cards, it would be wise to fold. However, the likelyhood of them having those two
                specific cards can be pretty low in this particular case. It does, however, highlight that you must consider the possibilities that can
                be made based on the cards on the board in relation to the hand you are aiming to get, before you worry about calculating the odds of
                hitting your hand.
            </p>


            <ul>
                <li>
                    <h4>Calculating Odds/Percentages</h4>
                    <p>
                        You can actually calculate what the approximate percentage is of "hitting" your goal hand as you play, it's much easier than you may think.
                    </p>
                    <p>
                        A poker deck is made up of 52 unique cards, 13 cards (as listed in <a href="/basicrules.php">basic rules</a>), of 4 seperate suits (hearts,
                        diamonds, spades, and clubs). If we were to round, therefore it is (approximately) likely that each card has a roughly 2% chance of being
                        dealt or played. Using this math, along with our "outs", we can determine the likelihood of hitting our hand.
                    </p>
                </li>
                <li>
                    <h5>"Outs"</h5>
                    <p>
                        Outs is a term which refers to the various cards that "could" be dealt which would give us our desired hand. If say, we are four cards to
                        a flush, leaving only one needed, then there are "potentially" (assumed to be) 9 other cards of that suit that would give us our flush (as
                        there are 13 total of that suit, minus the 4 we already have).
                    </p>
                    <p>
                        This is especially important when we look at hands like straights. For example, if you have four cards to a straight, but the final card
                        you need is in the middle (e.g. if you have the 3, 4, 6, and 7, leaving you needing a 5), there are only (assumed to be) 4 other cards
                        in the deck that can give you your straight. However, if your cards are in order, and you could have one on either end (e.g. you have
                        the 3, 4, 5, and 6, leaving you needing a 7 OR 2), you double your chances. In this particular case, there are 8 cards that can give
                        you your hand, the four 7s, as well as the four 2s.
                    </p>
                </li>
                <li>
                    <h5>Finding the odds</h5>
                    <p>
                        Once we know what hand we are going for, and we know what our "outs" are, AND since we now know the rough percentage of hitting a specific,
                        single card in the deck, we can calculate a rough estimate of hitting our hand.
                    </p>
                    <p>
                        Say we are one card away from a flush, leaving us with 9 cards available to be dealt that would complete our flush. If we are only currently
                        on the flop (since we couldn't be 4 cards into anything before the flop), we know we have 2 cards remaining to be dealt, the "turn", and the
                        "river". We also know that each card has a roughly 2% chance of being dealt at any given time. This means we have (approximately) an 18% chance
                        of hitting one of the nine various cards of our suit per card dealt. Since we have 2 cards to go (the "turn", and the "river"), this doubles
                        our chances putting us at a 36% chance of getting a flush. If we do not get it on the turn of course, this leaves us with one chance, and an
                        18% chance (since we have 9 cards that can help us, at a 2% chance each of being dealt).
                    </p>
                    <p>
                        This can be extremely useful considering the various possibilities of hands that can help us. Sometimes we may be 1 card away from a flush,
                        but also managed to get a pair. This opens up other "outs" for us, as we not only can get any of the 9 cards of the same suit in the deck,
                        but also any of the other 2 cards of our pair giving us three of a kind. Imagine being in a position which the combination of cards dealt
                        on the turn and the river could give you one of a variety of hands, leaving you with 18 or more "outs". This puts you at having a 72% chance
                        as of the flop, and a 36% chance on hitting it on the river. The percentages in the right situations can grow drastically.
                    </p>
                </li>

            </ul>
        </section>
        <!-- #End section#tipsCalculatingOdds -->

        <!-- #Start section#tipsValueBetting -->
        <section id="tipsValueBetting" class="pro-tips">
            <h4>"Value" Betting</h4>
            <ul>
                <li>
                    <h5>What is a "value" bet?</h5>
                    <p>
                        A value bet is a bet made by a player who wants it to be called (as opposed to a bluff or protection bet), in an
                        attempt to increase the pot size to increase the amount of money won in the hand.
                        <span class="note">(e.g. not betting too high as to "scare off" an opponent with a weaker hand)</span>
                    </p>
                </li>
                <li>
                    <h5>How do I value bet?</h5>
                    <p>
                        This can be the tricky part sometimes. The goal is to increase the "value" of the pot by keeping opponents with weaker
                        cards in the hand. Too much, and you scare them off, and too little, and you've lost potential money that could have been
                        made.
                    </p>
                    <p>
                        The trick is to gauge your opponents style of play, and find a good percentage of the current pot as well as consider how
                        the opponent has been playing the hand, that will keep them betting. It can vary from opponent to opponent, as some players
                        are far more conservative than others. Be careful though, as some aggressive players can increase the pot size more than you
                        want.
                    </p>
                </li>
            </ul>
        </section>
        <!-- #End section#tipsValueBetting -->

        <!-- #Start section#tipsControlPotSize -->
        <section id="tipsControlPotSize" class="pro-tips">
            <h4>"Controlling" the Pot Size</h4>
            <ul>
                <li>
                    <h5>Betting</h5>
                    <p>
                        Sometimes when you bet, just as mentioned in the "value betting" section, you may want to limit how much you put in. This
                        could be for various reasons, such as increasing the "value" of the pot by keeping other players in and not scaring them off.
                        Other times, you may want to "bluff" by betting more than usual (often, but not always) in hopes that other players will fold,
                        giving you the pot.
                    </p>
                </li>

                <li>
                    <h5>"Control" the pot</h5>
                    <p>
                        Sometimes when you bet, especially with certain opponents, the bet size can get out of hand very quickly. You may raise a reasonable
                        amount, and then suddenly another player re-raises a large amount. Be catious in these situations, especially if it is early in the
                        hand, as this kind of play can cause you to lose a lot of your money in a single hand. In some cases it can be wiser to fold early if the
                        pot is getting out of hand quickly. The trick is being cognizant of your opponents' play styles, and playing off of their bets in a way
                        that will allow you to control if the pot increases quickly or not.
                    </p>
                </li>

                <li>
                    <h5>"Buying" information</h5>
                    <p>
                        Another key point in controlling pot size is that sometimes it can be worth staying in a hand, even if you know you will lose, simply
                        to see what your opponent has. I refer to this as "paying for information", or "buying" information on your opponent. Knowing the cards
                        other players have can give amazing insight into the way they play. The catch of course is, you want to lose as little money as you
                        can while staying in all the way to the end. At the same time, if you both "check" all the way through, you haven't learned much about
                        their style of play. This concept is similar to "value" betting, except instead of increasing the value of the pot size, you're convincing
                        your opponent to give you information by betting in such a way that will hopefully keep the pot small, but also allow you to see what they
                        are and are not willing to bet in certain situations.
                    </p>
                </li>
            </ul>
        </section>
        <!-- #End section#tipsControlPotSize -->
    </div>

</div> <!-- End of outer-wrapper which opens in header.php -->

<?php 
    include ("/Includes/footer.php");
 ?>