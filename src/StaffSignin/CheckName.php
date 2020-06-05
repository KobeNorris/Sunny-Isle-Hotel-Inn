<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$count = 0;
if (isset($_COOKIE['staffusername'])){
    $count = $count + 1;
}
    
echo ($count);
?>