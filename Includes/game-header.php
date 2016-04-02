<?php require_once ("/Includes/session.php"); ?>
<!DOCTYPE html>
<html lang="en" data-ng-app="deck">
    <head>
        <meta charset="utf-8" />
        <title>Poker 101</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <script type="text/javascript" src="/Scripts/angular.min.js"></script>
        <link rel="stylesheet" type="text/css" href="/Styles/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/Styles/main.css" />
        <script type="text/javascript" src="/Game/Scripts/deck.js"></script>
    <script type="text/javascript" src="/Scripts/angular.js"></script>
    </head>
    <body data-ng-controller="DeckController as deckCtrl">
        <div class="outer-wrapper">

            <header>
                <div class="content-wrapper">
                    <div class="float-left">
                        <p class="site-title"><a href="/index.php">How To Play Texas Hold'em</a></p>
                    </div>

                    <!-- #Start Navigation -->
                    <section class="navigation" data-role="navbar">
                        <nav>
                            <ul id="menu">
                                <li><a href="/index.php">Home</a></li>
                                <li><a href="/basicrules.php">Basic Rules</a></li>
                                <li><a href="/protips.php">"Pro Tips"</a></li>
                                <li><a href="/aboutme.php">About Me</a></li>
                                <li><a href="/Game/index.php">Play Poker</a></li>
                                <?php
                                    /*
                                        $statement = $databaseConnection->prepare("SELECT id, menulabel FROM pages");
                                        $statement->execute();

                                        if($statement->error)
                                        {
                                            die("Database query failed: " . $statement->error);
                                        }

                                        $statement->bind_result($id, $menulabel);
                                        while($statement->fetch())
                                        {
                                            echo "<li><a href=\"/page.php?pageid=$id\">$menulabel</a></li>\n";
                                        }
                                    */
                                ?>
                            </ul>
                        </nav>
                    </section>
                    <!-- #End Navigation -->


                    <!-- #Start Login -->
                    <div class="float-right">
                        <section id="login">
                            <ul id="login">
                                <a href="sandbox/">Sandbox</a>
                            <?php
                                // To be added later //
                                /*
                                    if (logged_on())
                                    {
                                        echo '<li><a href="/logoff.php">Sign out</a></li>' . "\n";
                                        if (is_admin())
                                        {
                                            echo '<li><a href="/addpage.php">Add</a></li>' . "\n";
                                            echo '<li><a href="/selectpagetoedit.php">Edit</a></li>' . "\n";
                                            echo '<li><a href="/deletepage.php">Delete</a></li>' . "\n";
                                        }
                                    }
                                    else
                                    {
                                        echo '<li><a href="/logon.php">Login</a></li>' . "\n";
                                        //echo '<li><a href="/register.php">Register</a></li>' . "\n";
                                    }
                                */
                            ?>
                            </ul>
                            <?php
                                /* 
                                    if (logged_on()) {
                                        echo "<div class=\"welcomeMessage\">Welcome, <strong>{$_SESSION['username']}</strong></div>\n";
                                    }
                                */
                            ?>
                        </section>
                    </div>
                    <!-- #End Login -->


                    <div class="clear-fix"></div>
                </div>

            </header>
