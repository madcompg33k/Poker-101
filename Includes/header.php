<?php include 'head.php'; ?>

    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand logo" href="/index.php">
                    <svg class="logo">
                        <use xlink:href="/Images/svg/poker-logo.svg#Poker_Logo" />
                    </svg>
                </a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="<?php echo $currentPage == "Home" ? "active" : "inactive" ?>"><a href="/index.php">Home</a></li>
                    <li class="<?php echo $currentPage == "Rules" ? "active" : "inactive" ?>"><a href="/basicrules.php">Basic Rules</a></li>
                    <li class="<?php echo $currentPage == "Tips" ? "active" : "inactive" ?>"><a href="/protips.php">"Pro Tips"</a></li>
                    <li class="<?php echo $currentPage == "About" ? "active" : "inactive" ?>"><a href="/aboutme.php">About Me</a></li>
                    <li class="<?php echo $currentPage == "Game" ? "active" : "inactive" ?>"><a href="/Game/index.php">Play Poker</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- #End Navigation -->

            
