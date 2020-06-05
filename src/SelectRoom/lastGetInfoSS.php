<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$info = array();
$count = 0;
if (isset($_COOKIE['roomType'])){
    $info['roomType'] = $_COOKIE['roomType'];
    setcookie("roomType","",time()-3600*12,'/');
    $count = $count + 1;
}

if (isset($_COOKIE['numberOfRoom'])){
    $info['numberOfRoom'] = $_COOKIE['numberOfRoom'];
    setcookie('numberOfRoom',"",time()-3600*12,'/');
}

if (isset($_COOKIE['Checkin'])){
    $info['Checkin'] = $_COOKIE['Checkin'];
    setcookie('Checkin',"",time()-3600*12,'/');
    $count = $count + 1;
}

if (isset($_COOKIE['Checkout'])){
    $info['Checkout'] = $_COOKIE['Checkout'];
    setcookie('Checkout',"",time()-3600*12,'/');
    $count = $count + 1;
}

if (isset($_COOKIE['username'])){
    $info['username'] = $_COOKIE['username'];
    $count = $count + 1;
}
$info['count'] = $count;
echo json_encode($info);
?>