<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$roomType = $_POST['roomType'];
$Check_in = $_POST['Check_in'];
$Check_out = $_POST['Check_out'];

setcookie('roomType', $roomType, time()+3600*12, '/');
setcookie('Checkin', $Check_in, time()+3600*12, '/');
setcookie('Checkout', $Check_out, time()+3600*12, '/');
?>