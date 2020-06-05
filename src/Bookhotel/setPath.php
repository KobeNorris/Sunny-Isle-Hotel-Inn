<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$value = $_POST['value'];

setcookie('path', $value, time()+3600*12, '/');
?>