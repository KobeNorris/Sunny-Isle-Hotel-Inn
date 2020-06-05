<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_COOKIE['staffusername'])){
    setcookie('staffusername',"",time()-3600*12,'/');
}

if (isset($_COOKIE['username'])){
    setcookie('username',"",time()-3600*12,'/');
}

if (isset($_COOKIE['password'])){
    setcookie('password',"",time()-3600*12,'/');
}

if (isset($_COOKIE['roomType'])){
    setcookie("roomType","",time()-3600*12,'/');
}

if (isset($_COOKIE['numberOfRoom'])){
    setcookie('numberOfRoom',"",time()-3600*12,'/');
}

if (isset($_COOKIE['Checkin'])){
    setcookie('Checkin',"",time()-3600*12,'/');
}

if (isset($_COOKIE['Checkout'])){
    setcookie('Checkout',"",time()-3600*12,'/');
}

if (isset($_COOKIE['orderedList'])){
    setcookie('orderedList',"",time()-3600*12,'/');
}

if (isset($_COOKIE['path'])){
    setcookie('path',"",time()-3600*12,'/');
}
?>