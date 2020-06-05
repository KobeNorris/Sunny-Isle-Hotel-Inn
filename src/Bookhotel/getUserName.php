<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_COOKIE['username']))
    $username = $_COOKIE['username'];
else
    $username = "Null";

echo $username;
?>