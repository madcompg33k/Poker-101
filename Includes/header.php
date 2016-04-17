<?php require_once ("/Includes/session.php"); ?>
<!DOCTYPE html>
<html lang="en" data-ng-app="game" data-ng-controller="GameController as gameCtrl">
    <head>
        <meta charset="utf-8" />
        <title>Poker 101</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <script src="https://use.typekit.net/hiv2jke.js"></script>
        <script>try{Typekit.load({ async: true });}catch(e){}</script>

        <script type="text/javascript" src="/Scripts/angular.js"></script>
        <script type="text/javascript" src="/Scripts/angular-sanitize.js"></script>
        <script type="text/javascript" src="/Game/Scripts/functions.js"></script>
        <script type="text/javascript" src="/Game/Scripts/game.js"></script>
        <script type="text/javascript" src="/Game/Scripts/players.js"></script>
        <script type="text/javascript" src="/Game/Scripts/table.js"></script>

        <link rel="stylesheet" type="text/css" href="/Styles/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/Styles/main.css" />
        <link rel="stylesheet" type="text/css" href="/Game/Styles/game.css" />

    </head>
    <body data-ng-controller="TableController as tableCtrl">
        <div class="outer-wrapper">

            <!-- #Start header -->
            <header>
                <div class="content-wrapper">
                    <div class="site-title">
                        How To Play Texas Hold'em
                    </div>

                    <!-- #Start Navigation -->
                    <section class="navigation" data-role="navbar">
                        <nav>
                            <ul id="menu">
                                <li><a href="/index.php">Home</a></li>
                                <li><a href="/basicrules.php">Basic Rules</a></li>
                                <li><a href="/protips.php">"Pro Tips"</a></li>
                                <li><a href="/aboutme.php">About Me</a></li>
                                <li><a href="/Game/index.html">Play Poker</a></li>

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

                            <!-- #Start Login -->
                            <div class="float-right">
                                <section id="login">
                                    <ul id="login">
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
                        </nav>
                    </section>
                    <!-- #End Navigation -->

                </div>
                <!-- #End div-content-wrapper -->
            </header>
            <!-- #End header -->
