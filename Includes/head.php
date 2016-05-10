<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en" data-ng-app="game" data-ng-controller="GameController as gameCtrl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Poker 101</title>
    
    <script type="text/javascript" src="/Scripts/angular.js"></script>
    <script type="text/javascript" src="/Scripts/angular-sanitize.js"></script>
    <script type="text/javascript" src="/Scripts/jquery-2.2.3.js"></script>
    <script type="text/javascript" src="/Scripts/bootstrap.js"></script>
    <!-- script type="text/javascript" src="/Scripts/bootstrap.min.js"></script -->
    <script type="text/javascript" src="/Game/Scripts/functions.js"></script>
    <script type="text/javascript" src="/Game/Scripts/game.js"></script>
    <script type="text/javascript" src="/Game/Scripts/players.js"></script>
    <script type="text/javascript" src="/Game/Scripts/table.js"></script>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="/Styles/bootstrap.css" />
    <!-- link rel="stylesheet" type="text/css" href="Styles/bootstrap.min.css" / -->
    <link rel="stylesheet" type="text/css" href="/Styles/bootstrap-theme.css" />
    <!-- link rel="stylesheet" type="text/css" href="Styles/bootstrap-theme-min.css" / -->
    <link rel="stylesheet" type="text/css" href="/Styles/main.css" />
    <link rel="stylesheet" type="text/css" href="/Game/Styles/game.css" />
    <link rel="stylesheet" type="text/css" href="/Styles/normalize.css" />
</head>
<body>